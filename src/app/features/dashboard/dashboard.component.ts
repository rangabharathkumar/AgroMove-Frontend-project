import { Component, OnInit } from '@angular/core';
import { ShipmentService } from '../../core/services/shipment.service';
import { InventoryService } from '../../core/services/inventory.service';
import { Shipment, Inventory } from '../../shared/models/models';

interface DashboardStats {
    totalShipments: number;
    activeDeliveries: number;
    lowStockItems: number;
    totalInventory: number;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    loading = true;
    stats: DashboardStats = {
        totalShipments: 0,
        activeDeliveries: 0,
        lowStockItems: 0,
        totalInventory: 0
    };
    recentShipments: Shipment[] = [];
    lowStockInventory: Inventory[] = [];

    constructor(
        private shipmentService: ShipmentService,
        private inventoryService: InventoryService
    ) { }

    ngOnInit(): void {
        this.loadDashboardData();
    }

    loadDashboardData(): void {
        this.loading = true;

        // Load shipments
        this.shipmentService.getAllShipments().subscribe({
            next: (shipments) => {
                this.stats.totalShipments = shipments.length;
                this.stats.activeDeliveries = shipments.filter(s => s.status === 'IN_TRANSIT').length;
                this.recentShipments = shipments.slice(0, 5);
            },
            error: (err) => console.error('Error loading shipments:', err)
        });

        // Load inventory
        this.inventoryService.getAllInventory().subscribe({
            next: (inventory) => {
                this.stats.totalInventory = inventory.length;
                this.lowStockInventory = inventory.filter(item => item.quantity <= 20).slice(0, 5);
                this.stats.lowStockItems = inventory.filter(item => item.quantity <= 20).length;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading inventory:', err);
                this.loading = false;
            }
        });
    }
}
