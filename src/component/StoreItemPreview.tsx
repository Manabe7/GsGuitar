import React from 'react'
import {CarouselDemo1} from './CarouselTemplate'
import { useNavigate } from 'react-router-dom';

const StoreItemPreview = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-row justify-center items-center mt-4 mb-4 w-[80vmin] h-[40vmin] border border-gray-300 rounded-lg'>
            <CarouselDemo1/>
            <div className='w-80% h-full flex flex-col justify-around items-center ml-10 mt-4 mb-4 '>
                <p className="text-lg font-semibold text-gray-800 mr-6 w-[30vmin]">
                    Discover our premium selection of guitars and accessories, crafted for musicians of all levels. Experience quality, style, and exceptional sound in every product.
                </p>
                <button className='rounded-md px-2 py-1 border border-amber-400 mr-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-black cursor-pointer'
                onClick={() => {navigate('/Store')}}
                >More Store Items</button>
            </div>
        </div>
    )
}

export default StoreItemPreview
