import React, {useState} from 'react'
import {AiOutlineHome, AiOutlineMenu} from 'react-icons/ai'
import { FaC } from 'react-icons/fa6';
import { FaD } from 'react-icons/fa6';
import { FaP } from 'react-icons/fa6';

const Sidenav = () => {
    const [nav, setNav] = useState(false)
    const handleNav = () => {
        setNav(!nav);
    };
    return (
        <div>
            <AiOutlineMenu 
                onClick={handleNav} 
                className='absolute top-4 right-4 z-[99] md:hidden' 
            />
            {nav ? (
                    <div className='fixed w-full h-screen bg-white/90 flex flex-col justify-center items-center z-20'>
                        <a 
                            href="/" 
                            className='w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'
                        >
                            <AiOutlineHome size={20} />
                            <span className='pl-4'>Home</span>
                        </a>
                        <a 
                            href="/Carrillo" 
                            className='w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'
                        >
                            <FaC size={20} />
                            <span className='pl-4'>Carrillo</span>
                        </a>
                        <a 
                            href="/De La Guerra" 
                            className='w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'
                        >
                            <FaD size={20} />
                            <span className='pl-4'>De La Guerra</span>
                        </a>
                        <a 
                            href="/Portola" 
                            className='w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'
                        >
                            <FaP size={20} />
                            <span className='pl-4'>Portola</span>
                        </a>
                    </div>
                )   :
                (
                    ''
                )}
                <div className='md:block hidden fixed top-[25%] z-10'>
                    <div className='flex flex-col'>
                    <a href="/" className='rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-300'>
                            <AiOutlineHome />
                        </a>
                        <a href="/Carrillo" className='rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-300'>
                            <FaC />
                        </a>
                        <a href="/De La Guerra" className='rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-300'>
                            <FaD />
                        </a>
                        <a href="/Portola" className='rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-300'>
                            <FaP />
                        </a>
                    </div>
                </div>




        </div>
    );
};

export default Sidenav;