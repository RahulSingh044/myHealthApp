'use client';
import React, { useState, useEffect } from 'react'
import { Plus, Shield } from 'lucide-react'
import { LogOut, CreditCard } from 'lucide-react'
import Navbar from './_components/Navbar'
import { useRouter } from 'next/navigation'
import { userAction } from '../actions/userAction'

function Home() {

    const router = useRouter();

    const [activeSection, setActiveSection] = useState('Health Profile')
    const [isAllergiesOpen, setIsAlergiesOpen] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [allergies, setAllergies] = useState([]);
    const [isChronicConditionsOpen, setIsChronicConditionsOpen] = useState(false);
    const [chronicCondition, setChronicCondition] = useState([])
    const [user, setUser] = useState(null);

    const [personalInfo, setPersonalInfo] = useState({
        fullName: '',
        dob: '',
        gender: '',
        bloodGroup: '',
        phone: '',
        email: ''
    })

    const [isInsuranceInfo, setInsuranceInfo] = useState({
        insuranceInfo: '',
        contactName: '',
        contactNumber: '',
    })

    const [allergy, setAllergy] = useState({
        name: '',
        reaction: '',
        type: ''
    })

    const [chronic, setChronic] = useState({
        conditionName: '',
        date: '',
        notes: '',
    })


    useEffect(() => {
        const getUser = async () => {
            try{
                const result = await userAction();
                if(result.success) {
                    console.log("user", result.data)
                    setUser(result);
                }
            } catch (error) {
                console.log("Error getting Current User",error)
            }
        }

        getUser();
    }, [router])

    const handleSave = () => {
        console.log("Perosnal Information", personalInfo)
        console.log("Insurance Info", isInsuranceInfo)
        alert("Changes are updated Successfully")
        setIsEditable(false)
    }

    const handleAddAllergy = () => {
        const isEmpty = Object.values(allergy).every(value => value.trim() === '');

        if (isEmpty) {
            alert("Please fill at least one field before adding an allergy.");
            return;
        }

        const allergyString = `${allergy.name} - [${allergy.reaction}] (${allergy.type})`;

        setAllergies(prev => [...prev, allergyString]);
        setAllergy({ name: '', reaction: '', type: '' });
        setIsAlergiesOpen(false);
    };

    const handleAddChronic = () => {
        const isEmpty = Object.values(chronic).every(value => value.trim() === '');

        if (isEmpty) {
            alert("Please fill at least one field before adding an allergy.");
            return;
        }

        const chronicString = `${chronic.conditionName} - ${chronic.date} (${chronic.notes})`;

        setChronicCondition(prev => [...prev, chronicString]);
        setChronic({ conditionName: '', date: '', notes: '' });
        setIsChronicConditionsOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push('/');
    }

    // if (!user) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen">
    //             <p>Loading...</p>
    //         </div>
    //     );
    // }

    return (
        <div className='min-h-screen bg-slate-50'>
            <div className='w-full flex justify-between items-center py-4 px-40 bg-white border-b-2 border-gray-200'>
                <div className='text-2xl flex items-center space-x-4 font-semibold font-serif'>
                    <Shield className='text-teal-500' /> MediLink
                </div>
                <div className='flex items-center space-x-4 '>
                    <span className='text-gray-500 mr-10'> {user?.email} </span>
                    <LogOut
                        size={20}
                        className='mr-2 cursor-pointer hover:text-red-500'
                        onClick={handleLogout}
                    />  Sign Out
                </div>
            </div>

            <div className='w-full flex px-40 py-8 gap-6'>
                <Navbar
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />
                <div className='w-full p-8 bg-white rounded-2xl shadow-lg'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-2xl font-bold'> Health Profile</h1>
                        {isEditable ? (
                            <div className='flex gap-2'>
                                <button
                                    onClick={handleSave}
                                    className="bg-teal-500 cursor-pointer text-white px-3 py-1 rounded-xl"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsEditable(false)}
                                    className="bg-gray-200 cursor-pointer px-3 py-1 rounded-xl"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsEditable(true)}
                                className='bg-teal-500 cursor-pointer text-white px-3 flex items-center gap-2 py-2 rounded-xl'
                            >
                                <CreditCard size={20} /> Edit Profile
                            </button>
                        )}

                    </div>

                    <div className='flex-col justify-between items-center gap-10'>
                        <div className='bg-gray-50 w-full rounded-2xl mt-10 px-4 py-4'>
                            <h1 className='font-semibold text-xl'>Personal Information</h1>
                            <div className='flex w-full justify-between items-center gap-4'>
                                <div className='w-full mt-4'>
                                    <label htmlFor="fullName" className="text-md mb-1">Full Name</label>
                                    <input
                                        type='text'
                                        id='fullName'
                                        onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                                        value={personalInfo.fullName}
                                        placeholder='your Name'
                                        className={`w-full mt-2 p-2 rounded-lg ${isEditable ? `bg-white border-2` : `bg-gray-100`} border-gray-200`}
                                        disabled={!isEditable}
                                    />
                                </div>

                                <div className='w-full mt-4'>
                                    <label htmlFor="dob" className="text-md mb-1">Date of Birth</label>
                                    <input
                                        type='date'
                                        id='dob'
                                        onChange={(e) => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
                                        value={personalInfo.dob}
                                        className={`w-full mt-2 p-2 rounded-lg ${isEditable ? `bg-white border-2` : `bg-gray-100`} border border-gray-200`}
                                        disabled={!isEditable}
                                    />
                                </div>
                            </div>

                            <div className='flex w-full justify-between items-center gap-4'>
                                <div className='w-full mt-4'>
                                    <label htmlFor="gender" className="text-md">Gender</label>
                                    <select
                                        id="gender"
                                        onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                                        value={personalInfo.gender}
                                        className={`w-full ${isEditable ? `bg-white border-2` : `bg-gray-100`} border border-gray-300 rounded-xl px-4 mt-2 py-2`}
                                        disabled={!isEditable}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className='w-full mt-4'>
                                    <label htmlFor="BloodGroup" className="text-md">Blood Group</label>
                                    <select
                                        id="bloodGroup"
                                        onChange={(e) => setPersonalInfo({ ...personalInfo, bloodGroup: e.target.value })}
                                        value={personalInfo.bloodGroup}
                                        className={`w-full ${isEditable ? `bg-white border-2` : `bg-gray-100`} border border-gray-300 rounded-xl px-4 py-2 mt-2`}
                                        disabled={!isEditable}
                                    >
                                        <option value="">Select Blood Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                </div>
                            </div>

                            <div className='flex w-full justify-between items-center gap-4'>
                                <div className='w-full mt-4'>
                                    <label htmlFor="phone" className="text-md mb-1">Phone</label>
                                    <input
                                        type='number'
                                        id='mobileNumber'
                                        onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                                        value={personalInfo.phone}
                                        placeholder='+91 50412 34567'
                                        className={`w-full mt-2 p-2 rounded-lg ${isEditable ? `bg-white border-2` : `bg-gray-100`} border border-gray-200`}
                                        disabled={!isEditable}
                                    />
                                </div>

                                <div className='w-full mt-4'>
                                    <label htmlFor="email" className="text-md mb-1">Email</label>
                                    <input
                                        type='email'
                                        id='email'
                                        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                                        value={personalInfo.email}
                                        className={`w-full mt-2 p-2 rounded-lg ${isEditable ? `bg-white border-2` : `bg-gray-100`} border border-gray-200`}
                                        disabled={!isEditable}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='bg-gray-50 w-full rounded-2xl mt-10 px-4 py-4'>
                            <h1 className='font-semibold text-xl'>Insurance & Emergency Contacts</h1>
                            <div className='flex w-full justify-between items-center gap-4'>
                                <div className='w-full mt-4'>
                                    <label htmlFor="insuranceInfo" className="text-md mb-1">Insurance Information</label>
                                    <input
                                        type='text'
                                        id='insuranceInfo'
                                        onChange={(e) => setInsuranceInfo({ ...isInsuranceInfo, insuranceInfo: e.target.value })}
                                        value={isInsuranceInfo.insuranceInfo}
                                        className={`w-full mt-2 p-2 rounded-lg ${isEditable ? `bg-white border-2` : `bg-gray-100`} border border-gray-200`}
                                        disabled={!isEditable}
                                    />
                                </div>
                            </div>

                            <div className='flex w-full justify-between items-center gap-4'>
                                <div className='w-full mt-4'>
                                    <label htmlFor="phone" className="text-md mb-1">Emergency Contact Name</label>
                                    <input
                                        type='text'
                                        id='EmergName'
                                        onChange={(e) => setInsuranceInfo({ ...isInsuranceInfo, contactName: e.target.value })}
                                        value={isInsuranceInfo.contactName}
                                        placeholder='Ramesh'
                                        className={`w-full mt-2 p-2 rounded-lg ${isEditable ? `bg-white border-2` : `bg-gray-100`} border border-gray-200`}
                                        disabled={!isEditable}
                                    />
                                </div>

                                <div className='w-full mt-4'>
                                    <label htmlFor="EmergencyPhone" className="text-md mb-1">Emergency Phone Number</label>
                                    <input
                                        type='number'
                                        id='EmergencyPhone'
                                        onChange={(e) => setInsuranceInfo({ ...isInsuranceInfo, contactNumber: e.target.value })}
                                        value={isInsuranceInfo.contactNumber}
                                        placeholder='+91 50412 34567'
                                        className={`w-full mt-2 p-2 rounded-lg ${isEditable ? `bg-white border-2` : `bg-gray-100`} border border-gray-200`}
                                        disabled={!isEditable}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-red-50 w-full rounded-xl mt-10 px-4 py-4">
                            <div className="flex justify-between items-center">
                                <h1 className="text-lg font-semibold">Allergies</h1>
                                <button
                                    onClick={() => setIsAlergiesOpen(true)}
                                    className="bg-red-600 cursor-pointer text-white px-3 flex items-center gap-2 py-2 rounded-xl"
                                >
                                    <Plus size={20} /> Add Allergy
                                </button>
                            </div>

                            {/* Input field appears when button is clicked */}
                            {isAllergiesOpen && (
                                <div className='w-full bg-white p-4 mt-4 border border-red-200 rounded-lg shadow-lg'>
                                    <div className="mt-4 flex flex-col gap-3">
                                        <div className='grid grid-cols-3 gap-4'>
                                            <input
                                                type="text"
                                                placeholder="Allergy Name"
                                                value={allergy.name}
                                                onChange={(e) => setAllergy({ ...allergy, name: e.target.value })}
                                                className="border border-red-300 rounded-lg px-3 py-2 w-full outline-none"
                                            />
                                            <input
                                                type="text"
                                                placeholder="reaction"
                                                value={allergy.reaction}
                                                onChange={(e) => setAllergy({ ...allergy, reaction: e.target.value })}
                                                className="border border-red-300 rounded-lg px-3 py-2 w-full outline-none"
                                            />
                                            <select
                                                value={allergy.type}
                                                onChange={(e) => setAllergy({ ...allergy, type: e.target.value })}
                                                className="border border-red-300 rounded-lg px-3 py-2 w-full outline-none"
                                            >
                                                <option value="Mild">Mild</option>
                                                <option value="Moderate">Moderate</option>
                                                <option value="Severe">Severe</option>
                                            </select>
                                        </div>

                                        <div className='flex gap-2'>
                                            <button
                                                onClick={handleAddAllergy}
                                                className="bg-red-600 text-white cursor-pointer px-3 py-1 rounded-lg"
                                            >
                                                Add
                                            </button>
                                            <button
                                                onClick={() => setIsAlergiesOpen(false)}
                                                className="bg-gray-200 cursor-pointer text-black px-3 py-1 rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            )}

                            <div className="mt-4">
                                {allergies.length > 0 ? (
                                    <ul className="list-disc list-inside text-gray-700">
                                        {allergies.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No allergies</p>
                                )}
                            </div>
                        </div>

                        <div className='bg-blue-50 w-full rounded-xl mt-10 px-4 py-4'>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-lg font-semibold'>Chronic Conditions </h1>
                                <button
                                    onClick={() => setIsChronicConditionsOpen(true)}
                                    className='bg-blue-600 cursor-pointer text-white px-3 flex items-center gap-2 py-2 rounded-xl'
                                >
                                    <Plus size={20} /> Add Condition
                                </button>
                            </div>

                            {/* Input field appears when button is clicked */}
                            {isChronicConditionsOpen && (
                                <div className='w-full bg-white p-4 mt-4 border border-blue-200 rounded-lg shadow-lg'>
                                    <div className="mt-4 flex flex-col gap-3">
                                        <div className='grid grid-cols-3 gap-4'>
                                            <input
                                                type="text"
                                                onChange={(e) => setChronic({ ...chronic, conditionName: e.target.value })}
                                                value={chronic.conditionName}
                                                placeholder="Condition Name"
                                                className="border border-blue-300 rounded-lg px-3 py-2 w-full outline-none"
                                            />
                                            <input
                                                type="date"
                                                placeholder="date"
                                                onChange={(e) => setChronic({ ...chronic, date: e.target.value })}
                                                value={chronic.date}
                                                className="border border-blue-300 rounded-lg px-3 py-2 w-full outline-none"
                                            />
                                        </div>

                                        <textarea
                                            placeholder='Notes'
                                            onChange={(e) => setChronic({ ...chronic, notes: e.target.value })}
                                            value={chronic.notes}
                                            className="border border-blue-300 rounded-lg px-3 py-2 w-full outline-none"
                                        >

                                        </textarea>

                                        <div className='flex gap-2'>
                                            <button
                                                onClick={handleAddChronic}
                                                className="bg-blue-600 text-white px-3 py-1 rounded-lg"
                                            >
                                                Add
                                            </button>
                                            <button
                                                onClick={() => setIsChronicConditionsOpen(false)}
                                                className="bg-gray-200 text-black px-3 py-1 rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-4">
                                {chronicCondition.length > 0 ? (
                                    <ul className="list-disc list-inside text-gray-700">
                                        {chronicCondition.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No Chronic Condition</p>
                                )}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home