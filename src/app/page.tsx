import Image from 'next/image';
import Link from 'next/link';

import Card from '@/components/Card';
import Pagination from '@/components/Pagination';
import { prisma } from '@/lib/db/prisma';

interface HomeProps {
	searchParams: {
		page: string;
	};
}

const Home = async ({ searchParams: { page = '1' } }: HomeProps) => {
	const currentPage = parseInt(page);

	const pageSize = 6;
	const heroItemCount = 1;
	const totalItemCount = await prisma.product.count();
	const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

	// const products = await prisma.product.findMany({
	// 	orderBy: {
	// 		id: 'desc',
	// 	},
	// });
	const products = await prisma.product.findMany({
		orderBy: {
			id: 'desc',
		},
		skip:
			(currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
		take: pageSize + (currentPage === 1 ? heroItemCount : 0),
	});
	return (
		<div className="flex flex-col items-center">
			{currentPage === 1 && (
				<div className="bg-base-200 rounded-xl hero">
					<div className="lg:flex-row flex-col hero-content">
						<Image
							src={products[0].imageUrl}
							alt={products[0].name}
							width={400}
							height={800}
							className="shadow-2xl rounded-lg w-full max-w-sm"
							priority
						/>
						<div>
							<h1 className="font-bold text-5xl">{products[0].name}</h1>
							<p className="py-6">{products[0].description}</p>
							<Link
								href={`/products/${products[0].id}`}
								className="btn btn-primary"
							>
								Check it
							</Link>
						</div>
					</div>
				</div>
			)}

			<div className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-4">
				{/* {products.slice(1).map((product) => (
					<Card key={product.id} product={product} />
				))} */}
				{(currentPage === 1 ? products.slice(1) : products).map((product) => (
					<Card key={product.id} product={product} />
				))}
			</div>
			{totalPages > 1 && (
				<Pagination currentPage={currentPage} totalPages={totalPages} />
			)}
		</div>
	);
};

export default Home;
