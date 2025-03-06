import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { starterList } from '../../data-access/model/starter-item-list';
import { IMenu } from '../../data-access/interface/i-menu';
import { mainsList } from '../../data-access/model/mains-item-list';
import { breadList } from '../../data-access/model/Breads-item-list';
import { dessertList } from '../../data-access/model/Dessert-item-list';
import { liveServicelist } from '../../data-access/model/liveservice-item-list';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuService } from '../../data-access/api/menu.service';
import { IMenuModel } from '../../data-access/interface/i-menumodel';
import { LoginService } from '../../data-access/api/login.service';
import { defaultOrderValue } from '../../data-access/model/menu-model-list';
import { IDropdown } from '../../data-access/interface/i-dropdown';
import {
  cityList,
  deliveryTimeList,
  occasionList,
} from '../../data-access/model/list';
import { DatePickerModule } from 'primeng/datepicker';
import { Subject, takeUntil } from 'rxjs';
import { error } from 'console';

declare var Razorpay: any;

@Component({
  selector: 'app-menu',
  imports: [
    CommonModule,
    FormsModule,
    CheckboxModule,
    InputNumberModule,
    InputTextModule,
    SelectModule,
    DialogModule,
    DatePickerModule,
  ],
  templateUrl: './menu.component.html',
  standalone: true,
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent implements OnInit {
  selectedItems = [];
  SelectedStarters: Array<IMenu> = [];
  staterDtoList = starterList;
  selectedStarterList: Array<IMenu> = [];
  mainDtoList = mainsList;
  selectedMainsList: Array<IMenu> = [];
  breadDtoList = breadList;
  selectedBreadsList: Array<IMenu> = [];
  dessertDtoList = dessertList;
  selectedDessertList: Array<IMenu> = [];
  liveServiceDtoList = liveServicelist;
  selectedliveServiceList: Array<IMenu> = [];
  display = false;
  display1 = false;
  display2 = false;
  display3 = false;
  display4 = false;
  displayprice = false;
  displaydetails = false;
  deliveryCharge: number = 0;
  servers = 0;
  selectedDeliveryOption: any;
  displayServersSelection = false;
  // guestcount = 20;
  data: any;
  order: IMenuModel;
  citylist: Array<IDropdown> = cityList;
  occasionList: Array<IDropdown> = occasionList;
  deliveryTimeList: Array<IDropdown> = deliveryTimeList;
  totalItems = {
    starters: 0,
    mains: 0,
    bread: 0,
    desserts: 0,
    liveServices: 0,
  };
  deliveryOptions = [
    { label: 'Delivery Only', value: 'DELIVERY', price: 0 },
    {
      label: `Buffet Setup and Servers`,
      value: 'BUFFET_SERVERS',
      price: 4000,
    },
  ];
  http: any;

  private _unsubscribe = new Subject<void>();

  constructor(
    private cd: ChangeDetectorRef,
    private loginService: LoginService,
    private menuService: MenuService
  ) {
    this.order = defaultOrderValue;
    this.order.customerId  = '';
  }

  ngOnInit(): void {
    // Retrieve the logged-in user's ID and assign it to customer_id
    const loggedInUserId = this.loginService.getLoggedInUserId();
    if (loggedInUserId) {
      this.order.customerId  = loggedInUserId;
    } else {
      console.error('No user is logged in.');
    }

    // this.menuService.getData().subscribe((response) => {
    //   this.data = response;
    //   console.log(this.data);
    // });
  }

  placeOrder() {
    this.order.customerId  = localStorage.getItem('userId');
    // Ensure customer_id is set before placing the order
    console.log('Customer ID:', this.order.customerId );
    if (!this.order.customerId ) {
      console.error('Customer ID is missing.');
      return;
    }

    this.order.starterList = this.selectedStarterList;
    this.order.breadsList = this.selectedBreadsList;
    this.order.mainsList = this.selectedMainsList;
    this.order.dessertList = this.selectedDessertList;
    this.order.liveserviceList = this.selectedliveServiceList;

    console.log(this.order);
    this.menuService
      .createOrder(this.order)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe({
        next: (res) => {
          console.log(res);
          alert(res.message);
          this.displaydetails = false;
        },
        error: (err) => {
          alert(err.message);
        },
      });
  }

  onCheckboxChange(starter: IMenu, selectedList: string, index: number): void {
    // Add to the selectedStarterList if checkbox is checked
    if (starter.selected) {
      if (!this[selectedList].includes(starter)) {
        this[selectedList].push(starter);
      }
    } else {
      // Remove from the selectedStarterList if checkbox is unchecked
      const i = this[selectedList].findIndex((dto) => dto.id === starter.id);

      if (i !== -1) {
        this[selectedList].splice(i, 1);
      }
    }
    this.cd.detectChanges();
  }

  // Remove the item from the selectedStarterList and uncheck its checkbox
  removeItem(
    index: number,
    starter: IMenu,
    selecteditemList: string,
    dtoList: string
  ): void {
    this[dtoList].forEach((dto) => {
      if (starter.id === dto.id) {
        dto.selected = false;
      }
    });
    this[selecteditemList].splice(index, 1);
    this.cd.detectChanges();
  }

  increaseQuantity(starter: IMenu): void {
    if (starter.quantity) {
      starter.quantity += 1;
    }
  }

  decreaseQuantity(starter: IMenu) {
    if (starter.quantity && starter.quantity > 1) {
      starter.quantity -= 1;
    }
  }

  finalizeSelection() {
    this.display = true;
  }

  checkprice() {
    this.displayprice = true;
  }

  // **Function to Calculate Total Food Cost**
  get foodCost(): number {
    const totalStarterPrice = this.selectedStarterList.reduce(
      (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
      0
    );
    const totalMainPrice = this.selectedMainsList.reduce(
      (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
      0
    );
    const totalBreadPrice = this.selectedBreadsList.reduce(
      (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
      0
    );
    const totalDessertPrice = this.selectedDessertList.reduce(
      (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
      0
    );
    const totalLiveServicePrice = this.selectedliveServiceList.reduce(
      (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
      0
    );

    return (
      totalStarterPrice +
      totalMainPrice +
      totalBreadPrice +
      totalDessertPrice +
      totalLiveServicePrice
    );
  }

  get subTotal(): number {
    return this.foodCost + this.deliveryCharge;
  }

  get gst(): number {
    return this.foodCost * 0.05;
  }

  get grandTotal(): number {
    this.order.totalPrice =
      this.foodCost + this.gst + this.deliveryCharge + this.servers * 1000;
    return this.foodCost + this.gst + this.deliveryCharge + this.servers * 1000;
  }

  // Update delivery charge when dropdown value changes
  updateDeliveryCharge(value: any) {
    console.log(value);
    this.deliveryCharge = this.deliveryOptions.filter(
      (option) => option.value === this.selectedDeliveryOption
    )[0].price;
    if (this.selectedDeliveryOption === 'BUFFET_SERVERS') {
      this.displayServersSelection = true;
    } else {
      this.displayServersSelection = false;
    }
    this.servers = 0;
    this.cd.detectChanges();
  }

  increaseServer(): void {
    if (this.servers >= 0) {
      this.servers += 1;
    }
  }

  decreaseServer() {
    if (this.servers && this.servers > 0) {
      this.servers -= 1;
    }
  }

  placeorder() {
    this.displaydetails = true;
  }

  goBack() {
    this.displaydetails = false;
  }

  private razorpayKey = 'rzp_test_2b131BR7CCeVvw';

  paynow() {
    const options = {
      key: this.razorpayKey,
      amount: this.order.totalPrice * 100, // Convert to paisa
      currency: 'INR',
      name: 'SmartCater',
      description: 'Order Payment',
      image: '/assets/logo.png', // Ensure logo is placed in `src/assets/logo.png`
      order_id: this.order.id,
      handler: (response: any) => {
        console.log('Payment Successful', response);
        this.placeOrder(); // Call placeOrder only after success
      },
      prefill: {
        name: this.order.customer.name,
        email: this.order.customer.email,
        contact: this.order.customer.whatsapp,
      },
      theme: {
        color: '#000000',
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }
}
