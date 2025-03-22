'use client';

import Link from 'next/link';
import { CiShoppingCart } from 'react-icons/ci';

import { ShoppingCart } from '@/lib/db/cart';
import formatPrice from '@/lib/format';

interface CartButtonProps {
	cart: ShoppingCart | null;
}

const CartButton = ({ cart }: CartButtonProps) => {
	const closeDropdown = () => {
		const elem = document.activeElement as HTMLElement;
		if (elem) {
			elem.blur();
		}
	};
	return (
		<div className="dropdown dropdown-end">
			<label tabIndex={0} className="btn-ghost btn btn-circle">
				<div className="indicator">
					<CiShoppingCart size={20} />
					<span className="top-[-5px] right-[-5px] absolute bg-amber-300 px-[5px] rounded-full text-[10px] text-center">
						{cart?.size || 0}
					</span>
				</div>
			</label>
			<div
				tabIndex={0}
				className="z-30 bg-base-100 shadow mt-3 w-52 card dropdown-content card-compact"
			>
				<div className="card-body">
					<span className="font-bold text-lg">{cart?.size || 0} Items</span>
					<span className="text-info">
						Subtotal: {formatPrice(cart?.subtotal || 0)}
					</span>
					<div className="cart-actions">
						<Link
							href="/cart"
							className="btn-block btn btn-primary"
							onClick={closeDropdown}
						>
							View cart
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartButton;
