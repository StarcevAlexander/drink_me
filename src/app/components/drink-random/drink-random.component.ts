import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {CardModule} from 'primeng/card';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Cocktail} from '../../../../core/interfaces/cocktail.model.interface';
import {CocktailService} from '../../../../core/services/cocktail.service';
import {mapIngredients} from '../../../../core/mappings/cocktail-ingredients.mapping';

@Component({
  selector: 'app-drink-random',
  imports: [
    CardModule
  ],
  templateUrl: './drink-random.component.html',
  styleUrl: './drink-random.component.scss'
})
export class DrinkRandomComponent implements OnInit {
  public readonly cocktail = signal<Cocktail | null>(null)
  private readonly cocktailService = inject(CocktailService)
  private readonly _destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.cocktailService.getRandomCocktail()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(data => this.cocktail.set(data))
  }

  public getIngredients(cocktail: Cocktail | null | undefined): string[] {
    return mapIngredients(cocktail);
  }
}
