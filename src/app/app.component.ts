import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    const userJson = localStorage.getItem('user');

    if (userJson) {
      const user = JSON.parse(userJson);
      const { email, id, _token, _expirationDate } = user;

      if (email && id && _token && _expirationDate) {
        this.authService.createUser(email, id, _token, _expirationDate);
      } else {
        console.error('Dati utente mancanti o non validi');
      }
    }
  }
  title = 'angular-project';
}
