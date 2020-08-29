export interface FirebasePostResponse {
    name: string
}

export interface FirebaseProductData {
    ownerId: string,
    title: string,
    imageUrl: string,
    description: string,
    price: string
}

export type FirebaseProductsResponse = { [index: string]: FirebaseProductData }
