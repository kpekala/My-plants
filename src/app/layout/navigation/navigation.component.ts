import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from '../../auth/auth.service';
import { ProfileService } from '../home/profile/profile.service';
import { SearchStoreService } from './search.store.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [AppRoutingModule, ReactiveFormsModule],
})
export class NavigationComponent implements OnInit {
  public constructor(
    private authService: AuthService,
    private readonly router: Router,
    private readonly profileService: ProfileService,
    private readonly searchStoreService: SearchStoreService,
    private readonly destroyRef: DestroyRef
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
      this.authService.removeAccount().then((result) => {
        this.profileService.deleteProfile(userToken).subscribe({
          next: () => {
            this.router.navigate(['/auth']);
          },
        });
      });
    }
  }
}
