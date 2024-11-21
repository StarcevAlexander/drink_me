import { Cocktail } from '../interfaces/cocktail.model.interface';

export function mapIngredients(cocktail: Cocktail | null | undefined): string[] {
  if (!cocktail) {
    return [];
  }

  const ingredients: string[] = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail];
    if (ingredient) {
      ingredients.push(ingredient);
    }
  }
  return ingredients;
}
