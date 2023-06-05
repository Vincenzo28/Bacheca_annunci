import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLogged) {
      return true; // Utente autenticato, consenti la navigazione
    } else {
      this.router.navigate(['/login']); // Utente non autenticato, reindirizza alla pagina di login
      return false; // Impedisce la navigazione
    }
  }
}
