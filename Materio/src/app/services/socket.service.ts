import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket!: Socket<DefaultEventsMap, DefaultEventsMap>
  userSocketID: any;
  constructor() {
    this.socket = io.connect('http://localhost:3100/', {
      transports: ['websocket', 'polling', 'flashsocket'],
    });
  }
socketConnection(){
  this.socket = io.connect('http://localhost:3100/', {
    transports: ['websocket', 'polling', 'flashsocket'],
  });
}
  getSocket() {
    return this.socket;
  }
  reqGroup(){
    this.socket.emit('getGroup');

  }
getGroup(): Observable<any> {
  return new Observable((observer) => {
    this.socket.on('getGroup', (data) => {
      observer.next(data);
    });
    return () => {
      this.socket.disconnect();
    };
  });
}

  joinRoom(data: any) {
    this.socket.emit('joinRoom', data);
  }

  joinedRoomStatus(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('user-joined', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }



  getOnlineUser() {
    this.socket.on('numberOfOnlineUsers', (data) => {
      return data
    });
    return () => {
      this.socket.disconnect();
    };
  }
  registerUser(data: any) {
    this.socket.emit('isUserAvailableData', data);
  }
  isUserAlreadyExist(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('isUserAvailableData', (data) => {
        console.log(data, 'isuseravailableService');

        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
  leaveGroup(data:any){
    console.log(data,'63 63 63');

    this.socket.emit('leave-group',data);
  }

  getLeaveGroup(){
    return new Observable((observer) => {
      this.socket.on('leaveGroup', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
  newMessage() {
    let observable: any = new Observable<any>((observer) => {
      this.socket.on('new message', (data) => {
        console.log('this is observable..', data);

        observer.next(data);
      });
    });
    return observable;
  }
  sendMessage(data: any) {
    if (this.socket) {
      this.socket.emit('message', data);
    }
  }

  disconnect() {
    if (this.socket) {
      console.log('frgetgeg');

      this.socket.disconnect();
    }
  }
}
