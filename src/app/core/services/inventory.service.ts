import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Inventory } from '../../shared/models/models';

@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    private apiUrl = `${environment.apiUrl}/inventory`;

    constructor(private http: HttpClient) { }

    getAllInventory(): Observable<Inventory[]> {
        return this.http.get<Inventory[]>(this.apiUrl);
    }

    getInventoryByLocation(location: string): Observable<Inventory[]> {
        return this.http.get<Inventory[]>(`${this.apiUrl}/location/${location}`);
    }

    getInventoryById(id: number): Observable<Inventory> {
        return this.http.get<Inventory>(`${this.apiUrl}/${id}`);
    }

    updateInventory(id: number, quantity: number): Observable<Inventory> {
        return this.http.patch<Inventory>(`${this.apiUrl}/${id}`, null, {
            params: { quantity: quantity.toString() }
        });
    }

    getLowStockItems(threshold: number = 10): Observable<Inventory[]> {
        return this.http.get<Inventory[]>(`${this.apiUrl}/low-stock`, {
            params: { threshold: threshold.toString() }
        });
    }
}
