import Navbar from "./Navbar";

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
		<div className='min-h-screen  bg-base-100'>
			<main className='flex-col justify-around items-center '>{children}</main>
		</div>
		</>
	);
};
export default Layout;
