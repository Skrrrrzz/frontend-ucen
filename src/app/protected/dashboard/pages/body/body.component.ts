import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styles: [
  ]
})
export class BodyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  getBodyClass(): string{
    let styleClass='';
    if(this.collapsed && this.screenWidth > 768){
      styleClass= 'inicio-trimmed';
    }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass= 'inicio-md-screen'
    }
    return '';

 
}

}
