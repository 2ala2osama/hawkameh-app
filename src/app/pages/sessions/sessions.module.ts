import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionsRoutingModule } from './sessions-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    SessionsRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
})
export class SessionsModule {}
