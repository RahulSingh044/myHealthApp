'use client';
import React, { useState, useEffect, useRef } from 'react';
import { LockKeyhole, X } from 'lucide-react';
import { verifyOtpAction, resendOtpAction } from '../actions/verifyOtp';
import toast from 'react-hot-toast';

const OTP_LENGTH = 6;
const INITIAL_TIMER_DURATION = 60;

export default function VerifyOTP({ isOpen, onClose, onOpenLogin }) {
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
    const [timerDuration, setTimerDuration] = useState(INITIAL_TIMER_DURATION);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isVerifying, setIsVerifying] = useState(false);
    const inputRefs = useRef([]);

    const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : '';

    // Countdown timer
    useEffect(() => {
        if (!isOpen) return
        let interval = null;
        if (timerDuration > 0) {
            interval = setInterval(() => {
                setTimerDuration((prev) => prev - 1);
            }, 1000);
        } else if (timerDuration === 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerDuration, isOpen]);

    // Reset everything when modal opens
    useEffect(() => {
        if (isOpen) {
            setOtp(Array(OTP_LENGTH).fill(''));
            setMessage({ text: '', type: '' });
            setTimerDuration(INITIAL_TIMER_DURATION);
            setIsVerifying(false);
            if (inputRefs.current[0]) inputRefs.current[0].focus();
        }
    }, [isOpen]);

    const isOtpComplete = otp.every((d) => d !== '');

    const handleChange = (e, index) => {
        const value = e.target.value.slice(0, 1);
        if (/[0-9]/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value !== '' && index < OTP_LENGTH - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleResendCode = async () => {
        setTimerDuration(INITIAL_TIMER_DURATION);
        const result = await resendOtpAction(userEmail);

        if (result.success) {
            // setMessage({ text: 'A new verification code has been sent!', type: 'success' });
            toast.success("A new verification code has been sent!")
            setOtp(Array(OTP_LENGTH).fill(''));
            inputRefs.current[0]?.focus();
        } else {
            setMessage({ text: result.message, type: 'error' });
        }
    };

    const handleVerifyOtp = async () => {
        const otpCode = otp.join('');
        if (otpCode.length !== OTP_LENGTH) return;

        setIsVerifying(true);
        setMessage({ text: '', type: '' });

        const result = await verifyOtpAction(userEmail, otpCode);

        if (result.success) {
            setMessage({ text: result.message, type: 'success' });
            onClose();
            onOpenLogin();
        } else {
            setMessage({ text: result.message, type: 'error' });
        }

        setIsVerifying(false);
    };

    const inputClasses =
        'w-14 h-14 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-semibold border-2 rounded-xl transition duration-200 focus:outline-none';

    // ✅ Don’t render at all if modal is closed
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="rounded-lg bg-white p-8 w-1/3 shadow-5xl relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                >
                    <X className="w-6 h-6" />
                </button>

                <header className="text-center mb-8">
                    <LockKeyhole className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Verify Your Account</h1>
                    <p className="text-gray-500">
                        Please enter the 6-digit code sent to your email address {userEmail}
                    </p>
                </header>

                <main>
                    {/* OTP Inputs */}
                    <div className="flex justify-center space-x-2 sm:space-x-3 mb-8">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className={`${inputClasses} ${digit !== '' ? 'border-indigo-500' : 'border-gray-200'
                                    } focus:border-indigo-600 focus:shadow-lg focus:ring-4 focus:ring-indigo-200/50`}
                            />
                        ))}
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={handleVerifyOtp}
                        disabled={!isOtpComplete || isVerifying}
                        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition duration-150 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 flex items-center justify-center"
                    >
                        {isVerifying ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Verifying...
                            </>
                        ) : (
                            'Verify Code'
                        )}
                    </button>

                    {/* Message Box */}
                    {message.text && (
                        <p
                            className={`mt-4 text-center text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-500'
                                }`}
                        >
                            {message.text}
                        </p>
                    )}

                    {/* Resend Timer */}
                    <div className="text-center mt-6 text-sm">
                        {timerDuration > 0 ? (
                            <p className="text-gray-500">
                                Resend code in{' '}
                                <span className="font-bold text-indigo-600">{timerDuration}s</span>
                            </p>
                        ) : (
                            <button
                                onClick={handleResendCode}
                                className="text-indigo-600 font-medium hover:text-indigo-800 transition disabled:opacity-50"
                            >
                                Didn’t receive the code? Resend Now.
                            </button>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
