// Left_SideBar.jsx
// import React from 'react';
import { FaBell, FaGift, FaStar } from 'react-icons/fa'; // Icons for announcements

const Left_SideBar = () => {
  return (
    <div className="col-span-4 bg-gray-100 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-violet-600 mb-6">Announcements & Updates</h2>
      <div className="space-y-6 overflow-y-auto max-h-[450px]">
        {/* Announcement Item 1 */}
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-all">
          <div className="flex items-center space-x-4">
            <div className="text-violet-500 text-xl">
              <FaBell />
            </div>
            <div>
              <h3 className="font-semibold text-lg">New Feature Released!</h3>
              <p className="text-gray-600 text-sm">We just added a new post section for your convenience. Check it out!</p>
            </div>
          </div>
        </div>

        {/* Announcement Item 2 */}
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-all">
          <div className="flex items-center space-x-4">
            <div className="text-violet-500 text-xl">
              <FaGift />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Mentor Program Update</h3>
              <p className="text-gray-600 text-sm">We are launching new mentor recommendations this week!</p>
            </div>
          </div>
        </div>

        {/* Announcement Item 3 */}
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-all">
          <div className="flex items-center space-x-4">
            <div className="text-yellow-500 text-xl">
              <FaStar />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Holiday Sale Coming Soon</h3>
              <p className="text-gray-600 text-sm">Stay tuned for discounts on premium membership during the holidays!</p>
            </div>
          </div>
        </div>

        {/* Button to load more announcements */}
        <div className="flex justify-center">
          <button className="bg-violet-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-violet-700 transition-colors">
            See More Updates
          </button>
        </div>
      </div>
    </div>
  );
};

export default Left_SideBar;
