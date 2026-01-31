import { Component, OnInit } from '@angular/core';
import { ShipmentService } from '../../core/services/shipment.service';
import { Shipment } from '../../shared/models/models';

@Component({
    selector: 'app-shipments',
    templateUrl: './shipments.component.html',
    styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent implements OnInit {
    shipments: Shipment[] = [];
    filteredShipments: Shipment[] = [];
    loading = true;
    selectedStatus = '';
    searchTerm = '';
    showCreateForm = false;

    newShipment: Partial<Shipment> = {
        origin: '',
        destination: '',
        produceType: '',
        quantity: 0,
        status: 'PENDING',
        estimatedDelivery: ''
    };

    constructor(private shipmentService: ShipmentService) { }

    ngOnInit(): void {
        this.loadShipments();
    }

    loadShipments(): void {
        this.loading = true;
        this.shipmentService.getAllShipments().subscribe({
            next: (data) => {
                this.shipments = data;
                this.applyFilters();
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading shipments:', err);
                this.loading = false;
            }
        });
    }

    applyFilters(): void {
        this.filteredShipments = this.shipments.filter(shipment => {
            const matchesStatus = !this.selectedStatus || shipment.status === this.selectedStatus;
            const matchesSearch = !this.searchTerm ||
                shipment.origin.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                shipment.destination.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                shipment.produceType.toLowerCase().includes(this.searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }

    onStatusFilterChange(): void {
        this.applyFilters();
    }

    onSearchChange(): void {
        this.applyFilters();
    }

    createShipment(): void {
        this.shipmentService.createShipment(this.newShipment).subscribe({
            next: () => {
                this.showCreateForm = false;
                this.resetForm();
                this.loadShipments();
            },
            error: (err) => console.error('Error creating shipment:', err)
        });
    }

    resetForm(): void {
        this.newShipment = {
            origin: '',
            destination: '',
            produceType: '',
            quantity: 0,
            status: 'PENDING',
            estimatedDelivery: ''
        };
    }

    updateStatus(id: number, newStatus: string): void {
        this.shipmentService.updateStatus(id, newStatus).subscribe({
            next: () => this.loadShipments(),
            error: (err) => console.error('Error updating status:', err)
        });
    }
}
