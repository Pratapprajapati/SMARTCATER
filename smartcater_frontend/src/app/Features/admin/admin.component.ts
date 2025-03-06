import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../data-access/api/menu.service';
import { Subject, takeUntil } from 'rxjs';
import { IResponseDto } from '../../data-access/interface/i-response-dto';
import { IMenuModel } from '../../data-access/interface/i-menumodel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin',
  imports: [CommonModule,FormsModule,ButtonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})

export class AdminComponent implements OnInit, OnDestroy {
  upcomingOrders: any[] = []; // Strongly typed array
  isLoadingOrders = false;
  errorMessage: string | null = null;
  isPackageVisible = false;
  private _unsubscribe = new Subject<void>();

  constructor(private router: Router, private menuService: MenuService) {}

  ngOnInit(): void {
    this.checkAdminAuth();
    this.getAllOrders();
  }

  /**
   * Checks if the admin is authenticated
   */
  checkAdminAuth(): void {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      alert('Unauthorized Access! Redirecting to home.');
      this.router.navigate(['/']); // Redirect to home if not logged in
    }
  }

  /**
   * Fetches all orders for the admin
   */
  getAllOrders(): void {
    this.menuService
      .getData()
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
  data(data: any) {
    throw new Error('Method not implemented.');
  }


  /**
   * Toggles the package details for a specific order
   */
  onClickViewPackege(order: IMenuModel): void {
    order.viewPackege = !order.viewPackege;
  }

  /**
   * Logs out the admin and redirects to home
   */
  logoutAdmin(): void {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/']);
  }

  /**
   * Cleanup on component destroy
   */
  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  /**
   * Toggles package details visibility
   */
  togglePackageDetails(): void {
    this.isPackageVisible = !this.isPackageVisible;
  }
}
