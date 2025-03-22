import { getCart } from '@/lib/db/cart';
import formatPrice from '@/lib/format';

import { setProductQuantity } from './actions';
import CartEntry from './CartEntry';

const metadata = {
	title: 'Shopping cart',
	description: 'Your shopping cart',
};

const page = async () => {
	const cart = await getCart();
	return (
		<div>
			<h1 className="font-bold text-3xl">Shopping cart</h1>
			{cart?.items.map((cartItem) => (
				<CartEntry
					cartItem={cartItem}
					key={cartItem.id}
					setProductQuantity={setProductQuantity}
				/>
			))}
			{!cart?.items.length && <p>Your cart is empty.</p>}
			<div className="flex flex-col items-end sm:items-center">
				<p className="mb-3 font-bold">
					Total: {formatPrice(cart?.subtotal || 0)}
				</p>
				<button className="sm:w-[200px] btn btn-primary">Checkout</button>
			</div>
		</div>
	);
};

export default page;
export { metadata };
