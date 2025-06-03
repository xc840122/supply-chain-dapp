export default function ServiceGrid({
	setOpenProfile,
	setCompleteModel,
	setGetModel,
	setStartModel,
}) {
	const services = [
		{ label: 'Complete Shipment', action: () => setCompleteModel(true) },
		{ label: 'Get Shipment', action: () => setGetModel(true) },
		{ label: 'Start Shipment', action: () => setStartModel(true) },
		{ label: 'Open Profile', action: () => setOpenProfile(true) },
		{ label: 'Ship Count', action: () => {} },
		{ label: 'Send Shipment', action: () => {} },
	];

	return (
		<section className='py-0 pb-14'>
			<div className='max-w-screen-xl mx-auto px-4 md:px-8'>
				<div className='mt-12'>
					<ul className='grid gap-6 sm:grid-cols-2 md:grid-cols-3'>
						{services.map((item, index) => (
							<li
								key={index}
								onClick={item.action}
								className='cursor-pointer group border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out bg-white hover:bg-blue-50 p-6 flex items-center justify-center h-44 text-center'
							>
								<p className='text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300'>
									{item.label}
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
// import images from '@/Images/index';
// import Image from 'next/image';

// export default ({
// 	setOpenProfile,
// 	setCompleteModel,
// 	setGetModel,
// 	setStartModel,
// }) => {
// 	const team = [
// 		{
// 			avatar: images.compShipment,
// 		},
// 		{
// 			avatar: images.getShipment,
// 		},
// 		{
// 			avatar: images.startShipment,
// 		},
// 		{
// 			avatar: images.userProfile,
// 		},
// 		{
// 			avatar: images.shipCount,
// 		},
// 		{
// 			avatar: images.send,
// 		},
// 	];

// 	const services = [
// 		'Complete Shipment',
// 		'Get Shipment',
// 		'Start Shipment',
// 		'Open Profile',
// 		'Ship Count',
// 		'Send Shipment',
// 	];

// 	const openModelBox = (text) => {
// 		switch (text) {
// 			case 1:
// 				setCompleteModel(true);
// 				break;
// 			case 2:
// 				setGetModel(true);
// 				break;
// 			case 3:
// 				setStartModel(true);
// 				break;
// 			case 4:
// 				setOpenProfile(true);
// 				break;
// 			default:
// 				break;
// 		}
// 	};
// 	return (
// 		<section className='py-0 pb-14'>
// 			<div className='max-w-screen-xl mx-auto px-4 md:px-8'>
// 				<div className='mt-12'>
// 					<ul className='grid gap-8 sm:grid-cols-2 md:grid-cols-3'>
// 						{services.map((item, index) => (
// 							<li key={index}>
// 								<div
// 									onClick={() => openModelBox(index + 1)}
// 									className='w-full h-60 sm:h-52 md:h-56 bg-gray-200 flex
// 									items-center justify-center cursor-pointer hover:bg-gray-300
// 									transition-colors duration-300 ease-in-out'
// 								>
// 									<p className='text-3xl text-blue-600'>{item}</p>
// 									{/* <Image
// 										src={item.avatar}
// 										alt='service'
// 										width={100}
// 										height={100}
// 										className='w-full h-full rounded-cover object-cover object-center cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out'
// 									/> */}
// 								</div>
// 							</li>
// 						))}
// 					</ul>
// 				</div>
// 			</div>
// 		</section>
// 	);
// };
