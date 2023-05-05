import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ABS_ACCOUNT_SIGNUP } from 'src/app/constant/absolute-routes';
import { ACCOUNT_ERROR_MESSAGES } from 'src/app/constant/error-message';
import { LAYOUT } from 'src/app/constant/routes';
import { LIMIT, REGEX } from 'src/app/constant/validator';
import { AuthService } from 'src/app/guards/auth.service';
import { SocketService } from 'src/app/services/socket.service';
import { StoreDataService } from 'src/app/services/store-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hide: boolean = true;
  SignupForm!: FormGroup;
  errorMsg = ACCOUNT_ERROR_MESSAGES;
  userName: any = [];
  constructor(
    private _fb: FormBuilder,
    private _route: Router,
    private storeData: StoreDataService,
    private _authService: AuthService,
    private _socketService: SocketService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.isUserAvailable();
    this._socketService.socketConnection();
  }
  createForm() {
    this.SignupForm = this._fb.group({
      name: ['', [Validators.pattern(REGEX.NAME),Validators.minLength(LIMIT.MIN_NAME_LENGTH),Validators.maxLength(LIMIT.MAX_NAME_LENGTH)]],
      email: ['', [Validators.pattern(REGEX.EMAIL)]],
      password: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD)]],

    });
  }
  get formControl() {
    return this.SignupForm.controls;
  }
  isUserAvailable(){
    this._socketService.isUserAlreadyExist().subscribe((notification:any)=>{
      console.log(notification.isPresent,'notification');

      if(notification.isPresent==false){
        this.storeData.setUserInfo(this.SignupForm.value);
        this._snackBar.open('✔ Login Successfully', '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3*1000,
          panelClass: ['snackbar']
        });
        this._route.navigate([LAYOUT]);
      }else{
        console.log(notification.isPresent,'user Present');
        this._snackBar.open(' User Already Exist!  ', '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3*1000,
          panelClass: ['errorSnackbar']
        });
      }
    })
  }

  loginHandler() {
    this.SignupForm.controls['name'].patchValue(
      this.SignupForm.controls['name'].value?.trim()
    );
    if (this.SignupForm.valid) {
    let data={
      name:this.SignupForm.controls['name'].value,
      email:this.SignupForm.controls['email'].value,
      password:this.SignupForm.controls['password'].value,
    }
    this._socketService.registerUser(data);
    this.isUserAvailable();
      this._authService.logIn();
    }
  }
}
