import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DialogService } from 'src/app/components/dialog/dialogService/dialog.service';
import { ABS_ACCOUNT_SIGNUP } from 'src/app/constant/absolute-routes';
import { ACCOUNT_ERROR_MESSAGES } from 'src/app/constant/error-message';
import { LIMIT } from 'src/app/constant/validator';
import { AuthService } from 'src/app/guards/auth.service';
import { SocketService } from 'src/app/services/socket.service';
import { StoreDataService } from 'src/app/services/store-data.service';
import { RoomStorageComponent } from './pages/room-storage/room-storage.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  messageForm!: FormGroup;
  newUserId = this.storeService.getUserInfo.userId;
  newUserName = this.storeService.getUserInfo.name;
  numberOfOnlineUsers: any;
  contactList: any = [];
  chatData: any;
  userlist: any = true;
  messageArray: Array<any> = [];
  groupMessage: any = {};
  socket: any;
  showChat: any = false;
  on_Selection: any = false;
  activeUserArray = [];
  showPrivateChat: any = false;
  availableGroup: any = [];
  userDetails: any = [];
  iconShow: any = true;
  joinUserObject: any = {};
  joinUser: Array<any> = [];
  privateMessage: any = {};
  showJoinUser: any;
  errorMsg = ACCOUNT_ERROR_MESSAGES;
  private unsubscriber: Subject<void> = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    public socketService: SocketService,
    public storeService: StoreDataService,
    private dialog: MatDialog,
    private _route: Router,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.createForm();
    this.recieveMessage();
    this.socket = this.socketService.getSocket();
    console.log(this.socket.id, 'oooo');
    this.privateChat();
    this.getOnlineUsers();
    this.getUserJoined();
    this.getLeaveGroupData();
    this.disableBackButton();
    this.getGroup();
    this.showChat = true;
  }

  createForm() {
    this.messageForm = this._fb.group({
      message: [
        '',
        [Validators.required, Validators.maxLength(LIMIT.MAX_CHAT_LENGTH)],
      ],
    });
  }

  disableBackButton() {
    history.pushState(null, '');

    fromEvent(window, 'popstate')
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((_) => {
        history.pushState(null, '');
      });
  }

  get formControl() {
    return this.messageForm.controls;
  }


  getOnlineUsers() {
    this.socket.on('numberOfOnlineUsers', (numberOfOnlineUsers) => {
      this.userlist = true;
      console.log(this.userlist, 'userList66...........');

      this.numberOfOnlineUsers = numberOfOnlineUsers;
      console.log(this.numberOfOnlineUsers, 'this.numberOfOnlineUsers');
    });
  }
  getGroup(){
    this.socketService.reqGroup();
    this.socketService.getGroup().subscribe(res=>{
      this.availableGroup=res;
    })
  }

  getUserJoined() {
    this.socketService.joinedRoomStatus().subscribe((data) => {
      console.log(data,'data107');
      this.showJoinUser = data.name;
      this.availableGroup = data.availableGroup;
      // this.storeService.setAvailableGrp(data)
      console.log(this.availableGroup, data, 'group..........');
      if (this.storeService.getUserInfo.name != data.name) {
        if (!this.joinUserObject[data.info.roomName]) {
          this.joinUserObject[data.info.roomName] = [];
        }
        // if(this.joinUserObject[data.info.name] ==)
        this.joinUserObject[data.info.roomName].push({
          message: `${data.info.name} has joined the group`,
        });
      }
      console.log(data, 'getuserjoined.............', this.joinUserObject);
    });
  }
  isGroupAvailable(data) {
    console.log(data,'datahjhjhjhj');

    let index = this.contactList.findIndex(
      (item: any) => item.roomName === data
    );
    return index;
  }

  onSelect(data: any) {
    this.on_Selection = true;
    this.showChat = true;
    this.chatData = data;
    // this.socketService.joinRoom(this.chatData);

    console.log(
      this.chatData,
      'onSelectData(group)',
      this.joinUserObject[data.roomName]
    );
    this.messageArray = this.groupMessage[data.roomName];
    this.joinUser = this.joinUserObject[data.roomName];
  }
  openGroup(groupData) {
    const options = {
      title: 'Groups',
      message: 'Are you sure want to join this group?',
      cancelText: 'No',
      confirmText: 'Yes',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        console.log(groupData, 'groupData......');
        let roomData = {
          name: this.storeService.getUserInfo.name,
          userId: this.storeService.getUserInfo.userId,
          roomName: groupData.roomName,
        };
        if (this.isGroupAvailable(groupData.roomName) == -1) {
          this.socketService.joinRoom(roomData);
          this.contactList.push(roomData);
          this.groupMessage[roomData.roomName] = [];
          this._snackBar.open(
            `You Joined the group ' ${groupData.roomName} ' 🗂`,
            '',
            {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3 * 1000,
              panelClass: ['snackbar'],
            }
          );
        }
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RoomStorageComponent, {
      disableClose: true,
      data:this.availableGroup
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res != 'cancel') {
        console.log(
          this.isGroupAvailable(res.roomName) == -1,
          'this.isGroupAvailable(res.roomName) == -1'
        );

        if (this.isGroupAvailable(res.roomName) == -1) {
          this.contactList.push(res);
          console.log(res, 'res');
          this.groupMessage[res.roomName] = [];
        }
      }
    });
  }

  selectUserHandler(data: any) {
    console.log('data...............', data);
    this.on_Selection = true;
    this.showChat = true;
    this.chatData = data;
    console.log(this.chatData, 'chatdata');

    if (!this.privateMessage[data.name]) {
      this.privateMessage[data.name] = [];
    }
    this.messageArray = this.privateMessage[data.name];
    this.joinUser = [];
    console.log(this.messageArray, 'messageArray');
    console.log(this.chatData, 'usd');
  }
  privateChat() {
    this.socket.emit('privateMessage', this.storeService.getUserInfo.name);
    console.log(this.storeService.getUserInfo.name, 'user');

    this.socket.on('array', (userData: any) => {
      console.log('userdata', userData, userData.name);
      this.privateMessage[userData.name] = [];

      this.activeUserArray = userData.filter((data: any) => {
        console.log(data, 'activeUSerArray');
        this.iconShow = true;
        return this.socket.id != data.socketId;
      });
      console.log(this.activeUserArray, 'activeUser');
      this.userDetails = this.activeUserArray;

      console.log('this', this.userDetails);
    });
  }

  recieveMessage() {
    this.socketService.newMessage().subscribe((data: any) => {
      console.log(data, 'lolo');
      if (data.roomName) {
        this.groupMessage[data.roomName].push(data);
      } else if (data.socketId) {
        if (!this.privateMessage[data.name]) {
          this.privateMessage[data.name] = [];
          this.privateMessage[data.name].push(data);
        } else {
          this.privateMessage[data.name].push(data);
        }
      }
      console.log(data, 'receive message');
    });
  }
  leaveGroup(grpData: any) {
    const options = {
      title: 'Leave Group',
      message: 'Are you sure want to leave the group?',
      cancelText: 'No',
      confirmText: 'Yes',
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        console.log(grpData, 'grpData');
        this.socketService.leaveGroup(grpData);
        console.log(
          delete this.groupMessage[grpData.roomName],
          'delete this.groupMessage[grpData.roomName]'
        );
        delete this.groupMessage[grpData.roomName];
        let idx = this.contactList.findIndex(
          (user: any) => user?.roomName === grpData.roomName
        );
        this.showChat = false;
        console.log(idx, 'ssssss');
        if (idx > -1) {
          this.contactList.splice(idx, 1);
          console.log(this.contactList, 'spliced!!');
        }
        this._snackBar.open(
          `${grpData.name} leaved the ${grpData.roomName} group! 🗂`,
          '',
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3 * 1000,
            panelClass: ['errorSnackbar'],
          }
        );
      }
    });
  }

  getLeaveGroupData() {
    this.socketService.getLeaveGroup().subscribe((data: any) => {
      this._snackBar.open(
        `${data.name} leaved the ${data.roomName} group! 🗂`,
        '',
        {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3 * 1000,
          panelClass: ['errorSnackbar'],
        }
      );
    });
  }

  submitMessage() {
    this.messageForm.controls['message'].patchValue(
      this.messageForm.controls['message'].value?.trim()
    );

    if (
      this.messageForm.valid &&
      this.messageForm.controls.message.value.length < 800
    ) {
      const message = this.messageForm.controls.message.value;
      console.log(message, 'Message');
      let data = {
        message: message,
        name: this.storeService.getUserInfo.name,
        roomName: this.chatData?.roomName,
        userId: this.storeService.getUserInfo.userId,
        socketId: this.chatData?.socketId,
      };
      console.log(data, 'Data');

      this.socketService.sendMessage(data);
      if (!data.roomName) {
        this.privateMessage[this.chatData.name].push(data);
      }
    } else {
      this._snackBar.open(`You reached maximum (800) characters`, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3 * 1000,
        panelClass: ['errorSnackbar'],
      });
    }
    this.messageForm.reset();
  }
  logout() {
    this.showPrivateChat = true;
    const options = {
      title: 'LogOut',
      message: 'Are you sure want to LogOut?',
      cancelText: 'No',
      confirmText: 'Yes',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this._route.navigate([ABS_ACCOUNT_SIGNUP]);
        this._authService.logOut();
        console.clear();
      }
    });
  }

  ngOnDestroy() {
    this.socketService.disconnect();
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
