import { Component, ViewEncapsulation, OnInit } from '@angular/core';


interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
  encapsulation: ViewEncapsulation.None,
})

export class SideMenuComponent  implements OnInit {
  constructor(){

  }
  hiddenBox:boolean=true;

  cursor:any={};
  box:any={};


  public MenuItems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'Registro'},
    { route: '/maps/zoom-range', name: 'Zoom'},
    { route: '/maps/markers', name: 'Markers'},
    // { route: '/maps/properties', name: 'Houses'}
  ]

  ngOnInit (): void {
    console.log('iniciando');
    let caja =document.querySelector('#box-menu');
    let getB= caja?.getBoundingClientRect();
    document.addEventListener('mousedown', (event) => {
      if (caja) {
        this.cursor ={
          x:event.clientX,
          y:event.clientY
        }
        this.box={
          dom:event.target,
          x:getB?.left,
          y:getB?.top
        }
        console.log('ev=',this.cursor);
        console.log('dom',event);
        console.log('getBoundy',this.box);
      }
    })


    console.log(caja,'= caja');

    // document.addEventListener('mousemove',(event)=>{
    //   if (this.box.dom==null) return;
    //   let currentCursor ={
    //     x:event.clientX,
    //     y:event.clientY
    //   }
    //   let distance ={
    //     x:currentCursor.x - this.cursor.x,
    //     y:currentCursor.y - this.cursor.y
    //   }
    //   console.log(currentCursor,'cursor actual');
    //   console.log('distance',distance);
    // });

  }

  ngAfterViewInit() {
    const menuToggle = document.querySelector('.toggle');
    const menu = document.querySelector('.menu');

    if (menuToggle && menu) {
      menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });
    }

    const list = document.querySelectorAll('li');
    list.forEach((item) => {
      item.addEventListener('click', function() {
        list.forEach((item) => item.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }
  fnMenuSearch(){
    this.hiddenBox=false;
  }
  fnClose(){
    this.hiddenBox=true;
  }

}
