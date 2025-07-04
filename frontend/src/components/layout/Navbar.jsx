import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link } from "react-router-dom";

import { Home,Network,UserRoundSearch, LayoutDashboard,ClipboardList,Presentation,CircleUser,LogOut, Bell,MessageCircle } from "lucide-react";
const Navbar = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();
	// notification count and requests counts

	// const { data: notifications } = useQuery({
	// 	queryKey: ["notifications"],
	// 	queryFn: async () => axiosInstance.get("/notifications"),
	// 	enabled: !!authUser,
	// });

	// const { data: connectionRequests } = useQuery({
	// 	queryKey: ["connectionRequests"],
	// 	queryFn: async () => axiosInstance.get("/connections/requests"),
	// 	enabled: !!authUser,
	// });

	const { mutate: logout } = useMutation({
		mutationFn: () => axiosInstance.post("/auth/logout"),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});


		return (	<nav className='bg-violet-500 font-bold text-white shadow-md sticky top-0 z-10'>
				<div className='max-w-7xl mx-auto px-4'>
					<div className='flex justify-between items-center py-5'>
						<div className='flex items-center space-x-4'>
							<Link to='/'>
								<div className="black text-3xl">CareerMent</div>
							</Link>
						</div>
						<div className='flex items-center gap-2 md:gap-6'>
							{authUser ? (
								<>
									<Link to={"/home/me"} className='text-white flex flex-col items-center'>
									<div className="group flex justify-center">
	    <Home className="group-hover:text-violet-500" />
	    <span className="text-lg text-white hidden group-hover:block">Home</span>
	  </div>
									</Link>
									<Link to='/network' className='text-white flex flex-col items-center relative'>
									<div className="group flex justify-center">
	    <Network className="group-hover:text-violet-500" />
	    <span className="text-lg text-white hidden group-hover:block">Network</span>
	  </div>
										
									</Link>
									{
	!authUser.mentor &&
		<Link to={`/find`} className='text-white flex flex-col items-center'>
			<div className="group flex justify-center">
	    <UserRoundSearch className="group-hover:text-violet-500" />
	    <span className="text-lg text-white hidden group-hover:block">Find Mentor</span>
	  </div>
		</Link>
	}
	{ authUser.mentor && <Link to={`/profile/${authUser ._id}/mymeetings`} className='text-white flex flex-col items-center'>
	  
	  {/* other elements */}
	  <div className="group flex justify-center">
	    <LayoutDashboard className="group-hover:text-violet-500" />
	    <span className="text-lg text-white hidden group-hover:block">DashBoard</span>
	  </div>
	  {/* other elements */}
	</Link>
	}
	
									
									{!authUser.mentor &&
										<Link to={`/profile/${authUser._id}/mymeetings`} className='text-white flex flex-col items-center'>
											<div className="group flex justify-center">
	    <ClipboardList className="group-hover:text-violet-500" />
	    <span className="text-lg text-white hidden group-hover:block">Meetings</span>
	  </div>
									</Link>
									}
									
									<Link to='/notifications' className='text-white flex flex-col ,Be]items-center relative'>
									<div className="group flex justify-center">
	    <Bell className="group-hover:text-violet-500" />
	    <span className="text-lg text-white hidden group-hover:block">Notification</span>
	  </div>
									</Link>
	
									<Link to={"/join-meeting"} className=' text-white flex flex-col items-center'>
									<div className="group flex justify-center">
	    <Presentation className="group-hover:text-violet-500" />
	    <span className="text-lg text-white hidden group-hover:block">Join Meeting</span>
	  </div>
									</Link>
									<Link
										to={`/profile/${authUser.username}`}
										className='text-white flex flex-col items-center'
									>
										<div className="group flex justify-center">
	    <CircleUser className="group-hover:text-violet-500" />
	    <span className="text-lg text-white hidden group-hover:block">My Profile</span>
	  </div>
									</Link>
									<button
										className='flex items-center space-x-1 text-lg text-white hover:text-white'
										onClick={() => logout()}
									>
										<div className="group flex justify-center">
	    <LogOut className="group-hover:text-violet-500" />
	    <span className="text-lg text-white hidden group-hover:block">Logout</span>
	  </div>
									</button>
								</>
							) : (
								<>
									<Link to='/login' className='btn font-bold text-xl btn-ghost'>
										Login
									</Link>
									<Link to='/signup' className='btn text-xl text-white font-bold bg-violet-500'>
										Join now
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>)

};
export default Navbar;
