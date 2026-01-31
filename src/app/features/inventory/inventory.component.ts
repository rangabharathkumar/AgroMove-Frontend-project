import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../core/services/inventory.service';
import { Inventory } from '../../shared/models/models';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
    inventory: Inventory[] = [];
    loading = true;
    updatingId: number | null = null;

    constructor(private inventoryService: InventoryService) { }

    ngOnInit(): void {
        this.loadInventory();
    }

    loadInventory(): void {
        this.loading = true;
        this.inventoryService.getAllInventory().subscribe({
            next: (data) => {
                this.inventory = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading inventory:', err);
                this.loading = false;
            }
        });
    }

    getStockLevel(quantity: number): string {
        if (quantity <= 10) return 'critical';
        if (quantity <= 20) return 'low';
        return 'good';
    }

    getStockColor(quantity: number): string {
        if (quantity <= 10) return 'text-red-600 bg-red-100';
        if (quantity <= 20) return 'text-amber-600 bg-amber-100';
        return 'text-green-600 bg-green-100';
    }

    updateQuantity(id: number, newQuantity: number): void {
        const item = this.inventory.find(i => i.id === id);
        if (!item) return;

        this.updatingId = id;
        const updatedItem = { ...item, quantity: newQuantity };
        this.inventoryService.updateInventory(id, updatedItem).subscribe({
            next: () => {
                this.loadInventory();
                this.updatingId = null;
            },
            error: (err) => {
                console.error('Error updating inventory:', err);
                this.updatingId = null;
            }
        });
    }
}
