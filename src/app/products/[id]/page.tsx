import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import PriceTag from '@/components/PriceTag';
import { prisma } from '@/lib/db/prisma';

import { incrementProductQuantity } from './actions';
import AddButton from './AddButton';

interface ProductPageProps {
	params: {
		id: string;
	};
}

const getProduct = cache(async (id: string) => {
	const product = await prisma.product.findUnique({ where: { id } });
	if (!product) notFound();
	return product;
});

const generateMetadata = async ({ params: { id } }: ProductPageProps) => {
	const product = await getProduct(id);

	return {
		title: `${product.name} - Flowmazon`,
		description: product.description,
		openGraph: {
			images: [{ url: product.imageUrl }],
		},
	};
};

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
	const product = await getProduct(id);

	return (
		<div className="flex lg:flex-row flex-col lg:items-center gap-4">
			<Image
				src={product.imageUrl}
				alt={product.name}
				width={500}
				height={500}
				className="rounded-lg"
				priority
			/>
			<div>
				<h1 className="font-bold text-5xl">{product.name}</h1>
				<PriceTag price={product.price} className="mt-4" />
				<p className="py-6">{product.description}</p>
				<AddButton
					productId={product.id}
					incrementProductQuantity={incrementProductQuantity}
				/>
			</div>
		</div>
	);
};

export default ProductPage;
export { generateMetadata };
