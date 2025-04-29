import {Component, OnInit} from '@angular/core';
import {EmployeeServiceService} from '../../services/emplyeeService/employee-service.service';
import {Employee} from '../../Classes/employee/employee';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import Highcharts from 'highcharts';
import {HighchartsChartModule} from 'highcharts-angular';
import {HttpErrorResponse} from '@angular/common/http';
import {CardValidators} from '../../validators/card-validators';

@Component({
  selector: 'app-employees',
  imports: [
    NgForOf,
    FormsModule,
    HighchartsChartModule,
    NgIf,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './employees.component.html',
  standalone: true,
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  checkoutFromGroup: FormGroup = new FormGroup({});
  public employees: Employee[] = [];
  allEmployees: Employee[] = [];
  public ModalTitle: string = '';
  public tempEmployee: Employee | any;

  constructor(private employeeService: EmployeeServiceService,
              private fromBuilder: FormBuilder,) {
  }

  ngOnInit() {
    this.validators();
    this.getEmployeeList();
  }

  private getEmployeeList() {
    this.employeeService.getEmployees().subscribe(
      res => {
        this.allEmployees = res;
        this.employees = [...res];
      }, error => {
        alert(error.message);
      }
    )
  }

  private addEmployee(): void {
    this.employeeService.addEmployee(this.checkoutFromGroup.value).subscribe(res => {
        alert("successfully added!");
        this.getEmployeeList();
        this.checkoutFromGroup.reset();
      },error => {
          if (error.error && error.error.message) {
            alert(error.error.message);
          }else {
            alert("An unexpected error occurred!");
          }
      });
  }

  private updateEmployee(): void {
    let currentEmployee:Employee=this.checkoutFromGroup.value;
    currentEmployee.id=this.tempEmployee.id;

    this.employeeService.updateEmployee(currentEmployee).subscribe(res => {
        this.getEmployeeList();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  public saveEmployee(): void {
    if (this.ModalTitle === 'اضافة عامل جديد') {
      this.addEmployee();
    } else {
      this.updateEmployee();
    }
  }

  private changeTitle(title: string): void {
    this.ModalTitle = title;
  }

  public onOpenModal(item: Employee | null, mod: string): void {
    this.changeTitle(mod);
    this.checkoutFromGroup.reset();
    console.log(item);
    this.tempEmployee = item;
    if (this.employees) {
      this.checkoutFromGroup.patchValue(
        {
          id:this.tempEmployee.id,
          name: this.tempEmployee.name,
          job: this.tempEmployee.job,
          phone: this.tempEmployee.phone,
          email: this.tempEmployee.email,
          nationalId: this.tempEmployee.nationalId,
          image: this.tempEmployee.image,
        },
      )
    }
  }

  public onDeleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(res => {
        this.getEmployeeList();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployee(value: string): void {
    const searchValue = value.toLowerCase().trim();

    if (!searchValue) {
      this.employees = [...this.allEmployees]; // Reset if empty
      return;
    }

    this.employees = this.allEmployees.filter(item =>
      item.name.toLowerCase().includes(searchValue) ||
      item.phone.toLowerCase().includes(searchValue) ||
      item.job.toLowerCase().includes(searchValue) ||
      item.nationalId.toLowerCase().includes(searchValue)
    );
  }

  openDetails(item: Employee) {
    this.tempEmployee = item;
  }

  private validators(): void {
    this.checkoutFromGroup = this.fromBuilder.group({
      name: new FormControl('',
        [Validators.required, Validators.minLength(3), CardValidators.notOnlyWhiteSpace]),
      job: new FormControl('',
        [Validators.required, Validators.minLength(3), CardValidators.notOnlyWhiteSpace]),
      phone: new FormControl('',
        [Validators.required, Validators.minLength(11), Validators.maxLength(11), CardValidators.notOnlyWhiteSpace]),
      nationalId: new FormControl('',
        [Validators.required, Validators.minLength(14), Validators.maxLength(14), CardValidators.notOnlyWhiteSpace]),
      email: new FormControl('',
        [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      image: new FormControl('',
        [Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i),
          CardValidators.notOnlyWhiteSpace]),
    });
  }

  get name() {
    return this.checkoutFromGroup.get('name');
  }

  get job() {
    return this.checkoutFromGroup.get('job');
  }

  get phone() {
    return this.checkoutFromGroup.get('phone');
  }

  get nationalId() {
    return this.checkoutFromGroup.get('nationalId');
  }

  get image() {
    return this.checkoutFromGroup.get('image');
  }

  get email() {
    return this.checkoutFromGroup.get('email');
  }
}
