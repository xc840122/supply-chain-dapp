import { useState } from 'react';
import { convert_time } from '@/utils/time';
import { Str1 } from '@/Components/SVG/Str1';

export default ({ getModel, setGetModel, getShipment }) => {
	const [index, setIndex] = useState(0);
	const [singleShipmentData, setSingleShipmentData] = useState();

	const getShipmentData = async () => {
		const shipmentData = await getShipment(index);
		if (shipmentData) {
			setSingleShipmentData(shipmentData);
			console.log(shipmentData);
		}
	};

	return getModel ? (
		<div className='fixed inset-0 z-10 overflow-y-auto'>
			<div
				className='fixed inset-0 w-full h-full bg-gray-900 opacity-50'
				onClick={() => setGetModel(false)}
			></div>
			<div className='flex items-center justify-center min-h-screen px-4 py-8'>
				<div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
					<div className='flex justify-end'>
						<button
							className='text-gray-500 hover:text-gray-700'
							onClick={() => setGetModel(false)}
						>
							<Str1 />
						</button>
					</div>
					<div className='max-w-sm mx-auto py-3 space-y-3 text-center'>
						<h4 className='text-lg font-medium text-gray-800'>
							Product Tracing Details
						</h4>
						<form onSubmit={(e) => e.preventDefault()}>
							<div className='relative mt-3'>
								<input
									type='number'
									value={index}
									onChange={(e) => setIndex(e.target.value)}
									className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
									placeholder='Enter Shipment Index'
								/>
							</div>
							<button
								type='button'
								onClick={() => getShipmentData()}
								className='block w-full mt-3 py-3 px-4 font-medium text-sm text-center
									text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indito-700 rounded-md transition duration-150 ease-in-out'
							>
								Get details
							</button>
						</form>
						{singleShipmentData && (
							<div className='mt-4 space-y-2'>
								<p className='text-sm text-gray-600'>
									<strong>Sender:</strong>{' '}
									{singleShipmentData.sender.slice(0, 25)}...
								</p>
								<p className='text-sm text-gray-600'>
									<strong>Receiver:</strong>{' '}
									{singleShipmentData.receiver.slice(0, 25)}...
								</p>
								<p className='text-sm text-gray-600'>
									<strong>PickupTime:</strong>{' '}
									{convert_time(singleShipmentData.pickupTime)}
								</p>
								<p className='text-sm text-gray-600'>
									<strong>DeliverTime:</strong>{' '}
									{convert_time(singleShipmentData.deliveryTime)}
								</p>
								<p className='text-sm text-gray-600'>
									<strong>Distance:</strong> {singleShipmentData.distance} km
								</p>
								<p className='text-sm text-gray-600'>
									<strong>Price:</strong> {singleShipmentData.price} ETH
								</p>
								<p className='text-sm text-gray-600'>
									<strong>Status:</strong> {singleShipmentData.status}
								</p>
								<p className='text-sm text-gray-600'>
									<strong>Paid:</strong>{' '}
									{singleShipmentData.isPaid ? 'Yes' : 'No'}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	) : null;
};
