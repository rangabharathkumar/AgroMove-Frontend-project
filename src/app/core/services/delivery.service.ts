import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Delivery } from '../../shared/models/models';

@Injectable({
    providedIn: 'root'
})
export class DeliveryService {
    private apiUrl = `${environment.apiUrl}/deliveries`;

    constructor(private http: HttpClient) { }

    getAllDeliveries(): Observable<Delivery[]> {
        return this.http.get<Delivery[]>(this.apiUrl);
    }

    getDeliveryById(id: number): Observable<Delivery> {
        return this.http.get<Delivery>(`${this.apiUrl}/${id}`);
    }

    getDeliveriesByShipment(shipmentId: number): Observable<Delivery[]> {
        return this.http.get<Delivery[]>(`${this.apiUrl}/shipment/${shipmentId}`);
    }

    createDelivery(delivery: Partial<Delivery>): Observable<Delivery> {
        return this.http.post<Delivery>(this.apiUrl, delivery);
    }

    updateDelivery(id: number, delivery: Partial<Delivery>): Observable<Delivery> {
        return this.http.put<Delivery>(`${this.apiUrl}/${id}`, delivery);
    }

    deleteDelivery(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
