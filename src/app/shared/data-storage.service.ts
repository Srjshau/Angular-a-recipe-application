import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe-service/recipe.service';
import { Recipe } from '../recipes/recipe.modal';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService
    ) {}

    private url = 'https://udemy-max-angular-a06de-default-rtdb.firebaseio.com/';

    storeRecipes(): void {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.url + '/recipes.json', recipes).subscribe(
            (response) => console.log(response)
        );
    }

    fetchRecipes(): Observable<Recipe[]> {
        return this.http
        .get<Recipe[]>(this.url + '/recipes.json')
        .pipe(
            map(recipes => {
                return recipes.map( recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),
            tap(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            )
        );
    }
}