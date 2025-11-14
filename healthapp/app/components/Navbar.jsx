'use client';
import React, { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react'; 
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import OTP from '../components/verifyOTP';

function Navbar() {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isOtpOpen, setIsOtpOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const section = [
        { name: 'Home', link: '/' },
        { name: 'Features', link: '/about' },
        { name: 'How It Works', link: '/services' },
        { name: 'FAQ', link: '/faq' },
        { name: 'Contact', link: '/contact' }
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLinkClick = (isAuth = false) => {
        // Close mobile menu if a link or auth button is clicked on mobile
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header className='sticky top-0 z-40 bg-white shadow-lg font-[Inter]'>
            <div className='min-h-16 flex items-center justify-center'>
                <div className='w-full max-w-7xl flex justify-between items-center px-4 py-3'>
                    {/* Logo/Brand */}
                    <div className='text-2xl flex items-center space-x-2 font-semibold font-serif text-gray-800'>
                        <Shield className='text-teal-500 w-6 h-6' /> MediLink
                    </div>

                    {/* Desktop Navigation Links (Hidden on small screens, flex on md and up) */}
                    <div className='hidden md:flex space-x-5 lg:space-x-7 text-lg items-center'>
                        {section.map((sec) => (
                            <a
                                href={sec.link} // Changed div to a for semantic linking
                                key={sec.name}
                                onClick={handleLinkClick}
                                className='flex justify-center items-center cursor-pointer hover:text-teal-600 transition-colors duration-300 font-medium text-gray-700'
                            >
                                {sec.name}
                            </a>
                        ))}
                        <button
                            onClick={() => {
                                handleLinkClick(true);
                                setIsLoginOpen(true);
                            }}
                            className='text-teal-600 px-4 py-2 rounded-lg border border-teal-600 hover:bg-teal-500 hover:text-white transition-colors duration-300 font-semibold shadow-md hover:shadow-lg'
                        >
                            Login/Sign up
                        </button>
                    </div>

                    {/* Mobile Menu Button (Hidden on md and up, visible on small screens) */}
                    <div className='md:hidden'>
                        <button
                            onClick={toggleMobileMenu}
                            className='text-gray-800 hover:text-teal-600 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500'
                            aria-label="Toggle navigation menu"
                        >
                            {isMobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer (Conditionally rendered) */}
            <div
                className={`md:hidden absolute w-full bg-white shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
                    isMobileMenuOpen ? 'max-h-screen border-t border-gray-100' : 'max-h-0 border-t-0'
                }`}
            >
                <nav className='flex flex-col p-4 space-y-3'>
                    {section.map((sec) => (
                        <a
                            href={sec.link}
                            key={sec.name}
                            onClick={handleLinkClick}
                            className='block px-3 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-md transition-colors'
                        >
                            {sec.name}
                        </a>
                    ))}
                    <button
                        onClick={() => {
                            handleLinkClick(true);
                            setIsLoginOpen(true);
                        }}
                        className='w-full text-center mt-4 text-teal-600 px-3 py-2 rounded-lg border border-teal-600 hover:bg-teal-500 hover:text-white transition-colors duration-300 font-semibold text-base shadow-sm'
                    >
                        Login/Sign up
                    </button>
                </nav>
            </div>

            {/* Modals - Keeping the original logic */}
            <Login
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSwitchToSignUp={() => {
                    setIsLoginOpen(false);
                    setIsSignUpOpen(true);
                }}
            />

            <SignUp
                isOpen={isSignUpOpen}
                onClose={() => setIsSignUpOpen(false)}
                onSwitchToLogin={() => {
                    setIsSignUpOpen(false);
                    setIsLoginOpen(true);
                }}
                onOpenOtp={() => setIsOtpOpen(true)}
            />

            <OTP
                isOpen={isOtpOpen}
                onClose={() => setIsOtpOpen(false)}
                onOpenLogin={() => setIsLoginOpen(true)}
            />
        </header>
    );
}

export default Navbar;