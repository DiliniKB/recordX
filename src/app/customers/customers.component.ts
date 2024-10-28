import { Component, OnInit } from '@angular/core';
import { Customer } from './customer.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CustomerService } from './customers.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [CustomerService]
})
export class CustomersComponent implements OnInit {
  isPopupVisible = false;
  editMode = false;
  customers: Customer[] = [];
  newCustomer: Customer = new Customer();

  constructor(private customerService: CustomerService) {}

  async ngOnInit() {
    await this.loadCustomers();
  }

  async loadCustomers() {
    try {
      this.customers = await this.customerService.getCustomers();
    } catch (error) {
      console.error('Failed to load customers:', error);
    }
  }

  openPopup(editCustomer?: Customer) {
    if (editCustomer) {
      this.newCustomer = { ...editCustomer };
      this.editMode = true;
    } else {
      this.newCustomer = new Customer();
      this.editMode = false;
    }
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  async saveCustomer() {
    try {
      if (this.editMode && this.newCustomer.id !== '') {
        // Update existing customer
        await this.customerService.updateCustomer(this.newCustomer);
        const index = this.customers.findIndex(c => c.id === this.newCustomer.id);
        if (index !== -1) {
          this.customers[index] = { ...this.newCustomer };
        }
      } else {
        // Add new customer
        const createdCustomer = await this.customerService.addCustomer(this.newCustomer);
        this.customers.push(createdCustomer);
      }
      console.log('Customer saved:', this.newCustomer);
      this.closePopup();
    } catch (error) {
      console.error('Failed to save customer:', error);
    }
  }

  async deleteCustomer(customerID: string) {
    try {
      console.log('Deleting customer:', customerID);
      await this.customerService.deleteCustomer(customerID);
      this.customers = this.customers.filter(c => c.id !== customerID);
      console.log('Customer deleted:', customerID);
    } catch (error) {
      console.error('Failed to delete customer:', error);
    }
  }
}