import { Directive,Input,OnInit, OnChanges } from '@angular/core';

// @Directive({
//   selector: '[init]',
//   inputs: ['init']
// })
// export class InitDir implements OnChanges{
//   init:any;

//   ngOnChanges() {     // `ngOnInit` if you want it to run just once
//     if(this.init){
//       let iife = function(str:any){ return eval(str); }.call(this.init[0], this.init[1]);
//     }
//   }
// }


@Directive({
  selector: 'ngInit',
  exportAs: 'ngInit'
}) 
export class NgInit {
  @Input() values: any = {};

  @Input() ngInit:any;
  ngOnInit() {
    if(this.ngInit) { this.ngInit(); }
  }  
}