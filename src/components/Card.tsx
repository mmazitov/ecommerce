import { Product } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import PriceTag from './PriceTag';

interface CardProps {
	product: Product;
}

const Card = ({ product }: CardProps) => {
	const isNew =
		Date.now() - new Date(product.createdAt).getTime() <
		1000 * 60 * 60 * 24 * 7;
	return (
		<Link
			href={`/products/${product.id}`}
			className="bg-base-100 hover:shadow-xl w-full transition-shadow card"
		>
			<figure className="card-image">
				<Image
					src={product.imageUrl}
					alt={product.name}
					width={800}
					height={400}
					className="h-48 object-cover"
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title">{product.name}</h2>
				{isNew && <span className="badge badge-secondary">New</span>}
				<p className="text-sm">{product.description}</p>
				<PriceTag price={product.price} />
			</div>
		</Link>
	);
};

export default Card;
