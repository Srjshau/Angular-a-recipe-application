import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponseData } from './model_and_codes';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoggedIn = true;
  loading = false;
  errorMessage: string = null;
  authForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSwitchMode(): void {
    this.isLoggedIn = !this.isLoggedIn;
  }

  initializeForm(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [ Validators.required, Validators.email ]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(): void {
    if (!this.authForm.valid) {
      return;
    }

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    this.loading = true;
    let authObservable: Observable<AuthResponseData>;

    if (this.isLoggedIn) {
      authObservable = this.authService.signIn(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe(
      (response) => {
        console.log(response);
        this.loading = false;
        this.errorMessage = null;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.errorMessage = errorMessage;
        this.loading = false;
      }
    );

  }

}
