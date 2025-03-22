'use client';
import Image from 'next/image';
import Link from 'next/link';
import { JSX, useTransition } from 'react';

import { CartItemWithProduct } from '@/lib/db/cart';
import formatPrice from '@/lib/format';

interface CartEntryProps {
	cartItem: CartItemWithProduct;
	setProductQuantity: Promise<void>;
}

const CartEntry = ({
	cartItem: { product, quantity },
	setProductQuantity,
}: CartEntryProps) => {
	const [isPending, startTransition] = useTransition();

	const quantityOptions: JSX.Element[] = [];
	for (let i = 1; i <= 99; i++) {
		quantityOptions.push(
			<option key={i} value={i}>
				{i}
			</option>,
		);
	}
	return (
		<div>
			<div className="flex flex-wrap items-center gap-3">
				<Image
					src={product.imageUrl}
					alt={product.name}
					width={200}
					height={200}
					className="rounded-lg"
				/>
				<div>
					<Link href={`/products/${product.id}`}>{product.name}</Link>
					<div>Price: {formatPrice(product.price)}</div>
					<div className="flex items-center gap-2 my-1">
						Quantity:
						<select
							className="w-full max-w-[80px] select-bordered select"
							defaultValue={quantity}
							onChange={(e) => {
								const newQuantity = parseInt(e.currentTarget.value);
								startTransition(async () => {
									await setProductQuantity(product.id, newQuantity);
								});
							}}
						>
							<option value={0}>0 (Remove)</option>
							{quantityOptions}
						</select>
					</div>
					<div className="flex items-center gap-2">
						Total: {formatPrice(product.price * quantity)}
						{isPending && (
							<span className="loading loading-spinner loading-sm" />
						)}
					</div>
				</div>
			</div>
			<div className="divider" />
		</div>
	);
};

export default CartEntry;
