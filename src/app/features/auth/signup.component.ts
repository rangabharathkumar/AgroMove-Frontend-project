import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    signupForm: FormGroup;
    loading = false;
    error = '';
    success = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.signupForm = this.fb.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            fullName: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            role: ['USER'] // Always USER for public signup
        });
    }

    onSubmit(): void {
        if (this.signupForm.invalid) {
            return;
        }

        this.loading = true;
        this.error = '';

        this.authService.register(this.signupForm.value).subscribe({
            next: () => {
                this.success = true;
                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 2000);
            },
            error: (err) => {
                this.error = err.error?.message || 'Registration failed. Please try again.';
                this.loading = false;
            }
        });
    }

    navigateToLogin(): void {
        this.router.navigate(['/login']);
    }
}
