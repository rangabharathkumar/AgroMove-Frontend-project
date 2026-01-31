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

    getInventoryById(id: number): Observable<Inventory> {
        return this.http.get<Inventory>(`${this.apiUrl}/${id}`);
    }

    createInventory(inventory: Partial<Inventory>): Observable<Inventory> {
        return this.http.post<Inventory>(this.apiUrl, inventory);
    }

    updateInventory(id: number, inventory: Partial<Inventory>): Observable<Inventory> {
        return this.http.put<Inventory>(`${this.apiUrl}/${id}`, inventory);
    }

    deleteInventory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
