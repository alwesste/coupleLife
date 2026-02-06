import {TransactionCategory} from '../enums/transaction-category';

export interface PurchaseDTO {
  id: number;
  date: Date;
  purchaseType: TransactionCategory;
  comment: string;
  amount: number
}
