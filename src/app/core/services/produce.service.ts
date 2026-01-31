import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Produce } from '../../shared/models/models';

@Injectable({
    providedIn: 'root'
})
export class ProduceService {
    private apiUrl = `${environment.apiUrl}/produce`;

    constructor(private http: HttpClient) { }

    getAllProduce(): Observable<Produce[]> {
        return this.http.get<Produce[]>(this.apiUrl);
    }

    getProduceById(id: number): Observable<Produce> {
        return this.http.get<Produce>(`${this.apiUrl}/${id}`);
    }

    getProduceByCategory(category: string): Observable<Produce[]> {
        return this.http.get<Produce[]>(`${this.apiUrl}/category/${category}`);
    }

    createProduce(produce: Partial<Produce>): Observable<Produce> {
        return this.http.post<Produce>(this.apiUrl, produce);
    }

    updateProduce(id: number, produce: Partial<Produce>): Observable<Produce> {
        return this.http.put<Produce>(`${this.apiUrl}/${id}`, produce);
    }

    deleteProduce(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
