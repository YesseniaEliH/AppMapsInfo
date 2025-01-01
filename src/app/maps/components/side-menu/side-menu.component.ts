import { Component} from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})

export class SideMenuComponent {
  showSearchComponent:boolean=false;
  hiddenBoxSearchQueries:boolean=true;
  hiddenBoxAnalysis: boolean=true;
  hiddenBoxTools:boolean=true;
  hiddenBoxInfo:boolean=true;

  constructor(
    private readonly mapService:MapService
  ){}

  fnSearchQueriesMenu() {this.hiddenBoxSearchQueries=false;}
  fnAnalysisMenu(){this.hiddenBoxAnalysis=false;}
  fnToolsMenu(){this.hiddenBoxTools=false;}
  fnInfoMenu(){this.hiddenBoxInfo=false;}
  fnCloseButtonSearchQueries(){this.hiddenBoxSearchQueries=true;}
  fnCloseButtonAnalysis(){this.hiddenBoxAnalysis=true;}
  fnCloseButtonTools(){this.hiddenBoxTools=true;}
  fnCloseButtonInfo(){this.hiddenBoxInfo=true;}
  fnOpenSearchMenu(){this.showSearchComponent=true;
    console.log('search se abrio');
  }

  fnCloseSearchComponent(data:boolean){
    this.showSearchComponent=data;
    console.log('Se hizo click en el boton x de search component',data);
  }

  fnZoomIn(){this.mapService.zoomIn();}
  fnZoomOut(){this.mapService.zoomOut();}
}
