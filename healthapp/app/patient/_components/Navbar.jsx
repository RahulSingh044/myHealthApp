import React from 'react'
import { User } from 'lucide-react'
import { AlertTriangle } from 'lucide-react'
import { QrCodeIcon } from 'lucide-react'
import { Share2 } from 'lucide-react'
import { FileTextIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

function Navbar({ activeSection, setActiveSection }) {

    const router = useRouter();
    const sections = [
        { name: 'Health Profile', icon: <User />, link: '/patient'},
        { name: 'Medical Records', icon: <FileTextIcon />, link: '/records' },
        { name: 'Medication Prescribed', icon: <AlertTriangle />, link: '/medication' },
        { name: 'Emergency Access', icon: <FileTextIcon />, link: '/emergencyAccess' },
        { name: 'Share Records', icon: <Share2 /> },
    ]

    const handleSectionClick = (SectionName) => {
        setActiveSection(SectionName);
    }

    return (
        <div className=' w-1/3 h-1/2 flex flex-col items-center  bg-white rounded-xl shadow-lg px-4 py-4 text-gray-500'>
            {sections.map((section) => (
                <div
                    key={section.name}
                    onClick={() =>{ 
                        handleSectionClick(section.name)
                        router.push(section.link)
                    }}
                    tabIndex={0}
                    className={`
                                px-6 py-3 mt-4 w-full flex items-center gap-5 cursor-pointer
                                rounded-lg mx-2 transition-all duration-300
                                ${activeSection === section.name
                            ? 'bg-green-50 font-semibold text-green-900'
                            : 'hover:bg-gray-50'}
                            }
                            `}
                >
                    {section.icon}
                    <p className="text-md font-medium">{section.name}</p>
                </div>
            ))}
        </div>
    )
}

export default Navbar