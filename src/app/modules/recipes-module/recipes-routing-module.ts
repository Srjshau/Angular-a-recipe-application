import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth-module/component/auth/auth.guard';

import { RecipeDetailComponent } from './component/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './component/recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './component/recipes/recipe-start/recipe-start.component';
import { RecipesResolverService } from './component/recipes/recipes-resolver.service';
import { RecipesComponent } from './component/recipes/recipes.component';

const routes: Routes = [
    {
        path: '', component: RecipesComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}
