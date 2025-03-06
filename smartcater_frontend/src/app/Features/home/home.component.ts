import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home',
  imports: [
    DialogModule,
    InputTextModule,
    ButtonModule,
    LoginComponent,
    CommonModule,
    CarouselModule,
  ], // Ensure DialogModule is imported here
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  enableLogin = true;

  slides = [
    { image: '/assets/home/imagehome1.png' },
    { image: '/assets/home/imagehome2.png' },
    { image: 'assets/images/slide3.png' },
  ];

  promises = [
    { image: '/assets/home/image3.png' },
    { image: '/assets/home/image4.png' },
  ];

  categories = [
    { title: 'Wedding', image: '/assets/home/wedding.png' },
    { title: "Kids B'day", image: '/assets/home/kids.png' },
    { title: 'House Pooja', image: '/assets/home/pooja.png' },
    { title: 'Corporate', image: '/assets/home/corporate.png' },
    { title: 'Baby Shower', image: '/assets/home/Babyshower.png' },
    { title: 'House Party', image: '/assets/home/houseparty.png' },
  ];

  constructor(private cd: ChangeDetectorRef, private router: Router) {}

  onLoginComplete(value: boolean): void {
    if (value) this.enableLogin = false;
    console.log(this.enableLogin);
    this.cd.detectChanges();
  }

  packages = [
    {
      titlePrefix: 'Meal',
      titleSuffix: 'Box',
      subtitle: '(Self Service - Mini Buffet)',
      info: 'Delivery Only',
      image: '/assets/mealbox.png',
      route: '/mealbox', // Route for MealBox
    },
    {
      titlePrefix: 'Smart',
      titleSuffix: 'Menu',
      subtitle: '(Setup + Service)',
      info: '3 Hours Service',
      image: '/assets/SmartMenu.png',
      route: '/menu', // Route for SmartMenu
    },
  ];

  navigateTo(route: string) {
    this.router.navigate([route]); // Redirect to the specified route
  }
}
