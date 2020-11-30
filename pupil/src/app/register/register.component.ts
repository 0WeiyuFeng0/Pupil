import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from './../services/data-handler.service';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormGroupDirective} from "@angular/forms"
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

var userEmail : boolean;
var userType: String = "Patient";
userEmail = false;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  itemList: Observable<any>;

  MustMatch(controlName: string, matchingControlName: string) {

    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

  signupForm = this.fb.group(
    {
      firstName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      birthday: new FormControl('', [Validators.required, Validators.minLength(1)])
    },{
      validator: this.MustMatch('password', 'confirmPassword')
  });

  get registerFirstNameControl() { return this.signupForm.get('firstName'); }
  get registerLastNameControl() { return this.signupForm.get('lastName'); }
  get registerEmailControl() { return this.signupForm.get('email'); }
  get registerPasswordControl() { return this.signupForm.get('password'); }
  get registerConfirmPasswordControl() { return this.signupForm.get('confirmPassword'); }
  get registerBirthdayControl() { return this.signupForm.get('birthday'); }


  constructor(private fb: FormBuilder, public dataHandler: DataHandlerService, private router: Router) {
    this.itemList = dataHandler.getData().snapshotChanges();
    }

  ngOnInit(): void {
  }
  

  getEmail() {
    this.itemList.subscribe(item =>{
      item.forEach(element => {
        if(element.payload.val().email == this.signupForm.value.email && userEmail == false){
          userEmail = true;
          alert("Email already exist, please login");
          this.router.navigate(['/login']);
        }
      });
      
      if(userEmail == false){
        this.addUser();
      }
    });
  }


  addUser(){
    alert("added user");
    this.dataHandler.addData(this.signupForm.value.firstName,this.signupForm.value.lastName,this.signupForm.value.email, this.signupForm.value.password, String(this.signupForm.value.birthday), userType);
    // addData(addEmail: String ,addPassword: String);
  }



  onSubmit() {
    this.getEmail();
  }

  selectType(event: any){
    userType = event.target.value;
    // console.log(userType);
  }

}
