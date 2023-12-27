import logo from '../../../assets/Images/Logo_SBA.png'
import comName from '../../../assets/Images/Frame 17.png'

export default function SideBar() {
    return (
        <div className='px-4 pt-7 h-screen grid grid-rows-3'>
            <div className='px-4 relative mb-8'>
                <img src={logo} alt="" className='h-20 w-44' />
                <img className='absolute top-[65px]' src={comName} alt="" />
            </div>
            <ul className=''>
                <li className='bg-yellow-300'>
                    Account Catagory
                </li>
                <li className='bg-yellow-300'>
                    Account Catagory Group
                </li>
                <li className='bg-yellow-300'>
                    Invoice Management
                </li>
                <li className='bg-yellow-300'>
                    Profit and Loss Report
                </li>
                <li className='bg-yellow-300'>
                    Balance Sheet Report
                </li>
            </ul>
            <div className='relative items-center'>
                <button className='text-white bg-red-900 rounded-lg h-6 w-20 text-lg absolute bottom-3'>Log out</button>
            </div>
        </div>
    )
}