import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  // BehaviorSubject to store the current date
  private dateSource = new BehaviorSubject<Date>(new Date());
  // Observable to allow other components to subscribe to the date
  // currentDate = this.dateSource.asObservable();
  today:{} = {}
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  month_names = {1:"Jan", 2: "Feb", 3:"March", 4:"April", 5:"May", 6:"June", 7:"July", 8:"Aug", 9:"Sep", 10:"Oct", 11:"Nov", 12:"Dec"}

  constructor() {
    this.updateDate();
  }

  // Function to update the date (can be called to refresh the date if needed)
  updateDate(): void {
    const today = new Date();
    this.dateSource.next(today);
  }

  // Optional: Method to get today's date directly (without subscribing)
  getTodayDate(): Date {
    return new Date();
  }

  set_and_get_today() {
    const now = new Date();
    this.today = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      month_name: this.month_names[now.getMonth() + 1],
      day_name: this.days[now.getDay()]
    };
    return this.today
  }
}
