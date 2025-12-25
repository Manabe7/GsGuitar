import {useState} from 'react'
import { IconUser,IconSettings,IconArrowLeft } from "@tabler/icons-react";
import { BiSpreadsheet } from "react-icons/bi";
import { LuMenu } from "react-icons/lu";
import { useContext } from 'react';
import { AuthContext } from './Context/LogInContext';
import { UsersContext } from './Context/UserDataContext';
import { useNavigate } from 'react-router-dom';
import { UsersProfileContext } from './Context/UserProfileContext';
import GsServerAPI from '@/api/GsServerAPI';


const MenuBar = () => {
    const navigate = useNavigate();
    const [dropbar, setDropbar] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const { 
        accessToken,
        setFirstName,
        setLastName,
        setEmail,
        setAccessToken
       } = useContext(UsersContext);

    const {
        setStreet,
        setCountry,
        setCity,
        setPostalCode,
        setPhoneNumber
    } = useContext(UsersProfileContext);

    const toggleDropbar = () => {
        setDropbar(!dropbar);
    };

    const handleLogout = async () => {
        // Here you can add any logout logic you need, such as clearing tokens or user data
        try {
            const response = await GsServerAPI.get("/logout", 
            {
                headers: { 'Authorization': `Bearer ${accessToken}`},
                withCredentials: true
            });
            if (response.status === 200) {
                console.log("Logout successful:", response.data);
                setFirstName && setFirstName("");
                setEmail && setEmail("");
                setAccessToken && setAccessToken("");
                localStorage.removeItem("Name");
                if (setIsLoggedIn) {
                    setIsLoggedIn(!isLoggedIn);
                    navigate('/Home');
                }
             }
        }catch (error) {
            console.error("Logout failed:", error);
        }
       
    };

    const handleNavigateUserProfile = async () => { 
        try {
            const response = await GsServerAPI.get("/userProfile", 
            {
                headers: { 'Authorization': `Bearer ${accessToken}`},
                withCredentials: true
            });
            if (response.status === 200) {
                const userData = response.data?.userData ?? {};
                const profile = response.data?.currentUserProfile ?? {};

                // helper to set context value and localStorage in one line
                const setAndStore = (setter: ((v: string) => void) | undefined, key: string, value: any) => {
                    const strValue = value == null ? '' : String(value);
                    setter && setter(strValue);
                    localStorage.setItem(key, strValue);
                };

                // update user fields
                const userFields: { key: keyof typeof userData, setter?: (v: string) => void }[] = [
                    ['firstName', setFirstName],
                    ['lastName', setLastName],
                    ['email', setEmail],
                ];
                userFields.forEach(([key, setter]) => {
                    setAndStore(setter, String(key), userData[key] ?? '');
                });

                // update profile fields
                const profileFields: { key: keyof typeof profile, setter?: (v: string) => void }[] = [
                    ['street', setStreet],
                    ['country', setCountry],
                    ['city', setCity],
                    ['postalCode', setPostalCode],
                    ['phoneNumber', setPhoneNumber],
                ];
                profileFields.forEach(([key, setter]) => {
                    setAndStore(setter, String(key), profile[key] ?? '');
                });

                navigate('/UserProfilePage');
            }
        }catch (error) {
            console.error("fail to get userProfile:", error);
        }
        
    };
    return (
        <div>
            <button
                className='group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-white border border-amber-400 px-4 py-1.5 text-xm font-normal text-black transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-dark-500/30'
                onClick={() => {toggleDropbar()}}
                >
                <LuMenu />
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-black/20" />
                </div>
            </button>
            
            {dropbar && 
            <div className='absolute top-20 right-0 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md p-4'>
                <ul className='space-y-2'>
                   <li className='flex items-center gap-2'
                    >
                       <button onClick={handleNavigateUserProfile} className='flex items-center gap-2'
                        > 
                        <IconUser className='h-6 w-6'/>Profile
                        </button>
                    </li>
                    <li className='flex items-center gap-2'
                    >
                       <button onClick={()=> navigate('/OrdersPage')} className='flex items-center gap-2'> 
                        <BiSpreadsheet className='h-6 w-6'/>Orders
                        </button>
                    </li>
                    <li className='flex items-center gap-2'
                    >
                       <button onClick={()=> {navigate('/SettingPage')}} className='flex items-center gap-2'> 
                        <IconSettings className='h-6 w-6'/>Setting
                        </button>
                    </li>
                    <li className='flex items-center gap-2'
                    >
                       <button className='flex items-center gap-2' onClick={handleLogout}> 
                        <IconArrowLeft className='h-6 w-6'/>Logout
                        </button>
                    </li>
                </ul>
            </div>}
            

        </div>
    )
}

export default MenuBar
