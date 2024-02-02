
import { faArrowUp91 } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { saveAs } from 'file-saver';

const API_BASE_URL = "http://127.0.0.1:8000/api";

function pad2(number) {
    return (number < 10 ? '0' : '') + number.toString()
}

const toInt = (value) => {
    return parseInt(value.toString().replaceAll(',', ''))
}

function addComma(number) {
    if (!number) return number
    number = number.toString().replaceAll(',', '')
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function valiNumber(val) {
    if (/\D/.test(parseInt(val))) {
        console.log(val)
        return false
    }
    else {
        return true
    }
}
// get data bS ở năm đó, gọi ở useEffect tại màn hình BO1
export function getAllTable(year, setData, controller) {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    axios.get(`${API_BASE_URL}/getDataBS`, {
        signal: controller.signal,
        params: {
            y: year
        }
    }
    )
        .then(response => {
            console.log(response.data)
            setData(response.data)
        })
}

// Get tabe monthly khi Bấm nút input
export function getDataMonthly(year, month, setData) {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    axios.get(`${API_BASE_URL}/balances`,
        {
            params:
            {
                'month_year': year.toString() + '-' + pad2(month),
            }
        }
    )
        .then(response => {
            if (response.data.success == true) {
                setData(response.data)
            }
        }, () => {
            axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
            axios.get(`${API_BASE_URL}/categories`,
                {
                    params:
                    {
                        'report_type': 'bs',
                        per_page: 10000000,
                        page: 1
                    }
                }
            ).then(response => {
                const allCat = []
                response.data.categories.map(category => allCat.push(
                    {
                        amount: '',
                        category_name: category.name,
                        category_id: category.id
                    }))
                setData({
                    success: true,
                    balance_sheet: [...allCat]
                })
            })
        }
        )
}


//được gọi ở useEffect, lấy ra exchange rate ở tháng đó
export function getExchangeRate(month, year, setExchangeRate) {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    axios.get(`${API_BASE_URL}/exchangeRate`, {
        params: {
            year, month
        }
    }).then(response => {
        if (response.data.success == true) {
            setExchangeRate({
                jpy: response.data?.data[0].jpy,
                usd: response.data?.data[0].usd,
                id: response.data?.data[0].id,
                exchangeDate: year + '-' +  pad2(month)
            })
        }
        else {
            setExchangeRate({
                jpy: '',
                usd: '',
                id: '',
                exchangeDate: year + '-' + pad2(month)
            })
        }
    }
    )
}

// được gọi khi nhấn nút save ở exchange rate 
export function createOrUpdateExchangeRate(exchangeRate, showToast,a1,a2,a3,a4) {
    console.log(exchangeRate)
    const token = localStorage.getItem("token");
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    if (valiNumber(toInt(exchangeRate.jpy)) === false || valiNumber(toInt(exchangeRate.usd)) === false) {
        showToast.error(a1);
    }
    else {
        axios.post(`${API_BASE_URL}/exchangeRate`, {
            ...exchangeRate, jpy: toInt(exchangeRate.jpy), usd: toInt(exchangeRate.usd)
        }).then(response => {
            if (response.data.message== "update exchange rate successfully") {
                showToast.success(a3);
              }
              if (response.data.message == "create exchange rate successfully") {
                showToast.success(a4);
              }
        }, () => showToast.error(a2))
    }
}

export function saveMonthly(month, year, data_month, showToast, setSelectedYearExport,a1,a2,a3) {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const data = []
    data_month.balance_sheet.map(e => data.push({ ...e, amount: toInt(e.amount) }))
    let checkNum = true
    data.map(e => {
        if (valiNumber(e.amount) === false) {
            checkNum = false
            console.log(e.category_name, typeof (e.amount), '"' + e.amount + '"', checkNum)
        }
    }
    )
    if (checkNum === true) {
        axios.post(`${API_BASE_URL}/balances`, {
            month_year: year.toString() + '-' + pad2(month),
            balances: data
        }).then(response => {
            showToast.success(a1)
            const newYear = new Date(year)
            newYear.setFullYear(year)
            setSelectedYearExport(newYear)
        }, (e) => {
            showToast.error(a2)
            console.log(e)
        }
        )
    } else {
        showToast.error(a3)
    }
}

export function getDataYearly(year, setData) {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    axios.get(`${API_BASE_URL}/getDatayear`,
        {
            params: {
                y: year
            }
        })
        .then(response => {
            if (response.data.length > 0) {
                const data = []
                response.data.map(d => {
                    data.push({ ...d, amount: addComma(d.amount) })
                })
                setData(data)
            } else {
                axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
                axios.get(`${API_BASE_URL}/categories`,
                    {
                        params:
                        {
                            'report_type': 'bs',
                            per_page: 10000000,
                            page: 1
                        }
                    }
                ).then(response => {
                    const allCat = []
                    response.data.categories.map(category => allCat.push(
                        {
                            amount: '',
                            category_name: category.name,
                            category_id: category.id,
                            bs_month_year: (year - 1)
                        }))
                    setData([...allCat]
                    )
                })
            }
        }
        )
}

export function saveYearly(data_year, showToast,a1,a2,a3) {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const data = []
    data_year.map(e => data.push({ ...e, bs_month_year: e.bs_month_year?.toString(), amount: toInt(e.amount) }))
    let checkNum = true
    data.map(e => {
        if (valiNumber(e.amount) === false) {
            checkNum = false
            console.log(e.category_name, typeof (e.amount), '"' + e.amount + '"', checkNum)
        }
    }
    )
    if (checkNum) {
        axios.post(`${API_BASE_URL}/getDatayear`, [...data]).then(response => showToast.success(a1), () => {
            showToast.error(a2)
        }
        )
    } else {
        showToast.error(a3)
    }
}

export function exportFile(year) {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    axios.get(`${API_BASE_URL}/Export/BS`,
        { params: { y: year }, responseType: 'blob', }).then(response => {
            console.log(response)
            saveAs(response.data, year + '-' + 'Balace-sheet.xlsx')
        })
}