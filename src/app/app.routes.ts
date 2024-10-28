import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { TransactionsComponent } from './transactions/transactions.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'transactions', component: TransactionsComponent }
];
