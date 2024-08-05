import { Injectable } from '@nestjs/common';
import { CreatePlaceOrderDto } from './dto/create-place-order.dto';
import { DatabaseService } from 'src/database/database.service';
import { PaymentsService } from 'src/payments/payments.service';
@Injectable()
export class PlaceOrderService {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly databaseService: DatabaseService,
  ) {}
  async create(userid: number, createPlaceOrderDto: CreatePlaceOrderDto) {
    const buyerPaymailId = createPlaceOrderDto.buyerPaymailId;
    const buyerPaymailPassword = createPlaceOrderDto.buyerPaymailPassword;
    const productDetail = await this.databaseService.product.findFirst({
      where: {
        id: createPlaceOrderDto.productId,
      },
    });
    const businessid = await this.databaseService.business.findFirst({
      where: {
        id: productDetail.businessId,
      },
    });
    const business = await this.databaseService.business.findFirst({
      where: {
        id: businessid.id,
      },
    });
    const businessPaymailId = business.paymailId;
    const seller = await this.databaseService.seller.findUnique({
      where: {
        id: createPlaceOrderDto.sellerId,
      },
    });
    const sellerPaymailId = seller.paymailId;
    const paymentSuccessToBusiness =
      await this.paymentsService.processPaymentToBusiness(
        buyerPaymailId,
        buyerPaymailPassword,
        businessPaymailId,
        productDetail.price,
        productDetail.revenueSplit,
      );

    const paymentSuccessToSalesPerson =
      await this.paymentsService.processPaymentToSalesPerson(
        buyerPaymailId,
        buyerPaymailPassword,
        sellerPaymailId,
        productDetail.revenueSplit,
      );

    if (
      (await paymentSuccessToBusiness).payed &&
      (await paymentSuccessToSalesPerson).payed
    ) {
      const currentAmt = (
        await this.databaseService.user.findFirst({
          where: { id: userid },
        })
      ).totalAmountSpent;
      await this.databaseService.user.update({
        where: {
          id: userid,
        },
        data: {
          totalAmountSpent: productDetail.price + currentAmt,
        },
      });
      const BcurrentAmt = business.totalAmountEarned;
      await this.databaseService.business.update({
        where: { id: business.id },
        data: {
          totalAmountEarned:
            BcurrentAmt + productDetail.price - productDetail.revenueSplit,
        },
      });
      //updating total amount earned by seller
      const ScurrentAmt = seller.totalAmountEarned;
      await this.databaseService.seller.update({
        where: { id: seller.id },
        data: {
          totalAmountEarned: ScurrentAmt + productDetail.revenueSplit,
        },
      });
      //updating purchase table
      await this.databaseService.purchase.create({
        data: {
          buyerId: userid,
          productId: createPlaceOrderDto.productId,
          sellerId: createPlaceOrderDto.sellerId,
          ProductOwnerPaymailID: businessPaymailId,
          ProductOwnerId: businessid.id,
          payedToBusinessTranscationId: paymentSuccessToBusiness.payment,
          payedToSalesPersonTranscationId: paymentSuccessToSalesPerson.payment,
        },
      });
    } else {
      return {
        businessPayError: paymentSuccessToBusiness.error,
        salesPersonPayError: paymentSuccessToSalesPerson.error,
      };
    }
  }
}
