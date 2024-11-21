import {Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {CardModule} from 'primeng/card';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CocktailService} from '../../../../core/services/cocktail.service';
import {Cocktail} from '../../../../core/interfaces/cocktail.model.interface';
import {mapIngredients} from '../../../../core/mappings/cocktail-ingredients.mapping';

@Component({
  selector: 'app-drink-details',
  imports: [
    CardModule
  ],
  templateUrl: './drink-details.component.html',
  styleUrl: './drink-details.component.scss'
})
export class DrinkDetailsComponent implements OnInit {
  public readonly cocktailId = input<string>('');
  public readonly cocktail = signal<Cocktail | null>(null)
  private readonly cocktailService = inject(CocktailService)
  private readonly _destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.cocktailService.getCocktailById(this.cocktailId())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(data => this.cocktail.set(data))
  }

  public getIngredients(cocktail: Cocktail | null | undefined): string[] {
    return mapIngredients(cocktail);
  }
}
