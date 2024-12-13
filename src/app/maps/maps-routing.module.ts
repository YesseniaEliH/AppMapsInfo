import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MapsLayoutComponent } from "./layout/mapsLayout/mapsLayout.component";
import { FullScreenPageComponent } from "./pages/fullScreenPage/full-screen-page.component";

const routes: Routes = [
  {
    path: '',
    component: MapsLayoutComponent,
    children: [
      { path: 'fullscreen', component: FullScreenPageComponent},
      // { path: 'zoom-range', component: ZoomRangePageComponent},
      { path: '**', redirectTo: 'fullscreen'},
    ],
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapsRoutingModule { }
