import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, User } from '../../shared/models/models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.currentUserSubject.next(JSON.parse(storedUser));
        }
    }

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials)
            .pipe(
                tap(response => {
                    const user: User = {
                        id: response.id,
                        username: response.username,
                        email: response.email,
                        role: (response.roles && response.roles.includes('MANAGER')) ? 'MANAGER' : 'USER'
                    };
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                })
            );
    }

    register(userData: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/auth/signup`, userData);
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    hasRole(role: 'MANAGER' | 'USER'): boolean {
        const user = this.getCurrentUser();
        return user?.role === role;
    }
}
