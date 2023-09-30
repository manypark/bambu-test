import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from 'src/app/core/material/material.module';
import { HomeComponent } from './home.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { NumbersComponent } from './components/numbers/numbers.component';

@NgModule({
  declarations: [
    HomeComponent,
    PokemonsComponent,
    NumbersComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,

    MaterialModule,
  ]
})
export class HomeModule { }
