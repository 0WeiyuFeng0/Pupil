import { DataHandlerService } from './../services/data-handler.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormGroupDirective} from "@angular/forms"
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  itemList: Observable<any>;

  // username:string = '';
  // password:string = '';

  // inputEmai = ('');
  // inputPassword = ('')
  // loginForm = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // });

  loginForm = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  addDataToDataBase(){
    this.dataHandler.addData(this.loginForm.value.email,this.loginForm.value.password);
  }

  constructor(private fb: FormBuilder, public dataHandler: DataHandlerService) {
    this.itemList = dataHandler.getData().snapshotChanges();
    }

  ngOnInit(): void {
  }

  // getValue(){
  //   // this.inputEmai = (<HTMLInputElement>document.getElementById("inputEmail")).value;
  //   // this.inputPassword = (<HTMLInputElement>document.getElementById("inputEmail")).value;
  //   // console.warn("email:" + this.inputEmai + " password:" + this.inputPassword)
  //   if(this.username == "" || this.password == ""){
  //     console.log("empty");
  //     alert("empty")
  //   }else{
  //     console.log("username:" + this.username + " password:" + this.password);
  //     alert("username:" + this.username + " password:" + this.password);
  //   }
  // }
  

  getEmail(){
    this.itemList.subscribe(item =>{
      item.forEach(element => {
        if(element.payload.val().emai == this.loginForm.value.email && element.payload.val().password == this.loginForm.value.password){
          // console.log(element.payload.val().emai ,this.loginForm.value.email, element.payload.val().password, this.loginForm.value.password);
          alert("you are in")
        }else{
          // console.log(element.payload.val().emai + "!=" +this.loginForm.value.email, element.payload.val().password + "!=" + this.loginForm.value.password);
        }
        // console.log(element.payload.val().emai, element.payload.val().password);
      });
      // console.log(item,item.payload);
    });
  }

  //   this.itemList.forEach(item => {
  //   //   this.userList = [];
  //   //   userSnapshot.forEach(userSnapshot => {
  //   //     let user = userSnapshot.payload.toJSON();
  //   //     user['$key'] = userSnapshot.key;
  //   //     this.userList.push(user as IUser);
  //   //   })
  //   // }
  //   });
  //  }


  onSubmit() {
    // console.warn(this.loginForm.value);
    this.getEmail()

    // this.addDataToDataBase()

    // this.dataHandler.getEmail("asdf");

    // if(this.loginForm.value.email == 'test@test.com' && this.loginForm.value.password == "pass"){

    // }else{
    //   alert( " email: " + this.loginForm.value.email + " pass: " + this.loginForm.value.password + ' Wrong email and password')
    // }

  }


}
