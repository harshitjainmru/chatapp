import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreDataService {
  userInfo:any={}
  group:any={}
  constructor() { }

  setUserInfo(data?:any){
    this.userInfo={
      name: data.name,
      email: data.email,
      userId: this.generateUserId()
    }
    console.log(this.userInfo);

  }
  get getUserInfo(){
    return this.userInfo;
  }
  setAvailableGrp(data?:any){
    this.group =[data.availableGroup]
    console.log(this.group,'groupdtata11 28 line');

  }
  get getAvailableGrp(){
    return this.group;
  }
  generateUserId(){
    const length = 4;
    const randomNumber  =Math.floor(
      Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1)

    );
    return randomNumber;
  }
}
