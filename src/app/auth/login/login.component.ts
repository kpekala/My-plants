import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    Router,
} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/layout/home/profile/profile.service';
import { ToastService } from 'src/app/shared/toasts-container/toast.service';

@Component({
    selector: 'app-register',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    authForm: FormGroup;
    isLoading = false;
    isLoginView = true;

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly profileService: ProfileService,
        private readonly toastService: ToastService
    ) {}

    ngOnInit(): void {
        this.reloadForm();
    }

    reloadForm() {
        this.authForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });

        if (!this.isLoginView) {
            this.authForm.addControl(
                'username',
                new FormControl('', Validators.required)
            );
            this.authForm.addControl(
                'acceptPolicy',
                new FormControl(false, Validators.requiredTrue)
            );
        }
    }

    onAuthButtonClicked() {
        this.isLoading = true;

        if (!this.isLoginView) {
            this.onRegisterButtonClicked();
        } else {
            this.onLoginButtonClicked();
        }
    }

    onRegisterButtonClicked() {
        const email = this.authForm.get('email').value;
        const password = this.authForm.get('password').value;
        const username = this.authForm.get('username').value;
        this.authService
            .register(email, password)
            .then(async () => {
                const userToken = this.authService.getUserId();
                this.profileService
                    .createProfile(userToken, username, email)
                    .subscribe({
                        next: () => {
                            this.isLoading = false;
                            this.authForm.reset();
                            this.toastService.success(
                                'You have successfully created an account!'
                            );
                            this.router.navigate(['app/home']);
                        },
                    });
            })
            .catch((error) => {
                this.toastService.error('Failed to sign up!');
                this.isLoading = false;
            });
    }

    onLoginButtonClicked() {
        this.isLoading = true;
        const email = this.authForm.get('email').value;
        const password = this.authForm.get('password').value;
        this.authService
            .login(email, password)
            .then(() => {
                this.authForm.reset();
                this.toastService.success('You are now logged in!');
                this.router.navigate(['app/home']);
                this.isLoading = false;
            })
            .catch((error) => {
                this.toastService.error('Failed to log in!');
                this.isLoading = false;
            });
    }

    onChangeLoginType() {
        this.isLoginView = !this.isLoginView;
        this.reloadForm();
    }

    onPrivacyPolicyClick() {
        window.open(`${window.location.origin}/assets/privacy-policy.txt`);
    }
}
