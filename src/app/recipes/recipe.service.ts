import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Smokey Grilled Bacon',
      'Mmmmmm that Bacon Smells Delicious',
      'https://c1.staticflickr.com/7/6141/5974874958_b95e1e1c65_b.jpg',
      [
        new Ingredient('Bacon', 6),
        new Ingredient('Spicy Sauce', 1),
        
      ]),
    new Recipe(
      'Big Bacon Sandwich',
      'Tacky and Tasteful',
      'https://c1.staticflickr.com/7/6158/6175755733_b2932d7838_b.jpg',
    [
      new Ingredient('Bacon', 4),
      new Ingredient('Chesse', 4),
      
      ])
  ];

  constructor(private slService: ShoppingListService) {}
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe (index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
