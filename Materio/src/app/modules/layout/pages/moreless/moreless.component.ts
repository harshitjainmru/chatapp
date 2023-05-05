import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-moreless',
  templateUrl: './moreless.component.html',
  styleUrls: ['./moreless.component.scss']
})
export class MorelessComponent implements OnInit {
@Input() text :any='';
@Input() wordLimit:any;
showMore :any = false
  constructor() { }

  ngOnInit(): void {
  }

}
