'use client';

import { useState, useTransition } from 'react';
import { CiShoppingCart } from 'react-icons/ci';

interface AddToCartButtonProps {
	productId: string;
	// eslint-disable-next-line no-unused-vars
	incrementProductQuantity: (productId: string) => Promise<void>;
}

const AddToCartButton = ({
	productId,
	incrementProductQuantity,
}: AddToCartButtonProps) => {
	const [isPending, startTransition] = useTransition();
	const [success, setSuccess] = useState(false);

	return (
		<div className="flex items-center gap-2">
			<button
				type="button"
				className="btn-primary btn"
				onClick={() => {
					setSuccess(false);
					startTransition(async () => {
						await incrementProductQuantity(productId);
						setSuccess(true);
					});
				}}
			>
				Add to Cart
				<CiShoppingCart />
			</button>
			{isPending && <span className="loading loading-spinner loading-md" />}
			{!isPending && success && (
				<span className="text-success">Added to Cart.</span>
			)}
		</div>
	);
};

export default AddToCartButton;
