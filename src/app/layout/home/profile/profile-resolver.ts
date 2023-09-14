import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router"
import { Observable } from "rxjs"
import { ProfileService } from "./profile.service"
import { inject } from "@angular/core"


export const profileResolver: ResolveFn<any> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any => {
    const profileService = inject(ProfileService);
    
    return profileService.getProfile();
}