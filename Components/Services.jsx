import React from 'react';

/**
 * Services component renders action cards to trigger shipment-related modals.
 * Actions include: Start Shipment, Complete Shipment, Get Shipment, and Open Profile.
 *
 * Props:
 * - setStartModel: Function to open the Start Shipment modal
 * - setCompleteModel: Function to open the Complete Shipment modal
 * - setGetModel: Function to open the Get Shipment modal
 * - setOpenProfile: Function to open the user Profile modal
 */

export default function Services({
	setOpenProfile,
	setCompleteModel,
	setGetModel,
	setStartModel,
}) {
	// Define services and associated actions
	const services = [
		{ label: 'Start Shipment', action: () => setStartModel(true) },
		{ label: 'Complete Shipment', action: () => setCompleteModel(true) },
		{ label: 'Get Shipment', action: () => setGetModel(true) },
		{ label: 'Open Profile', action: () => setOpenProfile(true) },
	];

	return (
		<section className='py-0 pb-14'>
			<div className='max-w-screen-xl mx-auto px-4 md:px-8'>
				<div className='mt-12'>
					<ul className='grid gap-6 sm:grid-cols-2 md:grid-cols-4'>
						{services.map((item, index) => (
							<li
								key={index}
								onClick={item.action}
								className='cursor-pointer group border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out bg-white hover:bg-blue-50 p-6 flex items-center justify-center h-40 text-center'
							>
								<p className='text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300'>
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
