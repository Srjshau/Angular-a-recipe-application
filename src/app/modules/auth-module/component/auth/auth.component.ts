import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/modules/shared-module/components/alert/alert.component';
import { PlaceholderDirective } from 'src/app/modules/shared-module/components/placeholder/placeholder.directive';
import { AuthService } from './auth.service';
import { AuthResponseData } from './model_and_codes';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoggedIn = true;
  loading = false;
  errorMessage: string = null;
  authForm: FormGroup;
  private closeSubscription: Subscription;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSwitchMode(): void {
    this.isLoggedIn = !this.isLoggedIn;
  }

  initializeForm(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
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
        this.showErrorAlert(errorMessage);
        // this.errorMessage = errorMessage;
        this.loading = false;
      }
    );

  }

  handleClose(): void {
    this.errorMessage = null;
  }

  // Dynamic Component - Imperative Approach
  private showErrorAlert(errMsg: string): void {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

    componentRef.instance.message = errMsg;
    this.closeSubscription = componentRef.instance.closeEvent.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

}
