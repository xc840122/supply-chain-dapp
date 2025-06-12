import { convert_time } from '@/utils/time';

const Table = ({ setCreateShipmentModel, allShipments }) => {
	// const convertTime = (time) => {
	// 	const date = new Date(time);
	// 	return date.toLocaleString('en-NZ', {
	// 		year: 'numeric',
	// 		month: '2-digit',
	// 		day: '2-digit',
	// 		hour: '2-digit',
	// 		minute: '2-digit',
	// 		second: '2-digit',
	// 	});
	// };

	// console.log('All Shipment Data:', allShipments);

	return (
		<div className='max-w-screen-xl mx-auto px-4 md:px-8'>
			<div className='items-start justify-between md:flex'>
				<div className='max-w-lg'>
					<h3 className='text-gray-800 text-xl font-bold sm:text-2xl'>
						Create Tracking
					</h3>
					<p className='text-gray-600 mt-2'>
						Track your shipments with ease. Click the button below to create a
						new shipment tracking entry.
					</p>
				</div>
				<div className='mt-3 md:mt-0'>
					<button
						onClick={() => setCreateShipmentModel(true)}
						className='inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
					>
						Create Shipment
					</button>
				</div>
			</div>
			<div className='mt-12 shadow-sm rounded-lg overflow-hidden'></div>
			<table className='min-w-full divide-y divide-gray-200'>
				<thead className='bg-gray-50'>
					<tr>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Sender
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Receiver
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							PickupTime
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Distance
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Price
						</th>
						{/* <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Delivery Time
						</th> */}
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Paid
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Status
						</th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{allShipments?.map((shipment, index) => (
						<tr key={index}>
							<td className='px-6 py-4 whitespace-nowrap'>
								{shipment.sender.slice(0, 15)}...
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								{shipment.receiver.slice(0, 15)}...
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								{convert_time(shipment.pickupTime)}
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								{shipment.distance} km
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>${shipment.price}</td>
							{/* <td className='px-6 py-4 whitespace-nowrap'>
								{shipment.deliveryTime === 0
									? 'Not Scheduled'
									: convert_time(shipment.deliveryTime)}
							</td> */}
							<td className='px-6 py-4 whitespace-nowrap'>
								{shipment.isPaid ? 'Yes' : 'No'}
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
										shipment.status === 2
											? 'bg-green-100 text-green-800'
											: shipment.status === 1
											? 'bg-yellow-100 text-yellow-800'
											: 'bg-red-100 text-red-800'
									}`}
								>
									{shipment.status === 2
										? 'Delivered'
										: shipment.status === 1
										? 'In Transit'
										: 'Pending'}
								</span>
							</td>
							{/* <td className='px-6 py-4 whitespace-nowrap'>
								<button
									onClick={() => setCreateShipmentModel(true)}
									className='text-blue-600 hover:text-blue-900'
								>
									View Details
								</button>
							</td> */}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
