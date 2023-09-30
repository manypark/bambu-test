import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, debounceTime } from 'rxjs';
import { Pokemon } from 'src/app/core/interfaces/pokemon';
import { Pokemons } from 'src/app/core/interfaces/pokemons';
import { PokemonsService } from 'src/app/core/services/http/pokemons.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector    : 'app-pokemons',
  templateUrl : './pokemons.component.html',
  styleUrls   : ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit, AfterViewInit {

  listPokemons? :Pokemons[];
  pokemon?      :Pokemon;
  offsetLocal   :number = 0;
  isLoading     :boolean = false;
  value         :string = '';
  @ViewChild('searchByName') searchName?: ElementRef;

  constructor(
    private readonly pokemonServices: PokemonsService,
    private readonly toastServices  : ToastService,
  ) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  ngAfterViewInit(): void {
    this.searchPokemonByName();
  }

  getPokemons( offsetFromDom:number = 0 ) {

    this.offsetLocal += offsetFromDom;
    this.isLoading = true;

    this.pokemonServices.getPokemons(this.offsetLocal).subscribe( pokemons => {
      this.listPokemons = pokemons;
      this.isLoading = false;
    });
  }

  searchPokemonByName() {

    fromEvent(this.searchName?.nativeElement, 'keyup').pipe(
      debounceTime(500),
    ).subscribe( (text:any) => {

      this.value = '';

      if(text.target.value == '' ) {
        this.pokemon = undefined;
        this.getPokemons();
        return;
      }
      
      this.value += text.target.value;

      this.getPokemonByIdorName();
    });

  }

  getPokemonByIdorName() {

    this.isLoading = true;

    this.pokemonServices.getPokemonByIdorName(this.value).subscribe( pokemon => {
      this.pokemon = pokemon;
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
      if(err.error == 'Not Found') {
        this.toastServices.openErrorSnakcBar('Error en petición', 'No se encontro este pokemon');
      }

    });
  }

}
