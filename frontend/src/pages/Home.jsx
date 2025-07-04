import React from "react";
import { Link } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FAQ from "../components/FAQ";



const LoadingPage = () => {
const navigate = useNavigate()
  return (
    <div className="font-sans bg-gray-100">
      {/* Header Section */}
      <div className="font-sans bg-gray-100">
  {/* Header Section */}
  <div
    className="relative bg-cover bg-center h-screen flex gap-2 items-center justify-center"
    style={{
      backgroundImage:
        "url('https://images.pexels.com/photos/5862284/pexels-photo-5862284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
    }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-40"></div> {/* Added a darker overlay for better contrast */}
    <div className="relative text-center text-white space-y-10">
        <div>

      <div className="text-4xl font-bold">Building Bridges to Your Dream Career</div>
        </div>
<div>

      <a
        href="#features"
        className="bg-violet-700 text-white px-6 py-3 rounded-md text-lg hover:bg-violet-800 transition"
        >
        Explore Features
      </a>
          </div>
      <div className="text-xl">Discover the right guidance to achieve your career and educational goals. Connect with expert mentors from diverse industries today.</div>
      <div className="text-white underline cursor-pointer">Learn More</div>
    </div>
  </div>
  <div className="absolute top-5 right-5 flex gap-5"></div>
</div>


      {/* Features Section */}
      <header id="features" className="bg-violet-200 py-5 text-center text-violet-700">
        <h1 className="text-4xl font-bold">Platform Features</h1>
      </header>
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <img src="https://images.pexels.com/photos/295826/pexels-photo-295826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Automated Scheduling" className="w-full h-48 object-cover rounded-lg" />
            <div className="text-2xl font-bold mt-4 text-violet-700">Automated Scheduling</div>
            <p className="text-lg mt-3 text-violet-700">Book appointments seamlessly with mentors using our intuitive calendar integration.</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <img src="https://images.pexels.com/photos/4226122/pexels-photo-4226122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Embedded Video Calls" className="w-full h-48 object-cover rounded-lg" />
            <div className="text-2xl font-bold mt-4 text-violet-700">Embedded Video Calls</div>
            <p className="text-lg mt-3 text-violet-700">Connect virtually with mentors through secure and reliable video calls.</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <img src="https://media.istockphoto.com/id/1313547780/vector/profile-verification-check-marks-icons-vector-illustration.jpg?s=612x612&w=0&k=20&c=XDWxGC05gd-sTn_cBvlI2aG1onqOdiVdPb0IeFO-Q2M=" alt="Verified Expertise" className="w-full h-48 object-cover rounded-lg" />
            <div className="text-2xl font-bold mt-4 text-violet-700">Verified Expert</div>
            <p className="text-lg mt-3 text-violet-700">Access mentors verified for their skills, experience, and industry knowledge.</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <img src="https://storage.googleapis.com/a1aa/image/400d095e-5411-479c-ac91-7f3f507f7073.jpeg" alt="Career & Skill Development" className="w-full h-48 object-cover rounded-lg" />
            <div className="text-2xl font-bold mt-4 text-violet-700">Career & Skill Development</div>
            <p className="text-lg mt-3 text-violet-700">Get personalized advice for career advancement and skill enhancement.</p>
          </div>
        </div>

        {/* Join Us Section */}
        <section className="bg-violet-200 py-10 text-center text-violet-700">
          <div className="flex flex-wrap justify-center gap-10 items-center">
            <div className="w-72 h-72 overflow-hidden rounded-lg">
              <img src="https://t4.ftcdn.net/jpg/02/67/95/99/360_F_267959978_mg8IbiXMiL636E8GgZP2RC7zaCrMOLF1.jpg" alt="Handshake" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="flex-col justify-center items-center ">

          <h2 className="text-3xl font-bold mb-8">Join Us Today</h2>
            <div className="max-w-xl text-lg">
              <p>Start your mentorship journey. Sign up as a mentee or a mentor and make an impact.</p>
                <button onClick={()=> navigate('/signup')} 
               className="text-violet-700 underline font-bold">
              Get Started
             
              </button>
            </div>
            </div>
          </div>
        </section>

        {/* Mentor Section */}
        <section className="bg-violet-700 text-white py-10 text-center">
          <h3 className="text-2xl font-bold mb-4">Are you a Mentor?</h3>
          <p className="text-lg mb-6">Join a community of passionate experts and thought-leaders who are being sought out by fellow entrepreneurs.</p>
          <button onClick={()=> navigate('/signup')} 
           className="bg-white text-violet-700 px-6 py-3 rounded-md text-lg font-bold hover:bg-violet-300 transition">Become a Mentor</button>
        </section>
      </main>

      {/* Footer Section */}

      <FAQ />
      <footer className="bg-white text-center text-violet-700 py-‹10 border-t border-gray-300">
        <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between gap-10 px-5">
          <div>
            <h4 className="font-bold mb-2 text-lg">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#">Browse Mentors</a></li>
              <li><a href="#">Book a Session</a></li>
              <li><a href="#">Become a Mentor</a></li>
              <li><a href="#">Mentorship for Teams</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-lg">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#">Case Studies</a></li>
              <li><a href="#">Career Paths</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-lg">About</h4>
            <ul className="space-y-2">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <p className="text-sm mt-10">&copy; 2024 CareerMent. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LoadingPage;