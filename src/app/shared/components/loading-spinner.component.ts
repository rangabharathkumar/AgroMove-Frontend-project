import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="flex justify-center items-center" [class.h-screen]="fullScreen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  `,
  styles: []
})
export class LoadingSpinnerComponent {
  @Input() fullScreen = false;
}
