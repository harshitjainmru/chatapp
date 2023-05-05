import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogComponentRef!: MatDialogRef<CommonDialogComponent>;

  constructor(private dialog: MatDialog) { }

  public open(options:any) {
    this.dialogComponentRef = this.dialog.open(CommonDialogComponent, {
        disableClose: true,
         data: {
           title: options.title,
           message: options.message,
           cancelText: options.cancelText,
           confirmText: options.confirmText
         }
    });
  }
  public confirmed(): Observable<any> {

    return this.dialogComponentRef.afterClosed().pipe(take(1), map(res => {
        return res;
      }
    ));
  }
}
