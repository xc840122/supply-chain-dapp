import { useState } from 'react';
import Str1 from '@/Components/SVG/Str1';

function CompleteShipment({
	completeModel,
	setCompleteModel,
	completeShipment,
}) {
	const [completeShip, setCompleteShip] = useState({
		receiver: '',
		index: '',
	});

	const changeStatus = async () => {
		await completeShipment(completeShip);
	};
	return completeModel ? (
		<div className='fixed inset-0 z-10 overflow-y-auto'>
			<div
				className='fixed inset-0 w-full h-full bg-gray-900 opacity-50'
				onClick={() => setCompleteModel(false)}
			></div>
			<div className='flex items-center min-h-screen px-4 py-8'>
				<div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-md'>
					<div className='flex justify-end'>
						<button
							className='text-gray-500 hover:text-gray-700 p-2 rounded-md'
							onClick={() => setCompleteModel(false)}
						>
							<Str1 />
						</button>
					</div>
					<div className='max-w-sm mx-auto py-3 space-y-3 text-center'>
						<h4 className='text-lg font-semibold text-gray-800'>
							Enter the receiver's name and index to complete the shipment
						</h4>

						<form
							onSubmit={(e) => {
								e.preventDefault();
								setCompleteModel(false);
							}}
						>
							<div className='relative mt-3'>
								<input
									type='text'
									placeholder='Receiver Name'
									className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
									value={completeShip.receiver}
									onChange={(e) =>
										setCompleteShip({
											...completeShip,
											receiver: e.target.value,
										})
									}
								/>
							</div>
							<div className='relative mt-3'>
								<input
									className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
									type='text'
									placeholder='Id'
									onChange={(e) =>
										setCompleteShip({
											...completeShip,
											index: e.target.value,
										})
									}
								/>
							</div>
							<button
								className='w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300'
								onClick={() => changeStatus()}
							>
								Complete Shipment
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	) : null;
}

export default CompleteShipment;
