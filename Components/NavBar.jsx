import { useEffect, useState, useContext } from 'react';
import { TrackingContext } from '@/Context/TrackingContext';
import { Nav1, Nav2, Nav3 } from '@/Components/index';

function NavBar() {
	const [state, setState] = useState(false);
	const { currentAccount, connectWallet } = useContext(TrackingContext);

	const navigation = [
		{ title: 'Home', path: '#' },
		{ title: 'Services', path: '#' },
		{ title: 'Contact Us', path: '#' },
		{ title: 'About', path: '#' },
	];

	useEffect(() => {
		document.onClick = (e) => {
			if (!e.target.closest('.menu-btn')) setState(false);
		};
	}, []);

	// useEffect(() => {
	// 	const handleClick = (e) => {
	// 		if (!e.target.closest('.menu-btn')) setState(false);
	// 	};
	// 	document.addEventListener('click', handleClick);

	// 	return () => {
	// 		document.removeEventListener('click', handleClick);
	// 	};
	// }, []);

	return (
		<nav
			className={`bg-white pb-5 md:text-sm ${
				state
					? 'shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0'
					: ''
			}`}
		>
			<div className='gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8'>
				<div className='flex items-center justify-between py-5 md:block'>
					<a
						className='flex items-center gap-3 text-gray-900 hover:text-indigo-600 font-extrabold text-xl md:text-2xl transition-colors duration-300 select-none cursor-pointer'
						href='javascript:void(0)'
						aria-label='Safe Delivery Home'
					>
						<div className='relative w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300'>
							<img
								src='https://cdn.jsdelivr.net/gh/twitter/twemoji/assets/72x72/1f69a.png'
								alt='Cute Delivery Truck'
								className='w-7 h-7 object-contain'
								draggable={false}
							/>
						</div>
						<h1 className='whitespace-nowrap tracking-wide'>Safe Delivery</h1>
					</a>

					<div className='md:hidden'>
						<button
							className='menu-btn text-gray-500 hover:text-gray-800'
							onClick={() => setState(!state)}
						>
							{state ? <Nav1 /> : <Nav2 />}
						</button>
					</div>
				</div>
				<div
					className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
						state ? 'block' : 'hidden'
					}`}
				>
					<ul className='justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0'>
						{navigation.map((item, idx) => {
							return (
								<li key={idx} className='text-gray-700 hover:text-gray-900'>
									<a href={item.path} className='block'>
										{item.title}
									</a>
								</li>
							);
						})}
					</ul>
					<div className='flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0'>
						{currentAccount ? (
							<p
								className='flex items-center justify-center gap-x-1 py-2 px-4
							 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900
							rounded-full md:inline-flex'
							>
								{currentAccount.slice(0, 25)}...
							</p>
						) : (
							<button
								onClick={() => connectWallet()}
								className='flex items-center justify-center gap-x-1 py-2 px-4
								text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900
								rounded-full md:inline-flex'
							>
								Connect Wallet
								<Nav3 />
							</button>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}

export default NavBar;
