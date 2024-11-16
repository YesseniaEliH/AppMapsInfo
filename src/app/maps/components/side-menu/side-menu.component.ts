import { Component, ViewEncapsulation } from '@angular/core';

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

export class SideMenuComponent {
  public MenuItems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'Registro'},
    { route: '/maps/zoom-range', name: 'Zoom'},
    { route: '/maps/markers', name: 'Markers'},
    // { route: '/maps/properties', name: 'Houses'}
  ]
 
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
}
