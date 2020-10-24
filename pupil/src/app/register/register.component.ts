import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from './../services/data-handler.service';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormGroupDirective} from "@angular/forms"
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

var userEmail : boolean;
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

  loginForm = this.fb.group(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)] )
    },{
      validator: this.MustMatch('password', 'confirmPassword')
  });

  
  get registerEmailControl() { return this.loginForm.get('email'); }
  get registerPasswordControl() { return this.loginForm.get('password'); }
  get registerConfirmPasswordControl() { return this.loginForm.get('confirmPassword'); }


  addDataToDataBase(){
    this.dataHandler.addData(this.loginForm.value.email,this.loginForm.value.password);
  }

  constructor(private fb: FormBuilder, public dataHandler: DataHandlerService, private router: Router) {
    this.itemList = dataHandler.getData().snapshotChanges();
    }

  ngOnInit(): void {
  }
  

  getEmail() {
    this.itemList.subscribe(item =>{
      item.forEach(element => {
        if(element.payload.val().email == this.loginForm.value.email && userEmail == false){
          userEmail = true;
          alert("Email already exist please login");
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
    this.dataHandler.addData(this.loginForm.value.email, this.loginForm.value.password);
    // addData(addEmail: String ,addPassword: String);
  }



  onSubmit() {
    this.getEmail();
  }


}
