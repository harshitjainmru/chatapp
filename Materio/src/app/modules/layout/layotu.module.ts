import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayotuRoutingModule } from './layotu-routing.module';
import { LayoutComponent } from './layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchIconComponent } from './pages/search-icon/search-icon.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RoomStorageComponent } from './pages/room-storage/room-storage.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MorelessComponent } from './pages/moreless/moreless.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SearchIconComponent,
    RoomStorageComponent,
    MorelessComponent,
  ],
  imports: [
    CommonModule,
    LayotuRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule


  ]
})
export class LayotuModule { }
