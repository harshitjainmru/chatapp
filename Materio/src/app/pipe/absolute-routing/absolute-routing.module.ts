import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsoluteRoutingPipe } from './absolute-routing.pipe';

@NgModule({
  declarations: [AbsoluteRoutingPipe],
  exports: [AbsoluteRoutingPipe],
  imports: [CommonModule],
})
export class AbsoluteRoutingModule {}
