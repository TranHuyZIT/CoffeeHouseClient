import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/core/services/admin-guard.service';
import { AccountComponent } from './accounts.component';

const routes = [
    {
        path: '',
        component: AccountComponent,
        caActivate: [AdminGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountRoutingModule {}
