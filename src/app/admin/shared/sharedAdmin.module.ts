import { NgModule } from '@angular/core';
import { HeaderLayoutComponent } from './layout/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { DragDirective } from './dragDrop.directive';
@NgModule({
    imports: [MatToolbarModule, MatIconModule, RouterModule],
    declarations: [HeaderLayoutComponent, DragDirective],
    exports: [HeaderLayoutComponent, DragDirective],
})
export class SharedAdmin {}
