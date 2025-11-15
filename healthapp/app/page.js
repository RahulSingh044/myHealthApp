import Navbar from "./components/Navbar";
import { Stethoscope } from 'lucide-react';
import { Pause } from 'lucide-react';
import Footer from "./components/Footer";


export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50 font-[Inter] overflow-x-hidden">
      <Navbar />

      {/* --- Hero Section --- */}
      <main className="bg-teal-100 w-full flex flex-col-reverse md:flex-row justify-center items-center md:gap-12 lg:gap-24 px-6 py-12 md:px-10 lg:py-20">

        {/* Left Content Column */}
        <div className="flex flex-col justify-center min-h-[50vh] md:min-h-[70vh] w-full md:w-auto md:mt-0">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 md:mb-6">Your Health, Your Data,</h1>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-teal-500"> Safely in Your Hands</h1>
          <p className='text-lg text-gray-700'>
            Manage your medical records, connect with care, and stay safe with <span className="font-semibold">MediLink</span>.
          </p>
          <button className="mt-6 bg-teal-500 font-semibold tracking-wider text-lg text-white px-8 py-4 rounded-full hover:bg-teal-700 transition-all duration-300 w-full sm:w-64 shadow-lg">
            Get Started Free
          </button>
          <p className={`mt-3 text-gray-600 text-center md:text-left`}>Already a member?
            <span className="text-teal-500 font-semibold cursor-pointer hover:underline ml-1"> Login</span>
          </p>
        </div>

        {/* Right Info Box */}
          <div className="w-full hidden md:w-[45%] max-w-md bg-white md:block rounded-2xl p-6 md:p-10 shadow-2xl">
            <div className="flex items-center">
              <Stethoscope size={50} className="text-teal-500" />
              <div className="flex flex-col ml-4">
                <h2 className="text-teal-400 text-sm md:text-base">Trusted by</h2>
                <h1 className="font-bold text-xl md:text-2xl text-gray-800">10,000+ Patients</h1>
              </div>
            </div>
            <div className="mt-8">
              <ul className="list-disc marker:text-teal-500 list-color-green list-inside space-y-2 text-base md:text-lg text-gray-700">
                <li>Secure Medical Records</li>
                <li>24/7 Emergency Access</li>
                <li>Drug Interaction Alerts</li>
              </ul>
            </div>
          </div>

      </main>

      {/* --- Features Section --- */}
      <div className="w-full flex flex-col justify-center items-center mt-16 md:mt-20 mb-10 px-4">
        <h1 className="bg-teal-300 text-teal-800 px-4 py-1 text-sm md:text-base rounded-full tracking-wider font-semibold">Powerful Features</h1>
        <h1 className="font-bold text-3xl md:text-5xl text-center mt-4 tracking-wide text-gray-900">
          Everthing You Need to <br className="hidden sm:block" /> <span className="text-teal-400"> Manage Your Health </span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 mt-4 text-center max-w-3xl">
          From emergency access to secure storage, we've got you covered with comprehensive health management tools.
        </p>

        {/* Feature Cards Grid (Responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-0 md:px-10 lg:px-20 gap-8 md:gap-12 mt-12 w-full max-w-7xl">

          {/* Card 1: Drug & Allergy Interaction Alerts */}
          <div className="group bg-gradient-to-br from-red-50 to-orange-50 p-6 md:p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-red-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4 md:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield h-7 w-7 text-white">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Drug &amp; Allergy Interaction Alerts</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">Automatic safety checks when adding medications. Get instant alerts about dangerous interactions and allergy conflicts.</p>
              <div className="flex items-center text-red-600 font-medium text-sm">
                <span>Critical Safety Feature</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>


          {/* Card 2: Emergency Access Mode */}
          <div className="group bg-gradient-to-br from-amber-50 to-yellow-50 p-6 md:p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-amber-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-500 to-yellow-500 w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4 md:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-qr-code h-7 w-7 text-white">
                  <rect width="5" height="5" x="3" y="3" rx="1"></rect><rect width="5" height="5" x="16" y="3" rx="1"></rect><rect width="5" height="5" x="3" y="16" rx="1"></rect>
                  <path d="M21 16h-3a2 2 0 0 0-2 2v3"></path><path d="M21 21v.01"></path><path d="M12 7v3a2 2 0 0 1-2 2H7"></path><path d="M3 12h.01"></path><path d="M12 3h.01"></path><path d="M12 16v.01"></path><path d="M16 12h1"></path><path d="M21 12v.01"></path><path d="M12 21v-1"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Emergency Access Mode</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">Generate QR codes for instant access to critical info. Paramedics can scan and view blood type, allergies instantly.</p>
              <div className="flex items-center text-amber-700 font-medium text-sm">
                <span>Life-Saving Technology</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 3: Medical Record Storage */}
          <div className="group bg-gradient-to-br from-emerald-50 to-green-50 p-6 md:p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-emerald-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-500 to-green-500 w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4 md:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud h-7 w-7 text-white">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Medical Record Storage</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">Store lab reports, prescriptions, X-rays, and scans securely. Access your complete medical history anytime, anywhere.</p>
              <div className="flex items-center text-emerald-700 font-medium text-sm">
                <span>Unlimited Storage</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 4: Download & Share Options */}
          <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4 md:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share2 h-7 w-7 text-white">
                  <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Download &amp; Share Options</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">Export your complete health history as PDF. Share specific records with doctors and hospitals securely.</p>
              <div className="flex items-center text-blue-700 font-medium text-sm"><span>Seamless Sharing</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </div>
          </div>

          {/* Card 5: Complete Data Ownership */}
          <div className="group bg-gradient-to-br from-slate-50 to-gray-50 p-6 md:p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-600 to-gray-700 w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4 md:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock h-7 w-7 text-white">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Complete Data Ownership</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">Bank-level encryption keeps your data safe. You control who accesses your information. Your health, your rules.</p>
              <div className="flex items-center text-slate-700 font-medium text-sm"><span>256-bit Encryption</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </div>
          </div>

          {/* Card 6: Personalized Health Profile */}
          <div className="group bg-gradient-to-br from-violet-50 to-purple-50 p-6 md:p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-violet-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative">
              <div className="bg-gradient-to-br from-violet-500 to-purple-500 w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4 md:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user h-7 w-7 text-white">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Personalized Health Profile</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">Complete profile with personal info, allergies, chronic conditions, and past medical history in one place.</p>
              <div className="flex items-center text-violet-700 font-medium text-sm"><span>All-In-One Dashboard</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* --- Testimonial / CTA Section --- */}
      <div className="w-full min-h-[40vh] bg-gradient-to-b from-green-50 to-white flex justify-center items-center py-12 px-4">
        <div className="w-full max-w-lg md:max-w-xl lg:max-w-3xl bg-white rounded-2xl flex flex-col justify-center text-center p-8 md:p-12 items-center shadow-2xl">
          <Pause className="w-8 h-8 text-teal-500" />
          <p className="mt-8 text-gray-700 italic text-base md:text-lg leading-relaxed">
            MyHealthRecord gave me my life back as a digital passbook, knowing all my key info is digitalized and foreseeable, especially, <span className="text-teal-400 font-semibold not-italic">Highly Recommended!</span>
          </p>
          <button className="mt-6 bg-teal-600 text-white px-8 py-3 rounded-full shadow-2xl hover:-translate-y-1 transition-all duration-300 font-semibold text-lg">
            Signup Now
          </button>
        </div>
      </div>

      {/* Footer component is now defined */}
      <Footer />

    </div>
  );
}
