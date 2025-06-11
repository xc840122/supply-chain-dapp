export function convert_time(time) {
	const newTime = new Date(time);
	const options = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	};
	return newTime.toLocaleString('en-NZ', options).replace(',', '');
}
