import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private readonly _snackBar: MatSnackBar,
  ) { }

  openSuccessSnakcBar( title?:string, subtitle?:string ) {

    this._snackBar.open( title, subtitle ,{
      duration          : 3000,
      horizontalPosition: 'right',
      verticalPosition  : 'top',
    });
  }

  openErrorSnakcBar(  title?:string, subtitle?:string ) {

    this._snackBar.open( title, subtitle , {
      duration          : 3000,
      horizontalPosition: 'right',
      verticalPosition  : 'top'
    });

  }

}
