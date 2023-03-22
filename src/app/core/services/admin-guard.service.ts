import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class AdminGuard {
    constructor(private authService: AuthService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.isAdmin.pipe(take(1));
    }
}
