import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserProfileNav = () => {
    const navigate = useNavigate();
    return (
        <div>
            <nav className="flex flex-col fixed left-0 top-0 h-screen w-48 p-4 space-y-2">
                <ul className="space-y-2">
                    <li className="cursor-pointer hover:bg-gray-300 p-2 rounded" onClick={()=> navigate('/Home')}>Home</li>
                    <li className="cursor-pointer hover:bg-gray-300 p-2 rounded" onClick={()=> navigate('/UserProfilePage')}>Profile</li>
                    <li className="cursor-pointer hover:bg-gray-300 p-2 rounded" onClick={()=> navigate('/OrdersPage')}>Orders</li>
                    <li className="cursor-pointer hover:bg-gray-300 p-2 rounded" onClick={()=> navigate('/SettingPage')}>Setting</li>
                </ul>
            </nav>
        </div>
    )
}

export default UserProfileNav
