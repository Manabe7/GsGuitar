import {useState} from 'react'

import { FaCircleHalfStroke } from "react-icons/fa6";

const DarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);
    
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };


    return (
        <div>
            <button className='group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-white border border-amber-400 px-4 py-1.5 text-xm font-normal text-black transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-dark-500/30 cursor-pointer'
            onClick={toggleDarkMode} ><FaCircleHalfStroke />
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-black/20" />
                </div>
            </button>
        </div>
    )
}

export default DarkMode
