import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Footer from './Footer';
import './globals.css';
import Navbar from './Navbar/Navbar';
import SessionProvider from './SessionProvider';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Flowmazon',
	description: 'We make your wallet cry',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<html lang="en" data-theme="retro">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<SessionProvider>
					<div className="flex flex-col min-h-screen">
						<Navbar />
						<main className="flex-grow m-auto p-4 w-full min-w-[300px] max-w-7xl">
							{children}
						</main>
						<Footer />
					</div>
				</SessionProvider>
			</body>
		</html>
	);
};

export default RootLayout;
