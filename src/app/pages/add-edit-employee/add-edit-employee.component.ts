import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { IEmployee } from '../../core/models/common.models';

@Component({
  selector: 'app-add-edit-employee',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-edit-employee.component.html',
  styleUrl: './add-edit-employee.component.scss',
})
export class AddEditEmployeeComponent implements OnInit {
  employee: IEmployee[] = [];
  employeeForm!: FormGroup;
  employeeId = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.employeeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.employeeId = params['id'];
        this.getEmployee(this.employeeId);
      },
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.employeeService.addEmployee(this.employeeForm.value);

      // if (this.employeeId != '') {
      //   this.employeeService.updateEmployee(
      //     this.employeeId,
      //     this.employeeForm.value
      //   );
      // }
      this.router.navigate(['/employee-list']);
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  getEmployee(key: string) {
    this.employeeService
      .getEmployee(key)
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          let employee = data.payload.toJSON() as IEmployee;
          this.employeeForm.setValue(employee);
        },
      });
  }
}
