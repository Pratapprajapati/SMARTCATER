import { CommonModule } from '@angular/common';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { LoginService } from '../../data-access/api/login.service';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../data-access/interface/i-user';
import { userDefaultValue } from '../../data-access/model/user-list';
import { Subject, takeUntil } from 'rxjs';
import { IResponseDto } from '../../data-access/interface/i-response-dto';
@Component({
  selector: 'app-login',
  imports: [
    DialogModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  user: IUser;

  @Output() loginCompleteEvent = new EventEmitter<boolean>();

  showRegisterPopup = false;
  showLoginPopup = false;
  isLoggedIn = false;

  private _unsubscribe = new Subject<void>();

  constructor(
    private loginservice: LoginService,
    private cd: ChangeDetectorRef
  ) {
    this.user = userDefaultValue;
  }

  onHideLogin(value): void {
    this.loginCompleteEvent.emit(value);
  }
  ngOnInit(): void {
    // this.checkLoginStatus();
    this.checkAlreadyLogin();
  }

  // checkLoginStatus() {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     this.isLoggedIn = !!token;
  //   }
  // }

  ngAfterViewInit(): void {
    // this.showRegisterPopup = true;
  }

  openLoginPopup() {
    this.showRegisterPopup = false;
    this.showLoginPopup = true;
    this.isLoggedIn = false;
  }

  openRegisterPopup() {
    this.showLoginPopup = false;
    this.showRegisterPopup = true;
    this.isLoggedIn = false;
  }

  // Close Dialog Boxes
  onHideDialog() {
    this.showRegisterPopup = false;
    this.showLoginPopup = false;
  }

  // Register API Call
  registerUser() {
    this.loginservice.register(this.user).subscribe({
      next: (response) => {
        alert('Registration Successful! 🎉');
        this.openLoginPopup(); // Show login popup after successful registration
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }

  // Login API Call
  loginUser() {
    this.loginservice
      .login(this.user)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe({
        next: (response: IResponseDto) => {
          // Store token and user details in localStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userName', response.data.username);
          localStorage.setItem('userId', response.data.id);
          alert(response.message);
          this.onHideDialog(); // Close the dialog box after login
          // window.location.reload(); // Refresh to update navbar with logged-in username
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
  }

  // Logout Functionality
  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    window.location.reload(); // Refresh page after logout
  }

  admin = { username: '', password: '' };
  showAdminLoginPopup = false;

  openAdminLoginPopup() {
    this.showAdminLoginPopup = true;
  }

  adminLogin() {
    this.loginservice.adminLogin(this.admin).subscribe({
      next: (response) => {
        alert('Admin Login Successful! ✅');
        localStorage.setItem('adminToken', response.data.token);
        this.showAdminLoginPopup = false;
        window.location.href = '/admin'; // Redirect to Admin Page
      },
      error: (err) => {
        alert('Admin Login Failed: ' + err.error.message);
      },
    });
  }

  checkAlreadyLogin(): void {
    const tokenValue: string = localStorage.getItem('token');
    if (!tokenValue) {
      this.showRegisterPopup = true;
    } else
      this.loginservice
        .checkTokenExist()
        .pipe(takeUntil(this._unsubscribe))
        .subscribe((res) => {
          this.isLoggedIn = res.data;
          if (this.isLoggedIn) {
            this.onHideDialog();
          } else {
          }
          this.cd.detectChanges();
        });
  }
}
