import { Component } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';

import {
  TurbineListComponent
} from '../../components/turbines/turbine-list/turbine-list.component';
import {
  TurbineSaveComponent
} from '../../components/turbines/turbine-save/turbine-save.component';

@Component({
  selector: 'app-turbine-page',
  templateUrl: './turbine-page.component.html',
  standalone: true,
  imports: [
    TurbineListComponent,
    TurbineSaveComponent,
    MatAccordion,
    MatExpansionModule,
  ],
})
export class TurbinePageComponent {}
