import React from 'react'
import Footer from './Footer'
import UserProfileNav from './UserProfileNav';


const SettingPage = () => {
    return (
        <div>
            <UserProfileNav/>
            <div className='min-h-screen flex flex-col justify-center items-center mt-8 mb-8'>
                <div className='text-3xl font-bold mb-4'>SettingPage</div>
              </div>
              <Footer/>
        </div>
    )
}

export default SettingPage
