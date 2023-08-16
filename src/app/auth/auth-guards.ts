import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { AuthService } from "./auth.service";

export function authGuard() {
    const authService: AuthService = inject(AuthService);

    const router = inject(Router);
    return authService.isLoggedIn().pipe(
        tap((isLoggedIn) => {
            return !isLoggedIn ? true : router.navigate(['/app/home']);
        })
    );
} 