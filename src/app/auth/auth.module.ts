import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { NoAuthGuard } from '../core/services/no-auth-guard';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// MATERIAL COMPONENTS
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../core/services/auth.service';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        AuthRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatRadioModule,
        MatFormFieldModule,
    ],
    declarations: [AuthComponent],
    providers: [],
})
export class AuthModule {}
