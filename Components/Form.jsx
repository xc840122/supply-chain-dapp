import { useState } from 'react';
import { X } from 'lucide-react';

const Form = ({
	setCreateShipmentModel,
	createShipmentModel,
	createShipment,
}) => {
	const [shipment, setShipment] = useState({
		receiver: '',
		pickupTime: '',
		distance: '',
		price: '',
	});
	const createItem = async () => {
		try {
			await createShipment(shipment);
			setCreateShipmentModel(false);
		} catch (error) {
			console.error('Error creating shipment:', error);
		}
	};
	return (
		createShipmentModel && (
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
				<div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative'>
					<button
						onClick={() => setCreateShipmentModel(false)}
						className='absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors'
						aria-label='Close modal'
					>
						<X className='w-5 h-5' /> {/* lucide-react close icon */}
					</button>
					<h2 className='text-xl font-semibold mb-4'>Create Shipment</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							createItem();
						}}
					>
						<div className='mb-4'>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Receiver
							</label>
							<input
								type='text'
								value={shipment.receiver}
								onChange={(e) =>
									setShipment({
										...shipment,
										receiver: e.target.value,
									})
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
								required
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Pickup Time
							</label>
							<input
								type='datetime-local'
								value={shipment.pickupTime}
								onChange={(e) =>
									setShipment({
										...shipment,
										pickupTime: e.target.value,
									})
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
								required
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Distance (km)
							</label>
							<input
								type='number'
								value={shipment.distance}
								onChange={(e) =>
									setShipment({
										...shipment,
										distance: e.target.value,
									})
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
								required
							/>
						</div>
						<div className='mb-4'>
							<label
								className='block text-sm font-medium text-gray
							700 mb-1'
							>
								Price ($)
							</label>
							<input
								type='number'
								value={shipment.price}
								onChange={(e) =>
									setShipment({
										...shipment,
										price: e.target.value,
									})
								}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
								required
							/>
						</div>
						<div className='flex justify-end'>
							<button
								type='submit'
								className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
							>
								Create Shipment
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	);
};

export default Form;
