import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "./auth.service";

export const authGuard = () => {
    const authService: AuthService = inject(AuthService);

    const router = inject(Router);
    return authService.isLoggedIn().pipe(
        map((isLoggedIn) => {
            return !isLoggedIn ? true : router.navigate(['/app/home']);
        })
    );
} 