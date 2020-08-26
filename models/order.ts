import moment from 'moment';
import { ExpandedCartItem } from './cart-item';

export class Order {
    constructor(
        public id: string,
        public items: ExpandedCartItem[],
        public totalAmount: number,
        public date: Date
    ) {}

    get dateString() {
        return moment(this.date).format('MMMM Do YYYY, hh:mm');
    }
}
