import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';

const uiModules = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatSelectModule
];

@NgModule({
  declarations: [],
  imports: uiModules,
  exports: uiModules
})
export class AppUiModule { }
