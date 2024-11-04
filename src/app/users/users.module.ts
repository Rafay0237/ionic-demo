import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UsersPage } from './users.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    ScrollingModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersPage
      }
    ])
  ],
  declarations: [UsersPage]
})
export class UsersPageModule {}