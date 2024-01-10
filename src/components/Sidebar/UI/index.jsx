import logo from '../../../assets/Images/Logo_SBA.png'
import comName from '../../../assets/Images/Frame 17.png'
import React from 'react'

export default function SideBar() {
    const refUl = React.createRef(null)

    const selectOption = (e) => {
        for (let el of refUl.current.children) {
            console.log(el)
            el.classList = "bg-[#121C3E] mb-3 min-h-9 rounded-md p-1 h-fit min-w-56 text-white"
            e.currentTarget.classList = "bg-yellow-400 mb-3 min-h-9 rounded-md p-1 h-fit min-w-56"
        }
    }

    return (
        <div className='px-4 pt-7 h-screen min-h-fit grid grid-rows-3 bg-[#121C3E] min-w-59'>
            <div className='px-4 relative mb-8 min-h-fit'>
                <img src={logo} alt="" className='h-20 w-44' />
                <img className='absolute top-[65px]' src={comName} alt="" />
            </div>
            <ul className='min-h-fit' ref={refUl}>
                <li className='bg-yellow-400 mb-3 min-h-9 rounded-md p-1 h-fit min-w-56' onClick={(e) => selectOption(e)}>
                    <i className="fa-solid fa-file-lines "></i>
                    <span className='w-3 inline-block'></span>
                    Account Category
                </li>
                <li className='bg-yellow-400 mb-3 min-h-9 rounded-md p-1 h-fit min-w-56' onClick={(e) => selectOption(e)}>
                    <i className="fa-solid fa-table-cells-large"></i>
                    <span className='w-3 inline-block'></span>
                    Account Category Group
                </li>
                <li className='bg-yellow-400 mb-3 min-h-9 rounded-md p-1 h-fit min-w-56' onClick={(e) => selectOption(e)}>
                    <i className="fa-regular fa-credit-card"></i>
                    <span className='w-3 inline-block'></span>
                    Invoice Management
                </li>
                <li className='bg-yellow-400 mb-3 min-h-9 rounded-md p-1 h-fit min-w-56' onClick={(e) => selectOption(e)}>
                    <i className="fa-solid fa-book-open"></i>
                    <span className='w-3 inline-block'></span>
                    Profit and Loss Report
                </li>
                <li className='bg-yellow-400 mb-3 min-h-9 rounded-md p-1 h-fit min-w-56' onClick={(e) => selectOption(e)}>
                    <i className="fa-solid fa-book-open"></i>
                    <span className='w-3 inline-block'></span>
                    Balance Sheet Report
                </li>
            </ul>
            <div className='relative items-center min-h-fit'>
                <button className='text-white bg-red-900 rounded-lg h-7 w-28 text-lg absolute bottom-3 left-16'><i className="fa-solid fa-power-off"></i>Log out</button>
            </div>
        </div>
    )
}