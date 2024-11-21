import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {Observable, forkJoin, of, debounceTime, switchMap, tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {Cocktail} from '../interfaces/cocktail.model.interface';
import {HttpClient} from '@angular/common/http';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Injectable({providedIn: 'root'})
export class CocktailService {
  private readonly apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';
  public readonly cocktails = signal<Cocktail[]>([]);
  private readonly _http = inject(HttpClient);
  private readonly _destroyRef = inject(DestroyRef);

  public getRandomCocktail(): Observable<Cocktail> {
    return this._http.get<{ drinks: Cocktail[] }>(`${this.apiUrl}random.php`).pipe(
      map(response => response.drinks[0])
    );
  }

  public getCocktailById(id: string): Observable<Cocktail> {
    return this._http.get<{ drinks: Cocktail[] }>(`${this.apiUrl}lookup.php?i=${id}`).pipe(
      map(elem => elem.drinks[0])
    );
  }

  public searchCocktails(query: string): void {
    if (!query.trim()) {
      this.getRandomCocktails()
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe();
      return;
    }

    of(query).pipe(
      debounceTime(1000),
      switchMap(q => this._http.get<{ drinks: Cocktail[] }>(`${this.apiUrl}search.php?s=${q.toLowerCase()}`).pipe(
        map(response => response.drinks || []),
        takeUntilDestroyed(this._destroyRef),
        tap(cocktails => this.cocktails.set(cocktails))
      ))
    ).subscribe();
  }

  public getCocktails(): Observable<Cocktail[]> {
    if (this.cocktails().length === 0) {
      return this.getRandomCocktails();
    }
    return of(this.cocktails());
  }

  private getRandomCocktails(): Observable<Cocktail[]> {
    this.cocktails.set([])
    const requests: Observable<Cocktail>[] = [];

    for (let i = 0; i < 12; i++) {
      requests.push(this.getRandomCocktail());
    }

    return forkJoin(requests).pipe(
      map(cocktails => {
        this.cocktails.update(currentCocktails => [...currentCocktails, ...cocktails.filter(cocktail => cocktail !== null)]);
        return this.cocktails();
      })
    );
  }
}
