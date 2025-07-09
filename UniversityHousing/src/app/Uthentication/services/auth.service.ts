import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import {decodeToken} from '@okta/okta-auth-js';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string = environment.baseUrl;
  private headers=new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`})
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$ = this.authStatus.asObservable();



  constructor(private http: HttpClient, private router: Router) {

  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}api/auth/authenticate`;
    return this.http.post<any>(url, {email: email, password: password});
  }

  register(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}api/auth/register`;
    return this.http.post<any>(url, {email: email, password: password});
  }

  logout(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.post(`${this.BASE_URL}api/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).subscribe({
        next: () => {
          console.log('Logout success');
          localStorage.clear();
          this.authStatus.next(false);
          this.router.navigate(['/login']);
        }, error: (err) => {
          console.error('Logout failed:');
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }


  public getDataFromToken(token: string): void {
    localStorage.setItem('token', token);
    const decode = this.decodeToken(token);
    localStorage.setItem("id", String(decode?.id ?? ''));
    localStorage.setItem("email", String(decode?.sub ?? ''));
    localStorage.setItem("role", String(decode?.role ?? ''));
    localStorage.setItem("exp", String(decode?.exp ?? ''));
    console.log(decode?.sub)

    this.authStatus.next(true);
  }

  public changePassword(request:ChangePasswordRequest): Observable<{message:string}>{
    return this.http.patch<{message:string}>(`${this.BASE_URL}api/student/changePassword`, request,{headers:this.headers})
  }


  isAdmin(): boolean {
    if (typeof localStorage !== "undefined") {
      const role = localStorage.getItem("role");
      return role === 'ADMIN'
    }
    return false;
  }

  isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined') {

      const token = localStorage.getItem('token');

      if (token === undefined || token === null) {
        return false;
      }

      console.log(this.isTokenExpired())
      if (this.isTokenExpired()) {
        this.logout();
        return false;
      }
      return true;
    }
    return false
  }

  private isTokenExpired(): boolean {
    const now = Math.floor(Date.now() / 1000);
    const getExpiration = +localStorage.getItem("exp")!;
    return now > getExpiration;
  }

  private decodeToken(token: string): JwtPayload | null {
    if (token == null) return null;
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }

  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  goToAdminPage(): boolean {
    return this.isAdmin();
  }
}


export interface ChangePasswordRequest {
  currentPassword:string,
  newPassword:string,
  confirmPassword:string
}
interface JwtPayload {
  "sub": string,
  "iat": number,
  "exp": number,
  "role": string,
  "id": number
}
