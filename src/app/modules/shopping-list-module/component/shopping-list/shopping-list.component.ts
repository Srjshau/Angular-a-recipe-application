import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/modules/shared-module/ingredient.modal';
import { ShoppingListService } from './shopping-list-service/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();

    // To Inform something has changed
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number): void {
    this.shoppingListService.startedEditing.next(index);
  }

}
