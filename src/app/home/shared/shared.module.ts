import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DragDirective } from './dragDrop.directive';
import { HomeHeaderComponent } from './layout/header.component';
import { ShowAdminDirective } from './showAdmin.directive';
import { ShowAuthedDirective } from './showAuth.directive';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [
        HomeHeaderComponent,
        DragDirective,
        ShowAuthedDirective,
        ShowAdminDirective,
    ],
    exports: [
        HomeHeaderComponent,
        DragDirective,
        ShowAuthedDirective,
        ShowAdminDirective,
    ],
})
export class SharedHomeModule {}
