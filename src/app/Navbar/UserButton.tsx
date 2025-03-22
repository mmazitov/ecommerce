'use client';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { TbGridDots } from 'react-icons/tb';

import profilePicPlaceholder from '@/assets/profile-pic-placeholder.png';

interface UserButtonProps {
	session: Session | null;
}

const UserButton = ({ session }: UserButtonProps) => {
	const user = session?.user;

	return (
		<div className="dropdown dropdown-end">
			<label tabIndex={0} className="btn btn-ghost btn-circle">
				{user ? (
					<Image
						src={user?.image || profilePicPlaceholder}
						alt="profile"
						width={40}
						height={40}
						className="rounded-full w-10"
					/>
				) : (
					<TbGridDots size={20} />
				)}
			</label>
			<ul
				tabIndex={0}
				className="z-30 bg-base-100 shadow mt-3 p-2 rounded-box w-52 dropdown-content menu menu-sm"
			>
				<li>
					{user ? (
						<button onClick={() => signOut({ callbackUrl: '/' })}>
							Sign Out
						</button>
					) : (
						<button onClick={() => signIn()}>Sign In</button>
					)}
				</li>
			</ul>
		</div>
	);
};

export default UserButton;
