import React from 'react';
import logo from '../../../assets/logo.jpg'
const Footer = () => {
    return (
        <footer className="px-4 divide-y dark:bg-gray-800 dark:text-gray-100">
            <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
                <div className="lg:w-1/3">
                    <a rel="noopener noreferrer" href="#" className="flex justify-center space-x-3 lg:justify-start">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-400">
                            <img src= {logo} alt="" />
                        </div>
                        <span className="self-center text-2xl font-semibold">Recycle Mania</span>
                    </a>
                </div>
                <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase dark:text-gray-50">Product</h3>
                        <ul className="space-y-1">
                            <li>
                                <a rel="noopener noreferrer" href="#">Laptop</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Brands</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Pricing</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">FAQ</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase dark:text-gray-50">Company</h3>
                        <ul className="space-y-1">
                            <li>
                                <a rel="noopener noreferrer" href="#">Privacy</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Terms of Service</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="uppercase dark:text-gray-50">Sellers</h3>
                        <ul className="space-y-1">
                            <li>
                                <a rel="noopener noreferrer" href="#">Login</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Sign Up</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Blog</a>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
            <div className="py-6 text-sm text-center dark:text-gray-400">© 2022 Recycle Mania. All rights reserved.</div>
        </footer>
    );
};

export default Footer;