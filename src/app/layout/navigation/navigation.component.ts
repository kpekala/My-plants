import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from '../../auth/auth.service';
import { ProfileService } from '../home/profile/profile.service';
import { SearchStoreService } from './search.store.service';
import { ShowCookieStoreService } from 'src/app/config/show-cookie.store.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../admin/admin.service';
import { ToastService } from 'src/app/shared/toasts-container/toast.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    standalone: true,
    imports: [AppRoutingModule, ReactiveFormsModule, NgbDropdownModule],
})
export class NavigationComponent implements OnInit {
    public constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly profileService: ProfileService,
        private readonly searchStoreService: SearchStoreService,
        private readonly destroyRef: DestroyRef,
        private readonly showCookieStoreService: ShowCookieStoreService,
        private readonly adminService: AdminService,
        private readonly toastService: ToastService
    ) {}

    search = new FormControl('');
    isAdmin = signal(false);

    ngOnInit(): void {
        this.search.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((changes) => {
                this.searchStoreService.setSearch(changes);
            });
        this.adminService
            .isAdmin()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (isAdmin: boolean) => {
                    this.isAdmin.set(isAdmin);
                },
            });
    }

    onSignOutClick() {
        this.authService.signOut();
    }

    onRemoveAccount() {
        const shouldRemove = window.confirm(
            'Are you sure you want to remove your account ?'
        );
        if (shouldRemove) {
            const userToken = this.authService.getUserId();
            this.profileService.deleteProfile(userToken).subscribe({
                next: () => {
                    this.authService.removeAccount().then(() => {
                        this.toastService.success(
                            'You have successfully removed your account!'
                        );
                        this.router.navigate(['/auth']);
                    });
                },
            });
        }
    }

    onShowCookieBanner() {
        this.showCookieStoreService.setShow();
    }

    onPrivacyPolicyClick() {
        window.open(`${window.location.origin}/assets/privacy-policy.txt`);
    }
}
