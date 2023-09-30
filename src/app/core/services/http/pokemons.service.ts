import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, map, forkJoin } from 'rxjs';
import { Pokemons } from '../../interfaces/pokemons';
import { PokemonResults } from '../../interfaces/pokemon_results';
import { Pokemon } from '../../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(
    private http:HttpClient,
  ) { }

  getPokemons( offset:number ):Observable<Pokemons[]> {

    return this.http.get<PokemonResults>(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`).pipe(

      map( pokemon => pokemon.results),
      switchMap( (res:any[]) => {
        
        const arrObs = res.map( pokemon => {

          return this.http.get(pokemon.url).pipe(
            map( (pok:any) => {
              const { name, weight, base_experience, sprites, id } = pok;
              return {
                id,
                name,
                weight,
                base_experience,
                img : sprites.other.dream_world.front_default,
              }
            })
          );
        });

        return forkJoin(arrObs);
      })
    );
  }

  getPokemonByIdorName( nameOrId: string | number ):Observable<Pokemon> {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
  }
  
}
