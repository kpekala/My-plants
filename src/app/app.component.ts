import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import {
    NgcCookieConsentService,
    NgcStatusChangeEvent,
} from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { ShowCookieStoreService } from './config/show-cookie.store.service';
import { cookieConfig } from './config/cookie-consent';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    private statusChangeSubscription!: Subscription;

    private ccService = inject(NgcCookieConsentService);
    private readonly cookieConsentKey = 'cookie-consent';

    constructor(
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly showCookieStoreService: ShowCookieStoreService
    ) {}

    ngOnInit() {
        const key = localStorage.getItem(this.cookieConsentKey);
        if (key !== null && key === '1') {
            console.log('Siema');
            this.ccService.destroy();
        }
        this.showCookieStoreService.show$.subscribe({
            next: () => {
                localStorage.removeItem(this.cookieConsentKey);
                this.ccService.init(cookieConfig);
                this.ccService.open();
            },
        });
        this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
            (event: NgcStatusChangeEvent) => {
                if (event.status === 'allow')
                    localStorage.setItem(this.cookieConsentKey, '1');
                else {
                    localStorage.setItem(this.cookieConsentKey, '0');
                    if (this.router.url.includes('app')) {
                        this.authService.signOut();
                        this.router.navigate(['/auth']);
                    }
                }
            }
        );
    }

    ngOnDestroy() {
        this.statusChangeSubscription.unsubscribe();
    }
}
