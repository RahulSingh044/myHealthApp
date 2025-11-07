'use client';
import React, { useState, useEffect } from 'react'
import { Plus, Shield } from 'lucide-react'
import { CreditCard } from 'lucide-react'
import Navbar from './Navbar';
import { useRouter } from 'next/navigation'
import { addAllergy, addChronic, editProfileAction, userAction } from '../../actions/userAction'
import UpperNavbar from './UpperNavbar';
import toast from 'react-hot-toast';
import AllergyTable from '../../components/AllergyTable';
import ChronicTable from '../../components/ChronicTable';
import useUserStore from '@/app/store/useStore';

function HomeClient() {
    const router = useRouter();

    const [activeSection, setActiveSection] = useState('Health Profile')
    const [isAllergiesOpen, setIsAlergiesOpen] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [allergies, setAllergies] = useState([]);
    const [isChronicConditionsOpen, setIsChronicConditionsOpen] = useState(false);
    const [chronicCondition, setChronicCondition] = useState([])
    const [loading, setLoading] = useState(false);
    const setCurrentUser = useUserStore((state) => state.setCurrentUser)
    const currentUser = useUserStore((state) => state.currentUser)
    const [personalInformation, setPersonalInformation] = useState({
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

    const getUser = async () => {
        try {
            setLoading(true);
            const result = await userAction();

            if (result.success) {
                setCurrentUser(result.data)
                // setUser(result.data);
            } else {
                console.log("User not authenticated");
                router.push("/");
            }
        } catch (error) {
            console.error("Error getting current user:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const res = await editProfileAction(personalInformation, isInsuranceInfo);
            if (res.success) {
                toast("User updated Successfully");
            }
        } catch (error) {

        } finally {
            setLoading(false);
            setIsEditable(false);
        }
    }

    const handleAddAllergy = async () => {
        try {
            const isEmpty = Object.values(allergy).every(value => value.trim() === '');

            if (isEmpty) {
                alert("Please fill at least one field before adding an allergy.");
                return;
            }
            setLoading(true);
            const res = await addAllergy(allergy);
            if (res.success) {
                toast.success("Allergy added Successfully")
                await getUser();
            }
        } catch (error) {
            console.log(error);
            toast.error("Unable to add Allergy");
        } finally {
            setLoading(false);
            setAllergy({ name: '', reaction: '', type: '' });
            setIsAlergiesOpen(false);
        }
    };

    const handleAddChronic = async () => {
        try {
            setLoading(true);
            const isEmpty = Object.values(chronic).every(value => value.trim() === '');

            if (isEmpty) {
                toast.error("Please fill at least one field before adding an allergy.");
                return;
            }

            const res = await addChronic(chronic)
            console.log("response", res);
            if (res.success) {
                toast.success("Added Successfully");
                await getUser();
            }
        } catch (error) {
            console.log(error)
            toast.error("Unable to add");
        } finally {
            setLoading(false);
            setChronic({ conditionName: '', date: '', notes: '' })
            setIsChronicConditionsOpen(false);
        }
    };

    useEffect(() => {
        getUser();
    }, [])

    useEffect(() => {
        if (currentUser) {
            setPersonalInformation({
                fullName: currentUser.personalInfo?.fullName || '',
                dob: currentUser.personalInfo?.dob || '',
                gender: currentUser.personalInfo?.gender || '',
                bloodGroup: currentUser.personalInfo?.bloodGroup || '',
                phone: currentUser.personalInfo?.phone || '',
                email: currentUser.personalInfo?.email || ''
            });

            setInsuranceInfo({
                insuranceInfo: currentUser.insuranceInfo?.insuranceInfo || '',
                contactName: currentUser.insuranceInfo?.contactName || '',
                contactNumber: currentUser.insuranceInfo?.contactNumber || ''
            });

            setAllergies(currentUser.allergies || []);

            setChronicCondition(currentUser.chronicConditions || []);
        }
    }, [currentUser]);

    return (
        <div className='min-h-screen bg-slate-50'>
            <UpperNavbar />

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
                                        onChange={(e) => setPersonalInformation({ ...personalInformation, fullName: e.target.value })}
                                        value={personalInformation.fullName}
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
                                        onChange={(e) => setPersonalInformation({ ...personalInformation, dob: e.target.value })}
                                        value={personalInformation.dob}
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
                                        onChange={(e) => setPersonalInformation({ ...personalInformation, gender: e.target.value })}
                                        value={personalInformation.gender}
                                        className={`w-full ${isEditable ? `bg-white border-2` : `bg-gray-100`} border border-gray-300 rounded-xl px-4 mt-2 py-2`}
                                        disabled={!isEditable}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className='w-full mt-4'>
                                    <label htmlFor="BloodGroup" className="text-md">Blood Group</label>
                                    <select
                                        id="bloodGroup"
                                        onChange={(e) => setPersonalInformation({ ...personalInformation, bloodGroup: e.target.value })}
                                        value={personalInformation.bloodGroup}
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
                                        type='text'
                                        id='mobileNumber'
                                        onChange={(e) => setPersonalInformation({ ...personalInformation, phone: e.target.value })}
                                        value={personalInformation.phone}
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
                                        onChange={(e) => setPersonalInformation({ ...personalInformation, email: e.target.value })}
                                        value={personalInformation.email}
                                        className={`w-full mt-2 p-2 rounded-lg ${isEditable ? `bg-white border-2` : `bg-gray-100`} border border-gray-200`}
                                        disabled
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
                                        type='numeric'
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
                                    <AllergyTable allergies={allergies} refreshUser={getUser} />
                                ) : (
                                    <p className="text-gray-500">No Chronic Condition</p>
                                )}
                            </div>

                            {/* <AllergyTable allergies={allergies} /> */}
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
                                                className="bg-blue-600 cursor-pointer text-white px-3 py-1 rounded-lg"
                                            >
                                                Add
                                            </button>
                                            <button
                                                onClick={() => setIsChronicConditionsOpen(false)}
                                                className="bg-gray-200 cursor-pointer text-black px-3 py-1 rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-4">
                                {chronicCondition.length > 0 ? (
                                    <ChronicTable chronic={chronicCondition} refreshUser={getUser} />
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

export default HomeClient