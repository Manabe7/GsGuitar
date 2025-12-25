import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareYoutube } from "react-icons/fa6";
import Logo from './Logo';

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-200 dark:bg-gray-800 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-700 dark:text-gray-300 mb-4 md:mb-0">
                            <h2 className="text-lg font-semibold "><Logo/></h2>
                                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-100">
                                    &copy; {new Date().getFullYear()} Guitar G's. All rights reserved.
                                </p>
                        </div>
                        <div className="text-gray-700 dark:text-gray-300">
                            <h3 className="mb-4 text-center text-sm text-gray-600 dark:text-gray-100">
                                    Follow Us on Social Media
                                </h3>
                            <div className="flex space-x-4">
                                <a href="" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-3xl"><FaFacebookSquare /></a>
                                <a href="" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-3xl"><FaSquareXTwitter /></a>
                                <a href="" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-3xl"><FaInstagramSquare /></a>
                                <a href="" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-3xl"><FaSquareYoutube /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            
           
        </div>
    )
}

export default Footer
