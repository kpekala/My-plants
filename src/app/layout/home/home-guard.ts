import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { inject } from "@angular/core";
import { tap } from "rxjs";


export function homeGuard() {
    const authService: AuthService = inject(AuthService);

    const router = inject(Router);
    return authService.isLoggedIn().pipe(
        tap((isLoggedIn) => {
            return isLoggedIn ? true : router.navigate(['/app/login']);
        })
    );
} 