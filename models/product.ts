import { Nullable } from './nullable';

export class Product {
    constructor(
        public id: string,
        public ownerId: Nullable<string>,
        public ownerPushToken: Nullable<string>,
        public title: string,
        public imageUrl: string,
        public description: string,
        public price: number
    ) {}
}
