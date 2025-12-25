import {useState} from 'react'
import Login from './Login'
import Register from './Register'

const LoginState = () => {
    const [showLoginModal, setLoginModal] = useState(false);
    const [showRegisterModal, setRegisterModal] = useState(false);


   /*  if login button is clicked login modal shows login & state changes to true
    if register button is clicked register modal shows register & state changes to true
    */
    return (
        <div className='flex items-center gap-2'>
            <button 
            className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-tl from-amber-600 to-yellow-300 px-4 py-1.5 text-xs font-normal text-black transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
            onClick={() => {setLoginModal(!showLoginModal); setRegisterModal(false)}}
            >
                <span className="text-sm">Login</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-white/20" />
                </div>
            </button>
            <button 
            className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-tl from-amber-600 to-yellow-300 px-4 py-1.5 text-xs font-normal text-black transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
            onClick={() => {setRegisterModal(!showRegisterModal); setLoginModal(false)}}
            >
                <span className="text-sm">Register</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-white/20" />
                </div>
            </button>

            <div className='absolute top-20 right-10 z-50 shadow-lg'>
                {showLoginModal && !showRegisterModal ?<Login /> : null}
                {showRegisterModal && !showLoginModal ?<Register /> : null}
            </div>
            
            
        </div>
    )
}

export default LoginState
