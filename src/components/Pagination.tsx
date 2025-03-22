import Link from 'next/link';
import { JSX } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
}
const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
	const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
	const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));
	const numberedPageItems: JSX.Element[] = [];

	for (let page = minPage; page < maxPage; page++) {
		numberedPageItems.push(
			<Link
				href={`?page=${page}`}
				key={page}
				className={`join-item btn ${currentPage === page ? 'btn-active pointer-events-none' : ''}`}
			>
				{page}
			</Link>,
		);
	}
	return (
		<>
			<div className="hidden sm:block join">{numberedPageItems}</div>
			<div className="sm:hidden block join">
				{currentPage > 1 && (
					<Link href={`?page=${currentPage - 1}`} className="join-item btn">
						<FaAngleDoubleLeft />
					</Link>
				)}
				<button type="button" className="pointer-events-none join-item btn">
					Page: {currentPage}
				</button>
				{currentPage < totalPages && (
					<Link href={`?page=${currentPage + 1}`} className="join-item btn">
						<FaAngleDoubleRight />
					</Link>
				)}
			</div>
		</>
	);
};

export default Pagination;
