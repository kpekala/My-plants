import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../home/profile/profile.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  public constructor(
    private authService: AuthService,
    private readonly router: Router,
    private readonly profileService: ProfileService
  ) {}

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
