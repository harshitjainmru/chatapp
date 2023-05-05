import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ACCOUNT_ERROR_MESSAGES } from 'src/app/constant/error-message';
import { LIMIT, REGEX } from 'src/app/constant/validator';
import { SocketService } from 'src/app/services/socket.service';
import { StoreDataService } from 'src/app/services/store-data.service';

@Component({
  selector: 'app-room-storage',
  templateUrl: './room-storage.component.html',
  styleUrls: ['./room-storage.component.scss'],
})
export class RoomStorageComponent implements OnInit {
  roomForm!: FormGroup;
  errorMsg = ACCOUNT_ERROR_MESSAGES;

  constructor(
    private dialogRef: MatDialogRef<RoomStorageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private storeData: StoreDataService,
    private socketService: SocketService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
    console.log(this.data);
  }

  createForm() {
    this.roomForm = this._fb.group({
      roomName: [
        '',
        [
          Validators.required,
          Validators.pattern(REGEX.NAME),
          Validators.minLength(LIMIT.MIN_NAME_LENGTH),
          Validators.maxLength(LIMIT.MAX_GROUP_LENGTH),
        ],
      ],
    });
  }
  get formControl() {
    return this.roomForm.controls;
  }
  crossClick() {
    this.dialogRef.close('cancel');
  }

  onConfirmClick(): void {
    console.log(this.roomForm);
    this.roomForm.controls['roomName'].patchValue(
      this.roomForm.controls['roomName'].value?.trim()
    );
    if (this.roomForm.valid) {
      let data = {
        name: this.storeData.getUserInfo.name,
        userId: this.storeData.getUserInfo.userId,
        roomName: this.roomForm.controls.roomName.value,
      };
      console.log(data);
      let groupAlreadyPresent = false;
      this.data.forEach((group: any) => {
        console.log(group);

        if (group.roomName == data.roomName) {
          groupAlreadyPresent = true;
          console.log(group, data, 'kkkkkkkkkkkk');
        }
      });
      if (groupAlreadyPresent) {
        this._snackBar.open(
          `Group already exists!  🗂 `,
          '',
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3 * 1000,
            panelClass: ['errorSnackbar'],
          }
        )
      } else {
        this.socketService.joinRoom(data);
        console.log('inddddddddddddddddddddd');
        this._snackBar.open(
          `You create the group ' ${data.roomName} '  🗂 `,
          '',
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3 * 1000,
            panelClass: ['snackbar'],
          }
        );
        // this.chatService.createGroup(payload);
      }

      this.dialogRef.close(data);
    }
  }
}
