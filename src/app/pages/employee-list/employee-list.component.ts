import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { IEmployee } from '../../core/models/common.models';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  employees: IEmployee[] = [];
  totalEmployees = 0;
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService
      .getAllEmployees()
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          this.employees = [];

          data.forEach((item) => {
            let employee = item.payload.toJSON() as IEmployee;
            this.totalEmployees += parseInt(employee.salary);

            this.employees.push({
              key: item.key || '',
              name: employee.name,
              position: employee.position,
              department: employee.department,
              salary: employee.salary,
            });
          });
        },
      });
  }

  editEmployee(key: string) {
    this.router.navigate(['/add-edit-employee/' + key]);
  }

  removeEmployee(key: string) {
    if (window.confirm('Are You Sure ??')) {
      this.employeeService.deleteEmployee(key);
    }
  }
}
