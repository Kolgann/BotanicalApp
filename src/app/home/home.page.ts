import { Component, ChangeDetectorRef } from '@angular/core';
import { Storage } from '@ionic/storage';

import { DataHandlerService } from '../data-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {

  constructor(private storage: Storage, private dataHandler: DataHandlerService) { }

  ngInit() {
    this.writeToList();
  }

  doRefresh(event) {
    this.writeToList();
    setTimeout(() => {
      event.target.complete();
    }, 1000)
  }

  clearStorage() {
    this.storage.clear();
    this.dataHandler.userPlants = [];
    console.log("STORAge hath been cleared Senor");
  }

  writeToList() {
    //clear list
    this.dataHandler.userPlants = [];
    //list every plant item in storage
    this.storage.forEach((value) => {
      var i;
      for (i = 0; i < value.quant; i++) {
        this.dataHandler.userPlants.push(value);
      }
    });
    console.log(this.dataHandler.userPlants);
  }
}
