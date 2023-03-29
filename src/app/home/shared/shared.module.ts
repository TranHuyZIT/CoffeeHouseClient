import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeHeaderComponent } from './layout/header.component';

@NgModule({
    imports: [CommonModule],
    declarations: [HomeHeaderComponent],
    exports: [HomeHeaderComponent],
})
export class SharedHomeModule {}
