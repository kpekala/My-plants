import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { inject } from "@angular/core";
import { map, tap } from "rxjs";


export const homeGuard = () => {
    const authService: AuthService = inject(AuthService);

    const router = inject(Router);
    return authService.isLoggedIn().pipe(
        map((isLoggedIn) => {
            return isLoggedIn ? true : router.navigate(['/auth/login']);
        })
    );
} 