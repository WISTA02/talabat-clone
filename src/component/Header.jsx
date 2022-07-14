import React from 'react'
import logo from "../assest/logo.png";

function Header() {
  return (
    <header className="fixed z-50 w-screen p-6 px-16">
    {/* desktop & tablat */}
    <div className='hidden md:flex w-full h-full'>
      <div className='felx items-center gap-5'>
        <img src={logo} className="w-10 object-cover" alt='logo'></img>
      <p className="text-headIngColor text-xl font-bold">Mr Delivery</p>
      </div>

      <ul className="flex items-center gap-8 ml-auto">
        <li className='text-base text-textColor hover:text-headInColor duration-100'>Home</li>
        <li className='text-base text-textColor hover:text-headInColor duration-100'>Menu</li>
        <li className='text-base text-textColor hover:text-headInColor duration-100'>About Us</li>
        <li className='text-base text-textColor hover:text-headInColor duration-100'>Service</li>
      </ul>
    </div>


    {/* mobile */}
    <div className='flex md:hidden w-full h-full'></div>
    </header>
  );
};

export default Header