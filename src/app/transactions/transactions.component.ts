import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction } from './transaction.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TransactionService } from './transaction.service';
import { v4 as uuidv4 } from 'uuid';
import { CustomerService } from '../customers/customers.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, NgSelectModule],
  providers: [TransactionService, CustomerService]
})
export class TransactionsComponent {
  isPopupVisible = false;
  editMode = false;
  transactions: Transaction[] = [];
  newTransaction: Transaction = new Transaction();
  customers: { nic: string, name: string }[] = [];

  constructor(private transactionService: TransactionService, private customerService: CustomerService) {}

  async ngOnInit() {
    await this.loadTransactions();
    await this.loadCustomers();
  }

  async loadTransactions() {
    try {
      this.transactions = await this.transactionService.getTransactions();
    } catch (error) {
      console.error('Failed to load transactions:', error);
    }
  }

  async loadCustomers() {
    try {
      this.customers = await this.customerService.getCustomers();
    } catch (error) {
      console.error('Failed to load customers:', error);
    }
  }

  openPopup(editTransaction?: Transaction) {
    if (editTransaction) {
      this.newTransaction = { ...editTransaction };
      this.editMode = true;
    } else {
      this.newTransaction = new Transaction();
      this.newTransaction.transactionID = uuidv4();
      this.editMode = false;
    }
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  async saveTransaction() {
    try {
      if (this.editMode && this.newTransaction.transactionID !== '') {
        // Update existing transaction
        await this.transactionService.updateTransaction(this.newTransaction);
        const index = this.transactions.findIndex(t => t.transactionID === this.newTransaction.transactionID);
        if (index !== -1) {
          this.transactions[index] = { ...this.newTransaction };
        }
      } else {
        // Add new transaction
        const createdTransaction = await this.transactionService.addTransaction(this.newTransaction);
        this.transactions.push(createdTransaction);
      }
      console.log('Transaction saved:', this.newTransaction);
      this.closePopup();
    } catch (error) {
      console.error('Failed to save transaction:', error);
    }
  }

  async deleteTransaction(transactionID: string) {
    try {
      console.log('Deleting transaction:', transactionID);
      await this.transactionService.deleteTransaction(transactionID);
      this.transactions = this.transactions.filter(t => t.transactionID !== transactionID);
      console.log('Transaction deleted:', transactionID);
      this.loadTransactions(); // Refresh the list to reflect the deletion
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  }
}