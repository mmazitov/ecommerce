const formatPrice = (price: number) => {
	return (price / 100).toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
	});
};

export default formatPrice;
