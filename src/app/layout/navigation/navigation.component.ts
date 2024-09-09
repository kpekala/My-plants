import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from '../../auth/auth.service';
import { ProfileService } from '../home/profile/profile.service';
import { SearchStoreService } from './search.store.service';
import { ShowCookieStoreService } from 'src/app/config/show-cookie.store.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    standalone: true,
    imports: [AppRoutingModule, ReactiveFormsModule, NgbDropdownModule],
})
export class NavigationComponent implements OnInit {
    public constructor(
        private authService: AuthService,
        private readonly router: Router,
        private readonly profileService: ProfileService,
        private readonly searchStoreService: SearchStoreService,
        private readonly destroyRef: DestroyRef,
        private readonly showCookieStoreService: ShowCookieStoreService,
        private readonly activatedRoute: ActivatedRoute
    ) {}

    search = new FormControl('');

    ngOnInit(): void {
        this.search.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((changes) => {
                this.searchStoreService.setSearch(changes);
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
