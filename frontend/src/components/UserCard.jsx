import { Link } from "react-router-dom";

function UserCard({ user, isConnection }) {
	// console.log(user + "user");
	
	return (
		<div className='bg-white rounded-lg shadow p-4 flex flex-col items-center transition-all hover:shadow-md'>
			<Link to={`/profile/${user.username}`} className='flex flex-col items-center'>
				<img
					src={user.profilePicture || "/avatar.png"}
					alt={user.name}
					className='w-24 h-24 rounded-full object-cover mb-4'
				/>
				<h3 className='font-semibold text-lg text-center'>{user.name}</h3>
			</Link>
			<p className='text-sm text-gray-500 mt-2'>{user.connections?.length} Tie ups</p>
			<p className='text-gray-600 text-center'>

  {/* { user.skill?.length > 0 ? (
    user.skill.map((s, index) => (
      <span key={index} className='inline-block px-2 py-1 m-1 bg-gray-200 rounded'>
        {s}
      </span>
    ))
  ) : (
	<div>
    No skills available
	</div>
)} */}
<div className='text-gray-600 text-center'>
				{user.skills && user.skills.length > 0 ? (
					user.skills.map((skill, index) => (
						<span key={index} className='inline-block px-2 py-1 m-1 bg-gray-200 rounded'>
							{skill}
						</span>
					))
				) : ( 
					'No skills available'
				)}
			</div>
</p>
			<button className='mt-4 bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-600-dark transition-colors w-full'>
				{isConnection ? "Tied" : "Tie up"}
			</button>
		</div>
	);
}

export default UserCard;
