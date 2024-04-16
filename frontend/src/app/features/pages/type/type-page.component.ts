import { Component } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';

import { TypeListComponent } from '../../components/types/type-list/type-list.component';
import { TypeSaveComponent } from '../../components/types/type-save/type-save.component';

@Component({
  selector: 'app-type-page',
  templateUrl: './type-page.component.html',
  standalone: true,
  imports: [
    TypeListComponent,
    TypeSaveComponent,
    MatAccordion,
    MatExpansionModule,
  ],
})
export class TypePageComponent {}
