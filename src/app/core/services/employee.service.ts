import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { IEmployee } from '../models/common.models';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private dbPath = '/employees';
  employeesRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.employeesRef = db.list(this.dbPath);
  }

  getAllEmployees() {
    return this.employeesRef;
  }

  getEmployee(key: string) {
    return this.db.object(`${this.dbPath}/${key}`);
  }

  addEmployee(employee: IEmployee) {
    this.employeesRef.push(employee);
  }

  updateEmployee(key: string, employee: IEmployee) {
    this.employeesRef.update(key, employee);
  }

  deleteEmployee(key: string) {
    return this.employeesRef.remove(key);
  }
}
