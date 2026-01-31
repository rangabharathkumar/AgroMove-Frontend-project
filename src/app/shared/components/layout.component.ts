import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/models/models';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
    currentUser: User | null = null;
    isSidebarOpen = window.innerWidth >= 1024;
    windowWidth = window.innerWidth;

    menuItems = [
        { icon: 'home', label: 'Dashboard', route: '/app/dashboard' },
        { icon: 'truck', label: 'Shipments', route: '/app/shipments' },
        { icon: 'package', label: 'Inventory', route: '/app/inventory' },
        { icon: 'calendar', label: 'Deliveries', route: '/app/deliveries' }
    ];

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.authService.currentUser$.subscribe(user => {
            this.currentUser = user;
        });
    }

    toggleSidebar(): void {
        this.isSidebarOpen = !this.isSidebarOpen;
    }

    closeSidebarOnMobile(): void {
        if (window.innerWidth < 768) {
            this.isSidebarOpen = false;
        }
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    getIcon(iconName: string): string {
        const icons: { [key: string]: string } = {
            'home': '🏠',
            'truck': '🚚',
            'package': '📦',
            'calendar': '📅',
            'leaf': '🌿'
        };
        return icons[iconName] || '•';
    }
}
