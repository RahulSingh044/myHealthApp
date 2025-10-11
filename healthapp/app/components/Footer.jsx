import React from 'react'
import { Shield } from 'lucide-react';

function Footer() {

    const section = [
        { name: 'About Us', link: '/' },
        { name: 'Privacy Policy', link: '/' },
        { name: 'Terms', link: '/' },
        { name: 'Team', link: '/' },
        { name: 'Support', link: '/' },
        { name: 'Dispose Data', Link: '/' },
        { name: 'Sitemap', Link:'/'}
    ]

  return (
    <div className='min-h-10 flex items-center justify-center border-t border-gray-200 '>
            <div className='w-full max-w-7xl flex justify-between items-center p-4'>
                <div className=' flex items-center space-x-4 font-semibold font-serif'>
                    <Shield className='text-green-500' /> MediLink
                </div>
                <div className='flex space-x-7 text-sm'>
                    {section.map((sec) => (
                        <div
                            key={sec.name}
                            tabIndex={0}
                            className='flex justify-center items-center cursor-pointer hover:text-green-600 transition-all duration-300'
                        >
                            <p>{sec.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
  )
}

export default Footer