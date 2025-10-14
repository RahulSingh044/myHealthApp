'use client';
import React, { useState } from 'react'
import { Shield } from 'lucide-react';
import Login from './Login';
import SignUp from './SignUp';
import OTP from './verifyOTP';


function Navbar() {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isOtpOpen, setIsOtpOpen] = useState(false);

    const section = [
        { name: 'Home', link: '/' },
        { name: 'Features', link: '/about' },
        { name: 'How It Works', link: '/services' },
        { name: 'FAQ', link: '/faq' },
        { name: 'Contact', link: '/contact' }
    ]

    return (
        <div className='min-h-16 flex items-center justify-center'>
            <div className='w-full max-w-7xl flex justify-between items-center p-4'>
                <div className='text-2xl flex items-center space-x-4 font-semibold font-serif'>
                    <Shield className='text-teal-500' /> MediLink
                </div>
                <div className='flex space-x-7 text-lg'>
                    {section.map((sec) => (
                        <div
                            key={sec.name}
                            tabIndex={0}
                            className='flex justify-center items-center cursor-pointer hover:text-teal-600 transition-all duration-300'
                        >
                            <p>{sec.name}</p>
                        </div>
                    ))}
                    <button
                        onClick={() => setIsLoginOpen(true)}
                        className=' text-teal-600 px-4 py-2 rounded-md border border-teal-600 hover:bg-teal-500 hover:text-white transition-colors duration-300'>
                        Login/Sign up
                    </button>
                </div>
            </div>

            {/* Modals */}
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


        </div>
    )
}

export default Navbar