import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']

})
export class EmployeeAddComponent implements OnInit {
  employee: Employee = { id: 0, name: '', role: '', fromDate: '',toDate: '' };
  empForm : FormGroup;
  submitted = false;
  public employeeRoles = [
    {name:"Product Designer",value:"Product Designer"},
    {name:"Flutter Developer", value:"Flutter Developer"},
    {name:"QA Tester", value:"QA Tester"},
    {name:"Product Owner", value:"Product Owner"}
  ]
  fromDate: any;
  toDate : any;
  isMobileDevice: any;
  bsConfig: { };
  bsConfig1: { };
  invalidTodate: boolean = false;
  id: any;
  employeeId: number;
  constructor(private employeeService: EmployeeService, private router: Router,private route : ActivatedRoute) {
    this.empForm = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.minLength(3)]),
      role: new FormControl('',Validators.required),
      fromDate: new FormControl(new Date(),Validators.required),
      toDate: new FormControl('')
    })
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.employeeId) {
      const employee = this.employeeService.currentEmployees.find((e) => e.id === this.employeeId);
      if (employee) {
        this.empForm.patchValue(employee);
      }
    }
    this.bsConfig = {
      showWeekNumbers: false,
      containerClass: 'theme-blue',
      minDate : new Date()
    };
    this.bsConfig1 = {
      showWeekNumbers: false,
      containerClass: 'theme-blue',
      minDate: null 
    };
  }
  ngOnInit() {
    
  }

  onStartDateChange(selectedDate: Date) {
    this.bsConfig1 = {
      ...this.bsConfig1,
      minDate: selectedDate, 
    };
  }

  addEmployee() {
    if(this.empForm.invalid){
      this.submitted = true;
      return;
    }
    this.employee = this.empForm.value;
    if (this.employeeId) {
      this.employeeService.updateEmployee({ ...this.empForm.value, id: this.employeeId });
    } else {
      this.employeeService.addEmployee(this.employee);

    }
    this.router.navigate(['/']);
  }
}
