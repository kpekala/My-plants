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

  private ccService: null | NgcCookieConsentService;
  private readonly cookieConsentKey = 'cookie-consent';

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly showCookieStoreService: ShowCookieStoreService
  ) {
    const cookieConsent = localStorage.getItem(this.cookieConsentKey);
    if (cookieConsent != null && cookieConsent === '1') return;
    this.ccService = inject(NgcCookieConsentService);
  }

  ngOnInit() {
    this.showCookieStoreService.show$.subscribe({
      next: () => {
        localStorage.removeItem(this.cookieConsentKey);
        if (!this.ccService) this.ccService = inject(NgcCookieConsentService);
        this.ccService.init(cookieConfig);
      },
    });

    if (!this.ccService) return;

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
