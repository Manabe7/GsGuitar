import React from 'react'
import Header from './Header'
import guitar from '../img/gibson-1968-les-paul-custom/gibson-1968-les paul-custom-01.png'
import Footer from './Footer'
import BlogItem from './BlogItem'
import {CarouselDemo} from '../component/Carousel';
import StoreItemPreview from './StoreItemPreview'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductContextProvider } from './Context/ProductContext'

const Home = () => {
    const  [ showNav, setShowNav ]  = useState (false);
    const navigate = useNavigate();
    return (
        <div>
            <Header showNav={true} />
            <section id='Home'>
                <div className='flex  flex-col justify-center items-center mt-4 mb-4'>
                    <img src={guitar} alt="gibson-les-paul-1968-custom" 
                    className='h-150 w-240'/>
                    
                        <div className='text-4xl font-bold'>Welcome to G's Guitar</div>
                        <div className='text-xl font-semibold'>Your one-stop shop for all things guitar!</div>
                        <div className='text-md font-normal'>Explore our wide selection of guitars, accessories, and lessons to take your playing to the next level.</div>
                        
                        <button className='rounded-md px-2 py-1 border border-amber-400 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-black cursor-pointer'>Learn More About Us</button>
                        
                </div> 
                <div className='flex justify-center items-center mt-4 mb-4'>
                   <CarouselDemo />
                </div>
            </section>
            <section id='Blog'>
                <div className='flex flex-col justify-center items-center pt-4 pb-4 m-4 border border-gray-300 rounded-lg'>
                        <div className='flex justify-center items-center text-2xl font-bold mb-4'>
                            <BlogItem imgSrc={guitar} title='No1 Blog' description='blog number 1 description'/>
                             <BlogItem imgSrc={guitar} title='No1 Blog' description='blog number 1 description'/>
                              <BlogItem imgSrc={guitar} title='No1 Blog' description='blog number 1 description'/>
                        </div>
                        <div className='flex justify-center items-center text-2xl font-bold mb-4'>
                            <BlogItem imgSrc={guitar} title='No1 Blog' description='blog number 1 description'/>
                             <BlogItem imgSrc={guitar} title='No1 Blog' description='blog number 1 description'/>
                              <BlogItem imgSrc={guitar} title='No1 Blog' description='blog number 1 description'/>
                        </div>
                        <button className='rounded-md px-2 py-1 border border-amber-400 mr-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-black cursor-pointer'
                        onClick={() => {navigate('/Blog')}}
                        >More Blog Post</button> 
                </div>
                  
            </section>
            <ProductContextProvider>
                <section id='Store'>
                    <div className='flex flex-col justify-center items-center'>
                        <div className=' mt-4 mb-4 text-2xl font-bold'
                        >Our G's Store</div>
                        <StoreItemPreview/>
                    </div>
                </section>
            </ProductContextProvider>
            <section id='Course'>
                <div className='flex flex-col justify-center items-center p-4 m-4'>
                    Our Available Courses
                    <div className='flex flex-col justify-center items-center pt-4 pb-4 m-4 border border-gray-300 rounded-lg'>
                        <div className='flex justify-center items-center text-2xl font-bold ml-4'>
                            <BlogItem imgSrc={guitar} title='No1 Blog' description='blog number 1 description'/>
                             <BlogItem imgSrc={guitar} title='No1 Blog' description='blog number 1 description'/>
                              <BlogItem imgSrc={guitar} title='No1 Blog' description='blog number 1 description'/>
                        </div>
                        <button className='rounded-md px-2 py-1 border border-amber-400 mr-4 mt-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-black cursor-pointer'
                        onClick={() => {navigate('/Course')}}
                        >Check Out More Courses</button>    
                    </div>
                </div>



            </section>
            <Footer />
        </div>
    )
}

export default Home
