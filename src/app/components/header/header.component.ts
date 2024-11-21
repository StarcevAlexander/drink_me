import {Component, inject} from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {DialogService} from 'primeng/dynamicdialog';
import {DrinkRandomComponent} from '../drink-random/drink-random.component';
import {FormsModule} from '@angular/forms';
import {CocktailService} from '../../../../core/services/cocktail.service';

@Component({
  selector: 'app-header',
  imports: [
    InputTextModule,
    ButtonDirective,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [DialogService],
})
export class HeaderComponent {
  public searchQuery: string = '';
  private dialogService = inject(DialogService);
  private readonly cocktailService = inject(CocktailService);

  public openRandom(): void {
    this.dialogService.open(DrinkRandomComponent, {});
  }

  public searchCocktails(): void {
    this.cocktailService.searchCocktails(this.searchQuery)
  }
}
