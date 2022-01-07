import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ClarityModule } from '@clr/angular';

import { AppComponent } from './app.component';
import { BasicDatagridComponent } from './basic-datagrid.component';
import { BottomComponent } from './bottom/bottom.component';
import { ColorFilter2 } from './color-filter2/color.filter2.component';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, ClarityModule, FormsModule],
  declarations: [
    AppComponent,
    BasicDatagridComponent,
    BottomComponent,
    ColorFilter2,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
