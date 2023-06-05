import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private firebase: FirebaseService
  ) {}

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.auth.login(email, password).subscribe(
      (data: any) => {
        const expirationDate = new Date(
          new Date().getTime() + data.expiresIn * 1000
        );

        this.auth.createUser(
          data.email,
          data.localId,
          data.idToken,
          expirationDate
        );

        console.log(this.auth.user);
        localStorage.setItem('user', JSON.stringify(this.auth.user));
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.log(error);
        // Mostra un messaggio di errore con l'errore
        this.snackBar.open(error.error.error.message, 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    );

    form.reset();
  }
}
