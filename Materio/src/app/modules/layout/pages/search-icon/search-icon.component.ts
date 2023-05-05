import { flatten } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-icon',
  templateUrl: './search-icon.component.html',
  styleUrls: ['./search-icon.component.scss']
})
export class SearchIconComponent implements OnInit {

  @ViewChild('searchbar')
  searchbar!: ElementRef;
  searchText = '';
  showbtn = false

  toggleSearch: boolean = false;
  constructor() {

  }


  ngOnInit(): void {
  }
  openSearch() {
    this.toggleSearch = true;
    this.showbtn = true
    this.searchbar?.nativeElement.focus();
  }
  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
    this.showbtn=false
  }

}
