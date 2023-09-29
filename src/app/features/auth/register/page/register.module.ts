import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { MaterialModule } from 'src/app/core/material/material.module';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    
    MaterialModule,
  ],
  providers: [
    provideNgxMask(),
  ]
})

export class RegisterModule { }
