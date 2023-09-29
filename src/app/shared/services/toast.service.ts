import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private readonly toastr   : ToastrService,
  ) { }

  openSuccessSnakcBar( title?:string, subtitle?:string ) {

    this.toastr.success(title, subtitle, {
      timeOut     : 3000,
      closeButton : true,
      progressBar : true,
    });

  }

  openErrorSnakcBar( title?:string, subtitle?:string ) {

    this.toastr.error(title, subtitle, {
      timeOut     : 3000,
      closeButton : true,
      progressBar : true,
    });

  }

}
