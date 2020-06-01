import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AntdModule } from './antd.module';
import { CobrowsingformComponent } from './cobrowsingform/cobrowsingform.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { en_US, NzI18nService } from 'ng-zorro-antd';
import { NZ_I18N } from 'ng-zorro-antd/i18n';


@NgModule({
  declarations: [
    AppComponent,
    CobrowsingformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    AntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
