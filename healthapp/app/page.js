import Navbar from "./components/Navbar";
import { Stethoscope } from 'lucide-react';
import { Pause } from 'lucide-react';
import Footer from "./components/Footer";


export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <main className="bg-teal-100 w-full flex justify-center items-center gap-40 px-10">

        <div className="flex flex-col justify-center min-h-[70vh]">
          <h1 className="text-5xl font-bold mb-6">Your Health, Your Data,</h1>
          <h1 className="text-5xl font-bold mb-6 text-teal-500"> Safely in Your Hands</h1>
          <p> Manage your medical records, connect with care, and stay safe with <br /> MyHealthRecord</p>
          <button className="mt-6 bg-teal-500 font-semibold tracking-wider text-lg text-white px-8 py-4 rounded-full hover:bg-teal-700 transition-all duration-300 w-56"> Get Started Free </button>
          <p className="mt-3">Already a member?
            <span className="text-teal-500 font-semibold cursor-pointer hover:underline"> Login</span>
          </p>
        </div>

        <div className="w-2/5 bg-white flex flex-col rounded-xl p-10 shadow-2xl">
          <div className="flex justify-center items-center">
            <Stethoscope size={60} className="text-teal-500" />
            <div className="flex flex-col ml-4">
              <h2 className="text-teal-400">Trusted by</h2>
              <h1 className="font-bold text-2xl">10,000+ Patients</h1>
            </div>
          </div>
          <div className="mt-10">
            <ul className="list-disc marker:text-teal-500 list-color-green list-inside space-y-1 text-lg">
              <li>
                Secure Medical Records
              </li>
              <li>
                24/7 Emergency Access
              </li>
              <li>
                Drug Interaction Alerts
              </li>
            </ul>
          </div>
        </div>

      </main>

      {/* Features Section */}
      <div className="w-full flex flex-col justify-center items-center mt-20 mb-10">
        <h1 className="bg-teal-300 text-teal-800 px-4 py-2 rounded-full tracking-wider">Powerful Features</h1>
        <h1 className="font-bold text-5xl text-center mt-4 tracking-wide">Everthing You Need to <br /> <span className="text-teal-400"> Manage Your Health </span> </h1>
        <p className="text-lg text-gray-600 mt-4 text-center">From emergency access to secure storage, we've got you covered with <br /> comprehensive health management tools</p>

        <div className="grid grid-cols-3 px-10 gap-20 mt-10">

          <div className="group bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-red-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative"><div className="bg-gradient-to-br from-red-500 to-orange-500 w-16 h-16 rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shield h-8 w-8 text-white">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
              </svg>
            </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Drug &amp; Allergy Interaction Alerts</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">Automatic safety checks when adding medications. Get instant alerts about dangerous interactions and allergy conflicts.</p>
              <div className="flex items-center text-red-600 font-medium text-sm">
                <span>Critical Safety Feature</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>



          <div className="group bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-amber-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative"><div className="bg-gradient-to-br from-amber-500 to-yellow-500 w-16 h-16 rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-qr-code h-8 w-8 text-white">
                <rect width="5" height="5" x="3" y="3" rx="1"></rect><rect width="5" height="5" x="16" y="3" rx="1"></rect><rect width="5" height="5" x="3" y="16" rx="1"></rect>
                <path d="M21 16h-3a2 2 0 0 0-2 2v3"></path><path d="M21 21v.01"></path><path d="M12 7v3a2 2 0 0 1-2 2H7"></path><path d="M3 12h.01"></path><path d="M12 3h.01"></path><path d="M12 16v.01"></path><path d="M16 12h1"></path><path d="M21 12v.01"></path><path d="M12 21v-1"></path></svg>
            </div><h3 className="text-xl font-bold text-gray-900 mb-3">Emergency Access Mode</h3><p className="text-gray-700 text-sm leading-relaxed mb-4">Generate QR codes for instant access to critical info. Paramedics can scan and view blood type, allergies instantly.</p>
              <div className="flex items-center text-amber-700 font-medium text-sm">
                <span>Life-Saving Technology</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7">
                  </path>
                </svg>
              </div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-emerald-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative"><div className="bg-gradient-to-br from-emerald-500 to-green-500 w-16 h-16 rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-cloud h-8 w-8 text-white">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
            </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Medical Record Storage</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">Store lab reports, prescriptions, X-rays, and scans securely. Access your complete medical history anytime, anywhere.</p>
              <div className="flex items-center text-emerald-700 font-medium text-sm">
                <span>Unlimited Storage</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-blue-100 relative overflow-hidden"><div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div><div className="relative"><div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-share2 h-8 w-8 text-white"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg></div><h3 className="text-xl font-bold text-gray-900 mb-3">Download &amp; Share Options</h3><p className="text-gray-700 text-sm leading-relaxed mb-4">Export your complete health history as PDF. Share specific records with doctors and hospitals securely.</p><div className="flex items-center text-blue-700 font-medium text-sm"><span>Seamless Sharing</span><svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></div></div></div>

          <div className="group bg-gradient-to-br from-slate-50 to-gray-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-slate-200 relative overflow-hidden"><div className="absolute top-0 right-0 w-32 h-32 bg-slate-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div><div className="relative"><div className="bg-gradient-to-br from-slate-600 to-gray-700 w-16 h-16 rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-lock h-8 w-8 text-white"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div><h3 className="text-xl font-bold text-gray-900 mb-3">Complete Data Ownership</h3><p className="text-gray-700 text-sm leading-relaxed mb-4">Bank-level encryption keeps your data safe. You control who accesses your information. Your health, your rules.</p><div className="flex items-center text-slate-700 font-medium text-sm"><span>256-bit Encryption</span><svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></div></div></div>

          <div className="group bg-gradient-to-br from-violet-50 to-purple-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-violet-100 relative overflow-hidden"><div className="absolute top-0 right-0 w-32 h-32 bg-violet-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div><div className="relative"><div className="bg-gradient-to-br from-violet-500 to-purple-500 w-16 h-16 rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user h-8 w-8 text-white"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div><h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Health Profile</h3><p className="text-gray-700 text-sm leading-relaxed mb-4">Complete profile with personal info, allergies, chronic conditions, and past medical history in one place.</p><div className="flex items-center text-violet-700 font-medium text-sm"><span>All-In-One Dashboard</span><svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></div></div></div>
        </div>

      </div>

      <div className="w-full min-h-[40vh] bg-gradient-to-b from-green-50 to-white flex justify-center items-center">
        <div className="w-1/2 bg-white rounded-xl flex flex-col justify-center text-center p-10 items-center shadow-2xl">
          <Pause />
          <p className="mt-10 text-gray-700 italic">
            MyHealthRecord gave me my life back as passbook knowing all favourite info is digitalized and foreseeable, especially, <span className="text-teal-400">Highly Recommended!</span>
          </p>
          <button className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-full shadow-2xl hover:-translate-y-1 transition-all duration-300">
            Signup Now
          </button>
        </div>
      </div>

      <Footer />

    </div>
  );
}
