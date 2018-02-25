import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-thankYou',
  templateUrl: './thankYou.component.html',
  styleUrls: ['./thankYou.component.css'],
  providers:[]
})
export class ThankYouComponent implements OnInit {

  active:boolean=true;

  constructor(private _router:Router){

  }

  ngOnInit(){
  }


}
