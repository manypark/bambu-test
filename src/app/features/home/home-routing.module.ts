import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { NumbersComponent } from './components/numbers/numbers.component';

const routes: Routes = [
  {
    path     : '',
    component: HomeComponent,
    children: [
      {
        path: 'pokemons',
        component: PokemonsComponent,
      },
      {
        path: 'numbers',
        component: NumbersComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
