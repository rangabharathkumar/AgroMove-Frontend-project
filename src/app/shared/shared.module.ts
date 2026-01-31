import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner.component';
import { StatusBadgeComponent } from './components/status-badge.component';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        StatusBadgeComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LoadingSpinnerComponent,
        StatusBadgeComponent,
        CommonModule
    ]
})
export class SharedModule { }
