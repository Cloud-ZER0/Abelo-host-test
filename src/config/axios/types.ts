export interface UserResponose {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	gender: string;
	image: string;
	accessToken: string;
	refreshToken: string;
}

export interface Product {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	tags: string[];
	brand: string;
	sku: string;
	weight: number;
	dimensions: Dimensions;
	warrantyInformation: string;
	shippingInformation: string;
	availabilityStatus: string;
	reviews: Review[];
	returnPolicy: string;
	minimumOrderQuantity: number;
	meta: Meta;
	thumbnail: string;
	images: string[];
}

export interface ProductCategory {
	name: string;
	slug: string;
	href: string;
}

export type CategoriesRespnonse = ProductCategory[];

export interface Dimensions {
	width: number;
	height: number;
	depth: number;
}

export interface Review {
	rating: number;
	comment: string;
	date: string;
	reviewerName: string;
	reviewerEmail: string;
}

export interface Meta {
	createdAt: string;
	updatedAt: string;
	barcode: string;
	qrCode: string;
}

export interface ProductsResponse {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
}

export interface AxiosError {
	isAxiosError: true;
	code: string;
	response: {
		status: number;
		data?: {
			message?: string;
		};
	};
}
