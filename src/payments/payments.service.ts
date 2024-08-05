import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  private neucron: any;

  constructor() {
    this.initializeNeucronSDK().catch((error) => {
      console.error('Failed to initialize Neucron SDK:', error);
    });
  }

  private async initializeNeucronSDK() {
    try {
      // Use dynamic import for ES modules
      const NeucronSDK = (await import('neucron-sdk')).default;
      this.neucron = new NeucronSDK();
    } catch (error) {
      console.error('Error importing Neucron SDK:', error);
    }
  }

  async processPaymentToBusiness(
    businessPaymailId: string,
    buyerPaymailId: string,
    buyerPaymailPassword: string,
    price: number,
    revenueSplit: number,
  ) {
    if (!this.neucron) {
      console.error('Neucron SDK not initialized');
      return { payed: false, error: 'Neucron SDK not initialized' };
    }

    const authModule = this.neucron.authentication;
    try {
      const loginResponse = await authModule.login({
        buyerPaymailId,
        buyerPaymailPassword,
      });
      console.log(loginResponse);

      const options = {
        outputs: [
          {
            address: businessPaymailId,
            note: 'buying product',
            amount: Number(price - revenueSplit),
          },
        ],
      };
      console.log(options);

      const payResponse = await this.neucron.pay.txSpend(options);
      console.log(payResponse);
      return { payed: true, payment: payResponse.data.txid };
    } catch (error) {
      console.error('Pay request failed:', error);
      return { payed: false, error: error.message };
    }
  }

  async processPaymentToSalesPerson(
    sellerPaymailId: string,
    buyerPaymailId: string,
    buyerPaymailPassword: string,
    revenueSplit: number,
  ) {
    if (!this.neucron) {
      console.error('Neucron SDK not initialized');
      return { payed: false, error: 'Neucron SDK not initialized' };
    }

    const authModule = this.neucron.authentication;
    try {
      const loginResponse = await authModule.login({
        buyerPaymailId,
        buyerPaymailPassword,
      });
      console.log(loginResponse);

      const options = {
        outputs: [
          {
            address: sellerPaymailId,
            note: 'paying commission',
            amount: Number(revenueSplit),
          },
        ],
      };
      console.log(options);

      const payResponse = await this.neucron.pay.txSpend(options);
      console.log(payResponse);
      return { payed: true, payment: payResponse.data.txid };
    } catch (error) {
      console.error('Pay request failed:', error);
      return { payed: false, error: error.message };
    }
  }
}
