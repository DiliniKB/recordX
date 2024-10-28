import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  private apiUrl = 'http://localhost:5196/api/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Promise<Customer[]> {
    return firstValueFrom(this.http.get<Customer[]>(this.apiUrl));
  }

  addCustomer(customer: Customer): Promise<Customer> {
    return firstValueFrom(this.http.post<Customer>(this.apiUrl, customer));
  }

  updateCustomer(customer: Customer): Promise<void> {
    return firstValueFrom(this.http.put<void>(`${this.apiUrl}/${customer.id}`, customer));
  }

  deleteCustomer(customerID: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${customerID}`));
  }
}