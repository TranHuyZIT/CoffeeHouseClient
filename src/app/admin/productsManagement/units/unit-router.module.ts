import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/core/services/admin-guard.service';
import { UnitComponent } from './unit.component';

const routes = [
    {
        path: '',
        component: UnitComponent,
        caActivate: [AdminGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TooppingRoutingModule {}
