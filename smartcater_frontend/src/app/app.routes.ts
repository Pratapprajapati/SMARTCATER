import { Routes } from '@angular/router';
import { MenuComponent } from './Features/menu/menu.component';
import { HomeComponent } from './Features/home/home.component';
import { MealBoxComponent } from './Features/meal-box/meal-box.component';
import { AboutUsComponent } from './Features/about-us/about-us.component';
import { UserprofileComponent } from './Features/userprofile/userprofile.component';
import { AdminComponent } from './Features/admin/admin.component';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'MealBox',
    component: MealBoxComponent,
  },
  {
    path: 'Menu',
    component: MenuComponent,
  },
  {
    path: 'aboutus',
    component: AboutUsComponent,
  },
  {
    path: 'userprofile',
    component: UserprofileComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  }
];
