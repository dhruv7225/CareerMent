import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
// import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
import { Users } from "lucide-react";
// import RecommendedUser from "../components/RecommendedUser";
// import UserCard from "../components/UserCard";
import MentorCard from "../components/MentorCard";
import Left_SideBar from "../components/Left_SideBar";
import { Link } from "react-router-dom";
const HomePage = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const { data: recommendedUsers } = useQuery({
		queryKey: ["recommendedUsers"],
		queryFn: async () => {
			const res = await axiosInstance.get("/users/suggestions");
			return res.data;
		},
	});

	const { data: posts } = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			const res = await axiosInstance.get("/posts");
			return res.data;
		},
	});
	console.log("recommende user" , recommendedUsers);
	
	console.log("posts", posts);

	return (
		<>

<div className="flex flex-col p-5 justify-center items-center h-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
  <div className="text-3xl font-bold mt-5 mb-4">Welcome, {authUser.name}!</div>
  <div className="text-lg mb-8">Start connecting with top mentors and get ready to take your career to the next level!</div>
  { !authUser.mentor ?
	  (<Link to={'/find'} className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded">
    Browse Mentors
  </Link>):(<></>)
  }
  <div className="flex justify-between mt-14 h-auto w-full  items-center">
  {/* {recommendedUsers?.length > 0 && (
  <div className="col-span-1 lg:col-span-1 hidden lg:block">
    <div className="bg-violet-200 rounded-lg shadow p-4 max-h-120 overflow-y-auto">
      <h2 className="font-semibold mb-4">Mentors</h2>
      {recommendedUsers?.map((user) => {
        if (user.mentor) {
          console.log(user);
          return <MentorCard key={user.id} user={user} />; 
        }
        return null; 
      })}
    </div>
  </div>

)} */}
	{(recommendedUsers?.length > 0 && !authUser.mentor) ? (
  <div className="row-span-1 lg:row-span-1 w-15 hidden lg:block">
    <div className="rounded-lg shadow  overflow-y-auto">
   
      <div className="flex   justify-between gap-4">
    	{recommendedUsers?.map((user) => {
       if (user.mentor) {
            return <MentorCard key={user.id} user={user} className="w-1/2 lg:w-1/3 xl:w-1/4" />;
          }

          return null;
        })}
      </div>
    </div>
  </div>
):(<>
</>)}
  </div>
</div>

		<div className='flex mt-5 w-full justify-around '>
			
	
			<div className='w-[60%] col-span-1 lg:col-span-2 order-first lg:order-none'>
			{	authUser.mentor &&(
				<PostCreation user={authUser} />
)}

				{posts?.map((post) => (
					<Post key={post._id} post={post} />
				))}

				{posts?.length === 0 && (
					<div className='bg-white rounded-lg shadow p-8 text-center'>
						<div className='mb-6'>
							<Users size={64} className='mx-auto text-violet-500' />
						</div>
						<h2 className='text-2xl font-bold mb-4 text-gray-800'>No Posts Yet</h2>
						<p className='text-gray-600 mb-6'>Tie up with others to start seeing posts in your feed!</p>
					</div>
				)}
			</div>
	

<div className='hidden w-[30%] lg:block lg:col-span-1'>
				<Left_SideBar />
			</div>
		
		</div>
		</>

	);
};
export default HomePage;
