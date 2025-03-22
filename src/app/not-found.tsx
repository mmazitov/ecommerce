import Link from 'next/link';

const NotFound = () => {
	return (
		<>
			<h1>Page not found</h1>
			<Link href="/" className="btn btn-primary">
				Return home
			</Link>
		</>
	);
};

export default NotFound;
