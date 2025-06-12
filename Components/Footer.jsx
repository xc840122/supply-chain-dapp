import { Fot1, Fot2 } from '@/Components/index';

export default function Footer() {
	const footerNavs = [
		{ href: 'javascript:void(0)', name: 'Terms' },
		{ href: 'javascript:void(0)', name: 'License' },
		{ href: 'javascript:void(0)', name: 'Privacy' },
		{ href: 'javascript:void(0)', name: 'About us' },
	];

	return (
		<footer className='pt-12 mt-20 bg-white border-t'>
			<div className='max-w-screen-xl mx-auto px-4 md:px-8 text-gray-700'>
				<div className='grid gap-10 md:grid-cols-2'>
					{/* Left section: Logo, description, navigation links */}
					<div className='space-y-4'>
						<div className='flex items-center gap-2'>
							<img
								src='https://cdn.jsdelivr.net/gh/twitter/twemoji/assets/72x72/1f69a.png'
								alt='Cute Delivery Truck'
								className='w-10 h-10 object-contain'
								draggable={false}
							/>
							<span className='text-xl font-bold text-gray-900'>
								Safe Delivery
							</span>
						</div>
						<p className='max-w-md text-sm text-gray-600'>
							Simple and efficient shipment management. Track, complete, and
							start shipments with ease.
							<br />
							Join us to make delivery safer and more reliable.
						</p>
						<ul className='flex flex-wrap gap-4 text-sm'>
							{footerNavs.map((item, idx) => (
								<li key={idx}>
									<a
										href={item.href}
										className='hover:text-black transition-colors duration-200'
									>
										{item.name}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Right section: Copyright and icons */}
					<div className='space-y-4 md:text-right'>
						<p className='text-sm text-gray-500 font-medium'>
							© 2023 Safe Delivery. All rights reserved.
						</p>
						<div className='flex md:justify-end gap-4'>
							<a href='javascript:void(0)' className='hover:opacity-80'>
								<Fot1 />
							</a>
							<a href='javascript:void(0)' className='hover:opacity-80'>
								<Fot2 />
							</a>
						</div>
					</div>
				</div>

				{/* Bottom line message */}
				<div className='mt-10 pt-6 border-t text-center text-sm text-gray-400'>
					<p>
						Made with <span className='text-red-500'>♥</span> by the Float UI
						team.
					</p>
				</div>
			</div>
		</footer>
	);
}
