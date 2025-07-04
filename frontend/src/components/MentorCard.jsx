import { Link, useNavigate } from "react-router-dom";

const MentorCard = ({ user }) => {
    console.log("mentro" + user);
    const navigate = useNavigate()
    return (
      <div className="bg-white shadow-md p-6 flex flex-col items-center space-y-4 hover:shadow-lg transition-shadow duration-300 ease-in-out">
  
        <div className="text-center space-y-2">
          <Link to={`/profile/${user.username}`} className="text-xl font-bold text-gray-900">{user.name}</Link>
          {/* <p className="text-sm text-gray-600">{user.profession || "Mentor"}</p> */}
        </div>
  
        <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-black">
          <img
            src={user.profilePicture}
            // alt={`${user.name}'s Profile`}
            className="object-cover w-full h-full"
          />
        </div>
        {/* Skills */}
        <div className=" flex w-15 flex-wrap">
          {user.skills && user.skills.length > 0 ? (
            user.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-block bg-violet-100 text-black text-xs font-medium px-3 py-1 m-1 rounded-full"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No skills available</p>
          )}
        </div>
  
        {/* Action Button */}
        <button
  className="w-full bg-gradient-to-r from-violet-500 to-violet-600 text-white font-medium px-6 py-2 rounded-lg hover:from-violet-600 hover:to-violet-700 focus:ring-4 focus:ring-violet-300 focus:outline-none transition-all duration-300 ease-in-out"
  onClick={() => navigate(`/profile/${user.username}`)}
>
  Select Mentor
</button>

      </div>
    );
  };
  
  export default MentorCard;
// import React from 'react';

// function MentorCard({ mentor }) {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-4">
//       <h2 className="text-lg font-bold mb-2">{mentor.username}</h2>
//       {/* <p className="text-gray-600 mb-2">{mentor.industry}</p> */}
//       {/* <p className="text-gray-600 mb-4">{mentor.bio}</p> */}
//       <h3 className="text-lg font-bold mb-2">Expertise:</h3>
//       <ul className="list-none mb-4">
//         {mentor.skills.map((skill, index) => (
//           <li key={index} className="text-gray-600">
//             {skill}
//           </li>
//         ))}
//       </ul>
//       <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">
//         Connect with {mentor.username}
//       </button>
//     </div>
//   );
// }

// export default MentorCard;