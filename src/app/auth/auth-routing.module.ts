import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../core/services/admin-guard.service';
import { NoAuthGuard } from '../core/services/no-auth-guard';
import { AuthComponent } from './auth.component';

const routes: Routes = [
    {
        path: 'login',
        component: AuthComponent,
        canActivate: [],
    },
    {
        path: 'register',
        component: AuthComponent,
        canActivate: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
