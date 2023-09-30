import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    CoreModule,
  ],
})

export class RegisterModule { }
