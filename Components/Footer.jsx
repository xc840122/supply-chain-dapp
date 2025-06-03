import { Fot1, Fot2 } from '@/Components/index';

export default function Footer() {
	const footerNavs = [
		{
			href: 'javascript:void(0)',
			name: 'Terms',
		},
		{
			href: 'javascript:void(0)',
			name: 'License',
		},
		{
			href: 'javascript:void(0)',
			name: 'Privacy',
		},
		{
			href: 'javascript:void(0)',
			name: 'About us',
		},
	];
	return (
		<footer className='pt-10'>
			<div className='max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8'>
				<div className='sm:flex justify-between'>
					<div className='space-y-6'>
						<img src='https://www.floatui.com/logo.svg' className='w-32' />
						<p className='max-w-md'>
							Float UI is a free and open-source library of components built
							with React and Tailwind CSS.
						</p>
						<ul className='flex flex-wrap items-center gap-4 text-sm sm:text-base'>
							{footerNavs.map((item, idx) => (
								<li className='text-gray-800 hover:text-gray-700 transition-colors duration-200'>
									<a key={idx} href={item.href}>
										{item.name}
									</a>
								</li>
							))}
						</ul>
					</div>
					<div className='mt-6'>
						<p className='font-semibold text-gray-500'>
							© 2023 Float UI. All rights reserved.
						</p>
						<div className='flex items-center gap-3 mt-3 sm:block'>
							<a href='javascript:void(0)'>
								<Fot1 />
							</a>
							<a href='javascript:void(0)' className='mt-0 block sm:mt-3'>
								<Fot2 />
							</a>
						</div>
					</div>
				</div>
				<div className='mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500'>
					<p>
						Made with <span className='text-red-500'>♥</span> by the Float UI
						team.
					</p>
				</div>
			</div>
		</footer>
	);
}
