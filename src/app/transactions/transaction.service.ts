import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from './transaction.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:5196/api/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(): Promise<Transaction[]> {
    return firstValueFrom(this.http.get<Transaction[]>(this.apiUrl));
  }

  addTransaction(transaction: Transaction): Promise<Transaction> {
    return firstValueFrom(this.http.post<Transaction>(this.apiUrl, transaction));
  }

  updateTransaction(transaction: Transaction): Promise<void> {
    return firstValueFrom(this.http.put<void>(`${this.apiUrl}/${transaction.transactionID}`, transaction));
  }

  deleteTransaction(transactionID: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${transactionID}`));
  }
}