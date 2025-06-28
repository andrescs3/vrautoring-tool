import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { PresentatorActivityComponent } from './presentator-activity/presentator-activity.component';
import { PresentatorEditorComponent } from './presentator-editor/presentator-editor.component';
import { SafePipe } from './_pipes/safe-pipe';
import { AcitivtyListComponent } from './acitivty-list/acitivty-list.component';
import { CustomurlPipe } from './customurl.pipe';
import { ColorPickerModule } from 'ngx-color-picker';
import { ConcentrationEditorComponent } from './concentration-editor/concentration-editor.component';
import { ConcentrationActivityComponent } from './concentration-activity/concentration-activity.component';
import { HotTableModule } from '@handsontable/angular';
import Handsontable from 'handsontable/base';

import {
  registerCellType,
  NumericCellType,
} from 'handsontable/cellTypes';

import {
  registerPlugin,
  UndoRedo,
} from 'handsontable/plugins';

registerCellType(NumericCellType);
registerPlugin(UndoRedo);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    PresentatorActivityComponent,
    PresentatorEditorComponent,
    SafePipe,
    AcitivtyListComponent,
    CustomurlPipe,
    ConcentrationEditorComponent,
    ConcentrationActivityComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ColorPickerModule,
    HotTableModule.forRoot()
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
