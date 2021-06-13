import { Component } from '@angular/core';
import { RecipeService } from '../recipes/recipe-service/recipe.service';
import { Recipe } from '../recipes/recipe.modal';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe(
      (response: Recipe[]) => {
          this.recipeService.setRecipes(response);
      }
  )
  }
}
