import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: Employee[] = [
    { id: 1, name: 'John Doe', role: 'QA Tester', fromDate: 'Thu Jun 11 2020 12:32:01 GMT+0530 (India Standard Time)', toDate:'' },
    { id: 2, name: 'Jane Smith', role: 'Product Designer', fromDate: 'Thu Jun 11 2020 12:32:01 GMT+0530 (India Standard Time)', toDate:'Thu Nov 16 2023 12:32:01 GMT+0530 (India Standard Time)' },
  ];

  private employeesSubject = new BehaviorSubject<Employee[]>(this.employees);
  // employees$ = this.employeesSubject.asObservable();
  getEmployees() {
    return this.employeesSubject.asObservable();
  }

  isMobile(): boolean {
    return window.innerWidth <= 760;  // 768px is a common breakpoint for mobile
  }

  addEmployee(employee: Employee) {
    this.employees.push({ ...employee, id: this.generateId() });
    this.employeesSubject.next(this.employees);
  }

  updateEmployee(updatedEmployee: Employee): void {
    const index = this.employees.findIndex((e) => e.id === updatedEmployee.id);
    if (index > -1) {
      this.employees[index] = updatedEmployee;
      this.employeesSubject.next(this.employees); // Update observable
    }
  }

  deleteEmployee(id: number) {
    this.employees = this.employees.filter(e => e.id !== id);
    this.employeesSubject.next(this.employees);
  }

  private generateId(): number {
    return Math.max(...this.employees.map(e => e.id), 0) + 1;
  }

  get currentEmployees(): Employee[] {
    return this.employeesSubject.getValue();
  }
}
