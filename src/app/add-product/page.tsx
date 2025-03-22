import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import Button from '@/components/Button';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/db/prisma';

export const metadata: Metadata = {
	title: 'Add product - Flowmazon',
};

const addProduct = async (formData: FormData) => {
	'use server';

	const session = await getServerSession(authOptions);
	const name = formData.get('name')?.toString();
	const description = formData.get('description')?.toString();
	const imageUrl = formData.get('imageUrl')?.toString();
	const price = Number(formData.get('price')) || 0;

	if (!name || !description || !imageUrl || !price) {
		throw new Error('Missing required fields');
	}

	// for (let i = 0; i < 50; i++) {
	// 	await prisma.product.create({
	// 		data: {
	// 			name,
	// 			description,
	// 			imageUrl,
	// 			price,
	// 		},
	// 	});
	// }

	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/add-product');
	}

	await prisma.product.create({
		data: {
			name,
			description,
			imageUrl,
			price,
		},
	});
	redirect('/');
};

const AddProductPage = async () => {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/add-product');
	}
	return (
		<div>
			<h1 className="mb-3 font-bold text-lg">Add product</h1>
			<form action={addProduct}>
				<input
					type="text"
					className="mb-3 w-full input"
					required
					name="name"
					placeholder="Product name"
				/>
				<textarea
					name="description"
					placeholder="Description"
					className="mb-3 w-full textarea"
				/>
				<input
					type="url"
					className="mb-3 w-full input"
					required
					name="imageUrl"
					placeholder="Image URL"
				/>
				<input
					type="number"
					className="mb-3 w-full input"
					required
					name="price"
					placeholder="Price"
				/>
				<Button type="submit" className="btn-block">
					Button
				</Button>
			</form>
		</div>
	);
};

export default AddProductPage;
