import { Component } from '@angular/core';

@Component({
  selector    : 'app-numbers',
  templateUrl : './numbers.component.html',
  styleUrls   : ['./numbers.component.scss']
})
export class NumbersComponent {

  isLoading : boolean = false;
  numbers   : string = '';
  numRepeat : [string, number][];

  counterNumberAndOrderDesc(): void {

    const numeros = this.numbers.split(',').map(Number);
  
    const conteo: { [numero: number]: number } = {};
  
    for (const numero of numeros) {

      
      if (isNaN(numero)) {
        console.error(`"${numero}" no es un número válido.`);
      } else {
        conteo[numero] = (conteo[numero] || 0) + 1;
      }
    }
  
    this.numRepeat = Object.entries(conteo);

    this.numRepeat.sort((a, b) => Number(b[0]) - Number(a[0]));
  }
  
}
