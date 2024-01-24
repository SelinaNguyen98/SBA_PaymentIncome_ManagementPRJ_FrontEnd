
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function pad2(number) {
    return (number < 10 ? '0' : '') + number.toString()
}

// get data bS ở năm đó, gọi ở useEffect tại màn hình BO1
export function getAllTable(year, setData) {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    axios.get(`${API_BASE_URL}/getDataBS`,
        {
            params: {
                y: year
            }
        })
        .then(response => setData(response.data))
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
            console.log(response)
            if (response.data.success == true) {
                setData(response.data)
            } else {
                axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
                axios.get(`${API_BASE_URL}/categories`,
                    {
                        params:
                        {
                            'report_type': 'bs',
                            per_page : 10000000,
                            page: 1
                        }
                    }
                ).then(response => {
                    console.log(response)
                })
            }
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
                exchangeDate: pad2(month) + '-' + year
            })
        }
        else {
            setExchangeRate({
                jpy: '',
                usd: '',
                id: '',
                exchangeDate: pad2(month) + '-' + year
            })
        }
    }
    )
}

// được gọi khi nhấn nút save ở exchange rate 
export function createOrUpdateExchangeRate(exchangeRate) {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    axios.post(`${API_BASE_URL}/exchangeRate`, {
        ...exchangeRate
    }).then(response => console.log(response))
}

export function saveMonthly(month, year, data_month) {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    axios.post(`${API_BASE_URL}/balances`, {
        month_year: year.toString() + '-' + pad2(month),
        balances: data_month.balance_sheet
    }).then(response => console.log(response))
}