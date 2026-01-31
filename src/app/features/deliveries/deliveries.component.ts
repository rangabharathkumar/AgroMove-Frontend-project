import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../core/services/delivery.service';
import { ShipmentService } from '../../core/services/shipment.service';
import { Delivery, Shipment } from '../../shared/models/models';

@Component({
    selector: 'app-deliveries',
    templateUrl: './deliveries.component.html',
    styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {
    deliveries: Delivery[] = [];
    shipments: Shipment[] = [];
    loading = true;
    showCreateForm = false;

    newDelivery: Partial<Delivery> = {
        shipmentId: 0,
        scheduledDate: '',
        deliveryStatus: 'SCHEDULED',
        driverName: '',
        vehicleNumber: '',
        notes: ''
    };

    constructor(
        private deliveryService: DeliveryService,
        private shipmentService: ShipmentService
    ) { }

    ngOnInit(): void {
        this.loadDeliveries();
        this.loadShipments();
    }

    loadDeliveries(): void {
        this.loading = true;
        this.deliveryService.getAllDeliveries().subscribe({
            next: (data) => {
                this.deliveries = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading deliveries:', err);
                this.loading = false;
            }
        });
    }

    loadShipments(): void {
        this.shipmentService.getAllShipments().subscribe({
            next: (data) => {
                this.shipments = data;
            },
            error: (err) => console.error('Error loading shipments:', err)
        });
    }

    createDelivery(): void {
        this.deliveryService.createDelivery(this.newDelivery).subscribe({
            next: () => {
                this.showCreateForm = false;
                this.resetForm();
                this.loadDeliveries();
            },
            error: (err) => console.error('Error creating delivery:', err)
        });
    }

    resetForm(): void {
        this.newDelivery = {
            shipmentId: 0,
            scheduledDate: '',
            deliveryStatus: 'SCHEDULED',
            driverName: '',
            vehicleNumber: '',
            notes: ''
        };
    }

    markAsCompleted(id: number): void {
        this.deliveryService.markAsCompleted(id).subscribe({
            next: () => this.loadDeliveries(),
            error: (err) => console.error('Error marking delivery as completed:', err)
        });
    }
}
