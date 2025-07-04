import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const queryClient = useQueryClient();
	const navigate = useNavigate()

	const { mutate: loginMutation, isLoading } = useMutation({
		mutationFn: (userData) => axiosInstance.post("/auth/login", userData),
		onSuccess: (res) => {
			localStorage.setItem("token", res.data.token);
		
		  queryClient.invalidateQueries({ queryKey: ["authUser"] });
	  
		  // Dynamically construct the path
		//   console.log(location.pathname);
		
		//   navigate('home/me'); // Navigate to the dynamically constructed path
		setTimeout(() => {
				navigate('/home/me', { replace: true });
				console.log("Navigated to /home/me");
			}, 100);
		console.log("login");
			
		},
		onError: (err) => {
		  toast.error(err.response?.data?.message || "Something went wrong");
		},
	  }); 

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e);
		loginMutation({ username, password });
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-4 w-full max-w-md'>
			<input
				type='text'
				placeholder='Username'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className='input input-bordered w-full'
				required
			/>
			<input
				type='password'
				placeholder='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className='input input-bordered w-full'
				required
			/>
	
			<button type='submit'  className='btn bg-violet-600 w-full'>
				{isLoading ? <Loader className='size-5 animate-spin' /> : <div className="text-white">Login</div>}
			</button>

		</form>
	);
};
export default LoginForm;
