import { getCustomRepository } from 'typeorm';
import validate from 'uuid-validate';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    if (!validate(id)) {
      throw new AppError('Invalid uuid with id');
    }

    const transaction = await transactionRepository.findOne({ id });

    if (!transaction) {
      throw new AppError('Transaction not finded with the id to be delete');
    }

    await transactionRepository.delete({ id });
  }
}

export default DeleteTransactionService;
