import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import images from '@/Images/index';
import Str1 from '@/Components/SVG/Str1';

function Profile({
	openProfile,
	setOpenProfile,
	currentAccount,
	getShipmentCount,
	getBalance,
}) {
	const [count, setCount] = useState(0);
	const [balance, setBalance] = useState('0.0000');

	// This component displays the user's profile information, including their username and total shipment count.
	useEffect(() => {
		const fetchShipmentCount = async () => {
			const count = await getShipmentCount(currentAccount);
			setCount(count);
		};
		fetchShipmentCount();
	}, [currentAccount, getShipmentCount]);

	// This component fetches the user's balance in Ether and displays it in the profile.
	useEffect(() => {
		const fetchBalance = async () => {
			if (currentAccount) {
				const eth = await getBalance(currentAccount);
				setBalance(Number(eth).toFixed(4));
			}
		};
		fetchBalance();
	}, [currentAccount]);

	return openProfile ? (
		<div className='fixed inset-0 z-10 overflow-y-auto'>
			<div
				className='fixed inset-0 w-full h-full bg-gray-900 opacity-50'
				onClick={() => setOpenProfile(false)}
			></div>
			<div className='flex items-center min-h-screen px-4 py-8'>
				<div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-md'>
					<div className='flex justify-end'>
						<button
							className='text-gray-500 hover:text-gray-700 p-2 rounded-md'
							onClick={() => setOpenProfile(false)}
						>
							<Str1 />
						</button>
					</div>
					<div className='max-w-sm mx-auto py-3 space-y-3 text-center'>
						<h4 className='text-lg font-semibold text-gray-800'>
							User Profile
						</h4>
						<Image
							src={images.avatar}
							width={100}
							height={100}
							className='rounded-full mx-auto'
							alt='Profile Picture'
						/>
						<div className='flex flex-col items-center space-y-2 text-sm text-gray-700'>
							<span className='text-gray-600'>
								<strong>Username:</strong> {currentAccount}
							</span>
							<span className='text-gray-600'>
								<strong>Total Shipments: </strong>
								{count}
							</span>
							<span className='text-gray-600'>
								<strong>Balance: </strong>
								{balance} ETH
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : null;
}

export default Profile;
