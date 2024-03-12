import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "../app.component";
import {DisplayPageComponent} from "../page/display-page/display-page.component";
import {AddingPageComponent} from "../page/adding-page/adding-page.component";
import {ModifyingPageComponent} from "../page/modifying-page/modifying-page.component";
import {DeletingPageComponent} from "../page/deleting-page/deleting-page.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "doctors", component: DisplayPageComponent},
  { path: "doctors/add", component: AddingPageComponent},
  { path: "doctors/modify", component: ModifyingPageComponent},
  { path: "doctors/delete", component: DeletingPageComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
