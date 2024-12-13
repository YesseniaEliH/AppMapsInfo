import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})

export class SideMenuComponent implements OnInit {
  showSearchComponent:boolean=false;

  hiddenBoxSearchQueries:boolean=true;
  hiddenBoxAnalysis: boolean=true;
  hiddenBoxTools:boolean=true;
  hiddenBoxInfo:boolean=true;

  constructor(

  ){}

  ngOnInit(): void {
    console.log('side menu');

  }

  fnSearchQueriesMenu() {
    this.hiddenBoxSearchQueries=false;
  }
  fnAnalysisMenu(){
    this.hiddenBoxAnalysis=false;
  }
  fnToolsMenu(){
    this.hiddenBoxTools=false;
  }
  fnInfoMenu(){
    this.hiddenBoxInfo=false;
  }
  fnCloseButtonSearchQueries(){this.hiddenBoxSearchQueries=true;}
  fnCloseButtonAnalysis(){this.hiddenBoxAnalysis=true;}
  fnCloseButtonTools(){this.hiddenBoxTools=true;}
  fnCloseButtonInfo(){this.hiddenBoxInfo=true;}


  fnOpenSearchMenu(){
    this.showSearchComponent=true;
    console.log('search se abrio');
  }

  fnCloseSearchComponent(data:boolean){
    this.showSearchComponent=data;
    console.log('Se hizo click en el boton x de search component',data);
  }

}
