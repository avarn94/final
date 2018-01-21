import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isOpened: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggleMenu() {
  	this.isOpened = !this.isOpened;
  }

}
