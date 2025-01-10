import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { AddEditEmployeeComponent } from './pages/add-edit-employee/add-edit-employee.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'employee-list',
    component: EmployeeListComponent,
    children: [
      { path: 'employee-details', component: EmployeeDetailsComponent },
      { path: 'employee-details/:id', component: EmployeeDetailsComponent },
    ],
  },
  { path: 'add-edit-employee', component: AddEditEmployeeComponent },
  { path: 'add-edit-employee/:id', component: AddEditEmployeeComponent },
];
