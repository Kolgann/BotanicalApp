import { Component, ViewChild, NgZone, Self, ChangeDetectorRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  providers: [Keyboard]
})

export class TabsPage {

  showTabs = true;

  //WHY THE FUCK DOESN'T THIS WORK I JUST WANNA HIDE THE TAB BAR
  constructor(private ref: ChangeDetectorRef, private keyboard: Keyboard, private platform: Platform) {
    platform.ready().then(() => {
      keyboard.onKeyboardShow().subscribe(() => {
        this.showTabs = false;
        this.ref.markForCheck();
      })
      keyboard.onKeyboardHide().subscribe(() => {
        this.showTabs = true;
        this.ref.markForCheck();
      })
    })
  };

  //i wrote this part from scratch, that's probably why it doesn't work
  //nvm it works somehow but i don't remember how i fixed it
  //fuck this dude
  @ViewChild('mainTabs', {static: false}) mainTabs//: Tabs;
  homeTabActive: any;
  catalogTabActive: any;
  calendarTabActive: any;
  public highlightTab() {
    this.mainTabs.getSelected().then(data => {
      let selectedTab = data;
      console.log (selectedTab);
      if (selectedTab.tab === "home") {
        this.homeTabActive = "solid";
        this.catalogTabActive = "clear";
        this.calendarTabActive = "clear";
        this.ref.markForCheck();
      }
      else if (selectedTab.tab === "catalog") {
        this.homeTabActive = "clear";
        this.catalogTabActive = "solid";
        this.calendarTabActive = "clear";
        this.ref.markForCheck();
      }
      else if (selectedTab.tab === "calendar") {
        this.homeTabActive = "clear";
        this.catalogTabActive = "clear";
        this.calendarTabActive = "solid";
        this.ref.markForCheck();
      }
    });
  }
}