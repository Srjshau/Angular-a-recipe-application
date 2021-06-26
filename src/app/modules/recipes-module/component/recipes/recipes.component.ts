import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/modules/shared-module/data-storage.service';
import { RecipeService } from './recipe-service/recipe.service';
import { Recipe } from './recipe.modal';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.dataStorageService.fetchRecipes().subscribe(
      (response: Recipe[]) => {
        this.recipeService.setRecipes(response);
      });
  }
}
