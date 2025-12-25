import React from 'react'
import { IoCartOutline } from "react-icons/io5";
import GsServerAPI from '@/api/GsServerAPI';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const handleCheckout = async () => {
        navigate('/CartCheckOut');
    }
    {/* check checkout state
                if checkout state is true
                show checkout page
                else show cart page
            */} 
            {/*  show cart page 
            show item in cart
            total price
            checkout button */}
    return (
        <div>

            <button 
                className='group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-white border border-amber-400 px-4 py-1.5 text-xm font-normal text-black transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-dark-500/30 cursor-pointer'
                onClick={handleCheckout} ><IoCartOutline />
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-black/20" />
                </div>
            </button>


            
        </div>
    )
}

export default Cart
