import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { IMenu } from '../../data-access/interface/i-menu';
import { starterSaladList } from '../../data-access/model2/starter-salad-list';
import { mainList } from '../../data-access/model2/main-list';
import { dalList } from '../../data-access/model2/dal-list';
import { breadList } from '../../data-access/model2/bread-rice-list';
import { breadsList } from '../../data-access/model2/breads-list';
import { riceList } from '../../data-access/model2/rice-list';
import { dessertList } from '../../data-access/model2/dessert-list';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { MenuService } from '../../data-access/api/menu.service';
import { IMenuModel } from '../../data-access/interface/i-menumodel';
import { defaultOrderValue } from '../../data-access/model/menu-model-list';
import { IDropdown } from '../../data-access/interface/i-dropdown';
import {
  cityList,
  deliveryTimeList,
  occasionList,
} from '../../data-access/model/list';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-meal-box',
  imports: [
    CommonModule,
    FormsModule,
    CheckboxModule,
    InputNumberModule,
    SelectModule,
    DialogModule,
    DatePickerModule,
  ],
  templateUrl: './meal-box.component.html',
  styleUrl: './meal-box.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MealBoxComponent {
  cities = ['City1', 'City2', 'City3']; // Replace with actual city names
  selectedCity = '';
  selectedDate: string | null = null;
  guestCount = 20;
  selectedItems = [];

  activeDiv: number | null = null;
  starterSaladDtoList = starterSaladList;
  selectedStarterSaladList: Array<IMenu> = [];
  mainDtoList = mainList;
  selectedMainsList: Array<IMenu> = [];
  breadDtoList = breadsList;
  selectedBreadsList: Array<IMenu> = [];
  dessertDtoList = dessertList;
  selectedDessertList: Array<IMenu> = [];
  dalDtoList = dalList;
  selectedDalList: Array<IMenu> = [];
  riceDtoList = riceList;
  selectedRiceList: Array<IMenu> = [];
  breadRiceDtoList = breadList;
  selectedBreadRiceList: Array<IMenu> = [];
  display1 = false;
  display2 = false;
  display3 = false;
  displaydetails = false;
  display3CP = false;

  displayprice = false;
  selectedMeal: string | null = null;

  data: any;
  order: IMenuModel;
  citylist: Array<IDropdown> = cityList;
  occasionList: Array<IDropdown> = occasionList;
  deliveryTimeList: Array<IDropdown> = deliveryTimeList;

  selectionLimits = {
    starterSalad: 1,
    main: 1,
    breads: 2,
    dessert: 1,
    dal: 2,
    rice: 2,
    breadRice: 1,
  };

  decreaseGuestCount() {
    if (this.guestCount > 20) {
      this.guestCount--;
    }
  }

  increaseGuestCount() {
    this.guestCount++;
  }

  validateGuestCount() {
    if (this.guestCount < 20) {
      this.guestCount = 20;
    }
  }

  selectMeal(meal: string) {
    this.selectedMeal = meal;
    if (meal === '3cp-meal') {
      this.selectionLimits = {
        starterSalad: 1,
        main: 1,
        breads: 1,
        dessert: 1,
        dal: 1,
        rice: 1,
        breadRice: 1,
      };
    } else if (meal === '6cp') {
      this.selectionLimits = {
        starterSalad: 2,
        main: 1,
        breads: 1,
        dessert: 1,
        dal: 1,
        rice: 1,
        breadRice: 1,
      };
    } else if (meal === '8cp') {
      this.selectionLimits = {
        starterSalad: 3,
        main: 2,
        breads: 1,
        dessert: 1,
        dal: 1,
        rice: 1,
        breadRice: 1,
      };
    }
  }

  http: any;

  private _unsubscribe = new Subject<void>();

  constructor(private cd: ChangeDetectorRef, private menuService: MenuService) {
      this.order = defaultOrderValue;
      this.order.customerId  = '';
    
  }

  ngOnInit(): void {
    // this.menuService.getData().subscribe((response) => {
    //   this.data = response;
    //   console.log(this.data);
    // });
  }

  placeOrder() {
    this.order.starterList = this.selectedStarterSaladList;
    this.order.breadsList = this.selectedBreadsList;
    this.order.mainsList = this.selectedMainsList;
    this.order.dessertList = this.selectedDessertList;
    this.order.ricelist = this.selectedRiceList;
    this.order.breadRiceList = this.selectedBreadRiceList;
    this.order.dallist = this.selectedDalList;

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

  onCheckboxChange(
    selection: IMenu,
    checklist: string,
    selectionLimits: number,
    dtoList: string
  ): void {
    const checkListLength = this[checklist].length;

    if (selection.selected) {
      // Add to the selectedStarterList if checkbox is checked
      if (!this[checklist].includes(selection)) {
        this[checklist].push(selection);
      }
      if (checkListLength > 0 && checkListLength >= selectionLimits) {
        // this[dtoList][this[checklist][checkListLength - 1]].selected = false;
        this[dtoList].forEach((dto) => {
          if (dto.id === this[checklist][checkListLength - 1].id) {
            dto.selected = false;
          }
        });
        this[checklist].splice(checkListLength - 1, 1);
      }
    } else {
      // Remove from the selectedStarterList if checkbox is unchecked
      const i = this[checklist].findIndex((dto) => dto.id === selection.id);
      if (i !== -1) {
        this[checklist].splice(i, 1);
      }
    }
    this.cd.detectChanges();
  }

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

  finalizeSelection(): void {
    this.display1 = true;
  }
  checkprice() {
    this.displayprice = true;
  }

  // **Function to Calculate Total Food Cost**
  get totalFoodCost(): number {
    const calculateTotal = (list: Array<IMenu>) =>
      list.reduce((sum, item) => sum + (item.price ?? 0) * this.guestCount, 0);

    return (
      calculateTotal(this.selectedStarterSaladList) +
      calculateTotal(this.selectedMainsList) +
      calculateTotal(this.selectedBreadsList) +
      calculateTotal(this.selectedDessertList) +
      calculateTotal(this.selectedDalList) +
      calculateTotal(this.selectedRiceList) +
      calculateTotal(this.selectedBreadRiceList)
    );
  }

  get gst(): number {
    return this.totalFoodCost * 0.05;
  }

  get grandTotal(): number {
    return this.totalFoodCost + this.gst;
  }

  placeorder() {
    this.displaydetails = true;
  }

  goBack() {
    this.displaydetails = false;
  }

  customer = {
    name: '',
    whatsapp: '',
    email: '',
    house: '',
    town: '',
    city: '',
    pincode: '',
  };

  open_3cp() {
    this.display3CP = true;
  }
  toggleDiv(divNumber: number) {
    this.activeDiv = this.activeDiv === divNumber ? null : divNumber;
  }
}
