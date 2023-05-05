import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss']
})
export class CommonDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    title: string
}, private mdDialogRef: MatDialogRef<CommonDialogComponent>) { }
public cancel() {
this.close(false);
}
public close(value:any) {
this.mdDialogRef.close(value);
}
public confirm() {
this.close(true);
}
@HostListener("keydown.esc")
public onEsc() {
this.close(false);
}

  ngOnInit(): void {
  }

}
