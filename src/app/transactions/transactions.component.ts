import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction } from './transaction.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class TransactionsComponent {
  isPopupVisible = false;
  editMode = false;
  transactions: Transaction[] = [
    { transactionID: 'T001', customerID: 'C001', amount: 200, status: 'Paid', date: '2024-10-01' },
    { transactionID: 'T002', customerID: 'C002', amount: 150, status: 'Credit', date: '2024-10-02' }
  ];
  newTransaction: Transaction = new Transaction();

  openPopup(editTransaction?: Transaction) {
    if (editTransaction) {
      this.newTransaction = { ...editTransaction };
      this.editMode = true;
    } else {
      this.newTransaction = new Transaction();
      this.editMode = false;
    }
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  saveTransaction() {
    if (this.editMode) {
      const index = this.transactions.findIndex(t => t.transactionID === this.newTransaction.transactionID);
      if (index !== -1) {
        this.transactions[index] = { ...this.newTransaction };
      }
    } else {
      this.transactions.push({ ...this.newTransaction });
    }
    console.log('Transaction saved:', this.newTransaction);
    this.closePopup();
  }

  deleteTransaction(transactionID: string) {
    this.transactions = this.transactions.filter(t => t.transactionID !== transactionID);
  }
}