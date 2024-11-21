import {Component, input} from '@angular/core';
import {CardModule} from 'primeng/card';
import {ButtonDirective} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {Cocktail} from '../../../../core/interfaces/cocktail.model.interface';
import {SlicePipe} from '@angular/common';

@Component({
  selector: 'app-drink-card',
  imports: [
    CardModule,
    ButtonDirective,
    RouterLink,
    SlicePipe
  ],
  templateUrl: './drink-card.component.html',
  styleUrl: './drink-card.component.scss'
})
export class DrinkCardComponent {
  public readonly cocktail = input<Cocktail>();
}
