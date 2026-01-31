import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-status-badge',
    template: `
    <span [class]="getBadgeClass()" class="px-3 py-1 rounded-full text-xs font-medium">
      {{ status }}
    </span>
  `,
    styles: []
})
export class StatusBadgeComponent {
    @Input() status: string = '';

    getBadgeClass(): string {
        const statusLower = this.status.toLowerCase();

        if (statusLower === 'pending' || statusLower === 'scheduled') {
            return 'bg-yellow-100 text-yellow-800';
        } else if (statusLower === 'in_transit' || statusLower === 'in transit' || statusLower === 'in_progress' || statusLower === 'in progress') {
            return 'bg-blue-100 text-blue-800';
        } else if (statusLower === 'delivered' || statusLower === 'completed') {
            return 'bg-green-100 text-green-800';
        } else if (statusLower === 'cancelled') {
            return 'bg-red-100 text-red-800';
        } else {
            return 'bg-gray-100 text-gray-800';
        }
    }
}
