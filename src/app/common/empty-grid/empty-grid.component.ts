import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-empty-grid',
  templateUrl: './empty-grid.component.html'
})
export class EmptyGridComponent implements OnInit {

@Input() itemsCount:number;
  constructor() { }

  ngOnInit() {
  }

}
