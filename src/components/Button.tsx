'use client';

import { useFormStatus } from 'react-dom';

interface ButtonProps {
	children: React.ReactNode;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
}

const Button = ({ children, className, type = 'button' }: ButtonProps) => {
	const { pending } = useFormStatus();

	return (
		<div>
			<button
				type={type}
				disabled={pending}
				className={`btn btn-primary ${className}`}
			>
				{pending && <span className="loading loading-spinner loading-xl" />}
				{children}
			</button>
		</div>
	);
};

export default Button;
