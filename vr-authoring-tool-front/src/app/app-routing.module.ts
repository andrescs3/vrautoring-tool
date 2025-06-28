import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { PresentatorActivityComponent } from './presentator-activity/presentator-activity.component';
import { PresentatorEditorComponent } from './presentator-editor/presentator-editor.component';
import { AcitivtyListComponent } from './acitivty-list/acitivty-list.component';
import { ConcentrationEditorComponent } from './concentration-editor/concentration-editor.component';
import { ConcentrationActivityComponent } from './concentration-activity/concentration-activity.component';

const routes: Routes = [
  { path: 'home', component: AcitivtyListComponent },
  { path: 'welcome', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'presentator/:id', component: PresentatorActivityComponent },
  { path: 'concentration/:id', component: ConcentrationActivityComponent },
  
  { path: 'activity-list', component: AcitivtyListComponent },
  { path: 'presentator-edit', component: PresentatorEditorComponent },
  { path: 'presentator-edit/:id', component: PresentatorEditorComponent },
  { path: 'presentator-edit/:id/:copy', component: PresentatorEditorComponent },

  { path: 'concentration-edit', component: ConcentrationEditorComponent },
  { path: 'concentration-edit/:id', component: ConcentrationEditorComponent },
  { path: 'concentration-edit/:id/:copy', component: ConcentrationEditorComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
