import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    return transactions.reduce(
      (balance: Balance, transaction: Transaction) => {
        balance[transaction.type] += Number(transaction.value);
        balance.total = balance.income - balance.outcome;
        return balance;
      },
      { income: 0, outcome: 0, total: 0 },
    );
  }
}

export default TransactionsRepository;
