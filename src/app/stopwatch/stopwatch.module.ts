import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StopwatchPage } from './stopwatch.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { StopwatchRoutingModule } from './stopwatch-routing.modules';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    StopwatchRoutingModule
  ],
  declarations: [StopwatchPage]
})
export class StopwatchPageModule {}
