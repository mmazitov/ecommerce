import { Metadata } from 'next';

import Card from '@/components/Card';
import { prisma } from '@/lib/db/prisma';

interface SearchPageProps {
	searchParams: { query: string };
}

const generateMetadata = ({
	searchParams: { query },
}: SearchPageProps): Metadata => ({
	title: `Search: ${query} - Flowmazon`,
});

const SearchPageProps = async ({
	searchParams: { query },
}: SearchPageProps) => {
	const products = await prisma.product.findMany({
		where: {
			OR: [
				{ name: { contains: query, mode: 'insensitive' } },
				{ description: { contains: query, mode: 'insensitive' } },
			],
		},
		orderBy: { id: 'desc' },
	});

	if (products.length === 0) {
		return <div className="text-center">No products found</div>;
	}

	return (
		<div className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
			{products.map((product) => (
				<Card product={product} key={product.id} />
			))}
		</div>
	);
};

export default SearchPageProps;
export { generateMetadata };
