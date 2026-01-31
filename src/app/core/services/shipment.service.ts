import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Shipment } from '../../shared/models/models';

@Injectable({
    providedIn: 'root'
})
export class ShipmentService {
    private apiUrl = `${environment.apiUrl}/shipments`;

    constructor(private http: HttpClient) { }

    getAllShipments(status?: string): Observable<Shipment[]> {
        let params = new HttpParams();
        if (status) {
            params = params.set('status', status);
        }
        return this.http.get<Shipment[]>(this.apiUrl, { params });
    }

    getShipmentById(id: number): Observable<Shipment> {
        return this.http.get<Shipment>(`${this.apiUrl}/${id}`);
    }

    createShipment(shipment: Partial<Shipment>): Observable<Shipment> {
        return this.http.post<Shipment>(this.apiUrl, shipment);
    }

    updateShipment(id: number, shipment: Partial<Shipment>): Observable<Shipment> {
        return this.http.put<Shipment>(`${this.apiUrl}/${id}`, shipment);
    }

    deleteShipment(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
