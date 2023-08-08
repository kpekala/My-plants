import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import { tap } from "rxjs";


export function authGuard() {
    const authService: AuthService = inject(AuthService);

    const router = inject(Router);
    authService.isLoggedIn().subscribe();
    return authService.isLoggedIn().pipe(
        tap((isLoggedIn) => {
            return isLoggedIn ? true : router.navigate(['/app/login']);
        })
    );
} 