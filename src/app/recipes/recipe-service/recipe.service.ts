import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.modal";
import { ShoppingListService } from "src/app/shopping-list/shopping-list-service/shopping-list.service";
import { Recipe } from "../recipe.modal";

@Injectable()
export class RecipeService {

    recipesChangedNotification = new Subject<Recipe[]>();
    
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'A Test Recipe',
    //         'Simply a test!',
    //         "https://img.buzzfeed.com/video-api-prod/assets/eb44570519264864814264f7f0a5e47a/BFV13909_BakedRatatouille-ThumbTextless1080.jpg?output-format=auto&output-quality=auto",
    //         [
    //             new Ingredient('Meat',1),
    //             new Ingredient('Atta',10)
    //         ]),
    //     new Recipe(
    //         'A Test2 Recipe',
    //         'Simply a test!',
    //         "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/vegan-dishes-1620146357.jpg?crop=0.564xw:0.846xh;0.225xw,0.0685xh&resize=640:*",
    //         [
    //             new Ingredient('Lenom',1),
    //             new Ingredient('Atta',10)
    //         ])
    //   ];

    private recipes: Recipe [] = [];

    constructor(private shoppingListService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.triggerChangeNotification();
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.triggerChangeNotification();
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.triggerChangeNotification();
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index,1);
        this.triggerChangeNotification();
    }

    triggerChangeNotification() {
        this.recipesChangedNotification.next([...this.recipes]);
    }

}





