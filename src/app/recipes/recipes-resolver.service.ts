import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe-service/recipe.service";
import { Recipe } from "./recipe.modal";

@Injectable({
    providedIn: "root"
})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeService.getRecipes();

        if (recipes.length === 0) {
            // this.dataStorageService.fetchRecipes().subscribe(
            //     (response: Recipe[]) => {
            //         this.recipeService.setRecipes(response);
            //     }
            // );
        } else {
            return recipes;
        }  
    }
}