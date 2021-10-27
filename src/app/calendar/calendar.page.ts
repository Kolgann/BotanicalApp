import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NavController, Platform, AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { RRule, RRuleSet, rrulestr } from 'rrule';

import { DataHandlerService } from '../data-handler.service';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})
export class CalendarPage {

  constructor(private storage: Storage, private dataHandler: DataHandlerService) {
    this.setRruleList();
    this.getDaysOfMonth();
  };

  doRefresh(event) {
    this.setRruleList();
    setTimeout(() => {
      event.target.complete();
    }, 1000)
  }

  rRules = [];

  setRruleList() {
    this.rRules = [];
    this.storage.forEach((value) => {
      var i;
      for (i = 0; i < value.quant; i++) {
        this.rRules.push(rrulestr(value.rrule));
      }
    });
    console.log(this.rRules);
  }

  // This is the code for the calendar, I got it from somewhere but I forget where
  // Also it was broken initially so I had to do sum shit but now it works so I'm not gonna touch it

  date = new Date;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  eventDaysInThisMonth: any;
  isCurrentDate: boolean;

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();

    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate;
    }

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();

    for (var i = prevNumOfDays - (firstDayThisMonth); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();

    for (var i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i + 1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
    var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0).getDate();

    for (var i = 0; i < (6 - lastDayThisMonth); i++) {
      this.daysInNextMonth.push(i + 1);
    }

    var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;

    if (totalDays < 36) {
      for (var i = (7 - lastDayThisMonth); i < ((7 - lastDayThisMonth) + 7); i++) {
        this.daysInNextMonth.push(i);
      }
    }

    if (this.date.getMonth() === new Date().getMonth() && this.date.getFullYear() === new Date().getFullYear()) {
      this.isCurrentDate = true;
    } else {
      this.isCurrentDate = false;
    }

    //get all days in month that have events
    this.eventDaysInThisMonth = [];
    this.rRules.forEach(function (part) {
      part.between(new Date(Date.UTC(this.currentYear, this.date.getMonth(), 1)), new Date(Date.UTC(this.currentYear, this.date.getMonth(), this.daysInThisMonth[this.daysInThisMonth.length - 1]))).forEach(function (part) {
        this.eventDaysInThisMonth.push(part.getDate());
      }, this);
    }, this);
    this.eventDaysInThisMonth.sort(function (a, b) {
      return a - b;
    })
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    this.getDaysOfMonth();
  }
}