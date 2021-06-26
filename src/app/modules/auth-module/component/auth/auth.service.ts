import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseData, ErrorCodes } from './model_and_codes';
import { User } from './user.modal';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private tokenExpirationTimer: any;
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) { }

    private handleError(errorResponse: HttpErrorResponse): Observable<AuthResponseData> {
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError('An Unknown error occured!');
        }
        return throwError(ErrorCodes[errorResponse.error.error.message]);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number): void {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    signIn(email: string, password: string): Observable<AuthResponseData> {
        return this.http
            .post<AuthResponseData>(environment.signinEndPoint, { email, password, returnSecureToken: true })
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                })
            );
    }

    signUp(email: string, password: string): Observable<AuthResponseData> {
        return this.http
            .post<AuthResponseData>(environment.signupEndPoint, { email, password, returnSecureToken: true })
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                })
            );
    }

    autoLogin(): void {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout(): void {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
    }

    autoLogout(expirationDuration: number): void {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

}
