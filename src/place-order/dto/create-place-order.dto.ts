export class CreatePlaceOrderDto {
 /* shipingAddress: {
    pincode: number;
    contactNumber: number;
    state: string;
    city: string;
    street: string;
    H_No: string;
  };*/
  productId: number;
  sellerId: number;
  buyerPaymailId: string;
  buyerPaymailPassword: string;
}
