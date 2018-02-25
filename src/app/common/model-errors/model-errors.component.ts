import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-model-errors',
  templateUrl: './model-errors.component.html'
})
export class ModelErrorsComponent implements OnInit {

  constructor() { }
@Input() errors:Array<string>;

  ngOnInit() {
  }

}
