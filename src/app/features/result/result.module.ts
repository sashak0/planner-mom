import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result.component';

@NgModule({
  declarations: [ResultComponent],
  imports: [SharedModule, ResultRoutingModule],
})
export class ResultModule {}
