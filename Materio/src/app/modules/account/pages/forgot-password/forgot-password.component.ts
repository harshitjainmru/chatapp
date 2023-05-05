import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ACCOUNT_ERROR_MESSAGES } from 'src/app/constant/error-message';
import { REGEX } from 'src/app/constant/validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!:FormGroup
  errorMsg=ACCOUNT_ERROR_MESSAGES
  show:boolean=false

  constructor(private _fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }
  createForm(){
    this.forgotForm = this._fb.group({
      email:['',[Validators.pattern(REGEX.EMAIL)]],
    })
  }
  get formControl (){
    return this.forgotForm.controls
  }
  forgotHandler(){
    this.forgotForm.controls.email.setValidators([]);
    this.forgotForm.controls.email.updateValueAndValidity()
    if(this.forgotForm.valid){
      this.show=true
    }
  }
}
