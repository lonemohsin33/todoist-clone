import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DateExtended } from '../mainapp/workspace/today/interface';

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

  set_and_get_today(): DateExtended {
    const today = new Date();

    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1, // Months are 0-indexed
      day: today.getDate(),
      month_name: today.toLocaleString('default', { month: 'long' }), // E.g., October
      day_name: today.toLocaleString('default', { weekday: 'long' }) // E.g., Tuesday
    };
  }
}
