import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import logo from '@/assets/logo.png';
import { authOptions } from '@/lib/authOptions';
import { getCart } from '@/lib/db/cart';

import CartButton from './CartButton';
import UserButton from './UserButton';

const searchProducts = async (formData: FormData) => {
	'use server';
	const searchQuery = formData.get('searchQuery')?.toString();
	if (searchQuery) {
		redirect(`/search?query=${searchQuery}`);
	}
};

const Navbar = async () => {
	const cart = await getCart();
	const session = await getServerSession(authOptions);
	return (
		<header className="bg-base-100">
			<div className="sm:flex-row flex-col gap-2 m-auto max-w-7xl navbar">
				<div className="flex-1">
					<Link href="/" className="text-xl normal-case btn btn-ghost">
						<Image src={logo} alt="Flowmazon" width={40} height={40} />
						Flowmazon
					</Link>
				</div>
				<div className="flex gap-2">
					<form action={searchProducts}>
						<div className="form-control">
							<input
								name="searchQuery"
								placeholder="Search"
								className="input-bordered w-full min-w-[100px] input"
							/>
						</div>
					</form>
					<CartButton cart={cart} />
					<UserButton session={session} />
				</div>
			</div>
		</header>
	);
};

export default Navbar;
