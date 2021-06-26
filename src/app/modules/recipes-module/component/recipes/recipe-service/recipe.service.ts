import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/modules/shared-module/ingredient.modal';
import { ShoppingListService } from 'src/app/modules/shopping-list-module/component/shopping-list/shopping-list-service/shopping-list.service';
import { Recipe } from '../recipe.modal';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    recipesChangedNotification = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'A Test Recipe',
    //         'Simply a test!',
    // tslint:disable-next-line: max-line-length
    //         "https://img.buzzfeed.com/video-api-prod/assets/eb44570519264864814264f7f0a5e47a/BFV13909_BakedRatatouille-ThumbTextless1080.jpg?output-format=auto&output-quality=auto",
    //         [
    //             new Ingredient('Meat',1),
    //             new Ingredient('Atta',10)
    //         ]),
    //     new Recipe(
    //         'A Test2 Recipe',
    //         'Simply a test!',
    // tslint:disable-next-line: max-line-length
    //         "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/vegan-dishes-1620146357.jpg?crop=0.564xw:0.846xh;0.225xw,0.0685xh&resize=640:*",
    //         [
    //             new Ingredient('Lenom',1),
    //             new Ingredient('Atta',10)
    //         ])
    //   ];

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]): void {
        this.recipes = recipes;
        this.triggerChangeNotification();
    }

    getRecipes(): any {
        return this.recipes.slice();
    }

    getRecipe(index: number): any {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]): void {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
        this.triggerChangeNotification();
    }

    updateRecipe(index: number, newRecipe: Recipe): void {
        this.recipes[index] = newRecipe;
        this.triggerChangeNotification();
    }

    deleteRecipe(index: number): void {
        this.recipes.splice(index, 1);
        this.triggerChangeNotification();
    }

    triggerChangeNotification(): void {
        this.recipesChangedNotification.next([...this.recipes]);
    }

}





