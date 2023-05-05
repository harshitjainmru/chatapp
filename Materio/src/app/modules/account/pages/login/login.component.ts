import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ACCOUNT_ERROR_MESSAGES } from 'src/app/constant/error-message';
import { REGEX } from 'src/app/constant/validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
hide:boolean=true
loginForm!:FormGroup
errorMsg=ACCOUNT_ERROR_MESSAGES
  constructor(private _fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.loginForm = this._fb.group({
      email:['',[Validators.pattern(REGEX.EMAIL)]],
      password:['',[Validators.required,Validators.pattern(REGEX.PASSWORD)]]
    })
  }
  get formControl (){
    return this.loginForm.controls
  }
  loginHandler(){

  }

}
