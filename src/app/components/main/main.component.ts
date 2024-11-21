import {Component, DestroyRef, OnInit, signal} from '@angular/core';
import {DrinkCardComponent} from '../drink-card/drink-card.component';
import {inject} from '@angular/core';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {Cocktail} from '../../../../core/interfaces/cocktail.model.interface';
import {CocktailService} from '../../../../core/services/cocktail.service';

@Component({
  selector: 'app-main',
  imports: [
    DrinkCardComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  public readonly cocktails = signal<Cocktail[]>([]);
  private readonly cocktailService = inject(CocktailService)
  private readonly _destroyRef = inject(DestroyRef);

  constructor() {
    toObservable(this.cocktailService.cocktails)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(data => this.cocktails.set(data))
  }

  ngOnInit(): void {
    this.cocktailService.getCocktails().subscribe()
  }
}
