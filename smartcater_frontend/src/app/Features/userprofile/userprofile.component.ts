import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../../data-access/api/menu.service';
import { Subject, takeUntil } from 'rxjs';
import { IResponseDto } from '../../data-access/interface/i-response-dto';
import { IMenuModel } from '../../data-access/interface/i-menumodel';
@Component({
  selector: 'app-userprofile',
  imports: [CommonModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss',
})
export class UserprofileComponent implements OnInit {
  userName: string | null = null;
  userEmail: string | null = null;
  isLoggedIn = false;

  upcomingOrders: any[] = []; // Array to store upcoming orders
  isLoadingOrders = false; // Loading state for orders
  errorMessage: string | null = null; // Error message for API failures
  data: any;
  isPackageVisible = false;

  private _unsubscribe = new Subject<void>(); // Initialize Subject for unsubscribing

  constructor(
    private menuService: MenuService // Inject MenuService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.checkLoginStatus();
    // this.getAllOrders();
    this.fetchUpcomingOrders();
  }
  /**
   * Api call for all order getting
   */
  getAllOrders(): void {
    this.menuService
      .getOrders()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((response) => {
        this.upcomingOrders = response.data;
        this.upcomingOrders.forEach((order) => {
          order.viewPackege = false;
          if (new Date(order.eventDate) < new Date()) {
            order.status = 'COMPLETED';
          } else if (new Date(order.eventDate) == new Date()) {
            order.status = 'Delivery By Today';
          } else {
            order.status = 'PENDING';
          }
        });
        console.log(this.data);
      });
  }
  onClickViewPackege(order: IMenuModel): void {
    order.viewPackege = !order.viewPackege;
  }
  loadUserProfile() {
    this.userName = localStorage.getItem('userName'); // Fetch username
    this.userEmail = localStorage.getItem('userEmail'); // Fetch email
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (token) this.isLoggedIn = true; // Set isLoggedIn to true if token exists
  }

  fetchUpcomingOrders(): void {
    this.isLoadingOrders = true;
    this.errorMessage = null;

    this.menuService
      .getUpcomingOrders()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe({
        next: (response: IResponseDto) => {
          console.log('API response:', response);

          // Ensure correct assignment of orders
          this.upcomingOrders = response?.data || [];

          console.log('Assigned orders:', this.upcomingOrders);
          this.isLoadingOrders = false;
        },
        error: (error) => {
          console.error('Full error object:', error);
          console.error('Status:', error.status);
          console.error('Error message:', error.message);
          console.error('Error details:', error.error);
          this.errorMessage = 'Failed to fetch orders. Please try again later.';
          this.isLoadingOrders = false;
        },
      });
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');

    this.isLoggedIn = false;
    this.userName = null;
    this.userEmail = null;
    this.upcomingOrders = []; // Clear orders on logout

    window.location.reload();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(); // Emit a value to unsubscribe
    this._unsubscribe.complete(); // Complete the subject
  }

  togglePackageDetails() {
    this.isPackageVisible = !this.isPackageVisible;
  }
}
