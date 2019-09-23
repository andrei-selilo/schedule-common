export enum Currency {
  GBP = 'GBP',
  EUR = 'EUR',
  USD = 'USD',
}

export type Price = {
  total: number;
  tip?: number;
  currency: Currency;
  tax?: number;
};

export default (data: Price): Price => data;
