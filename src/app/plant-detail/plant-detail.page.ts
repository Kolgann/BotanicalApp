import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Subscription, fromEvent } from 'rxjs';
import { Storage } from '@ionic/storage';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import RRule from 'rrule';

//import { HomePage } from '../home/home.page';
import { DataHandlerService } from '../data-handler.service';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.page.html',
  styleUrls: ['./plant-detail.page.scss'],
})
export class PlantDetailPage implements OnInit {

  private backButtonSubscription: Subscription;
  plant: any;
  showChip: boolean;
  plantQuant: any;

  constructor(public modalController: ModalController, private platform: Platform, private storage: Storage, private dataHandler: DataHandlerService) { }

  dismissModal() {
    this.modalController.dismiss();
  }

  //Adds plant to user's list and increases quantity by 1 if multiple
  addPlant() {
    this.modalController.dismiss();
    //get data from storage with the key of the active plant
    this.storage.get(this.dataHandler.plant.id).then(object => {
      if (object) {
        object.quant += 1;
      } else {
        object = this.dataHandler.plant;
        object.quant = 1;
      }

      //this is a custom json parser i wrote because i hate myself and it looks like shit but it works
      //also HOLY SHIT I DIDNT NEED TO DO ANY OF THIS but it works and i'm just gonna leave it so i feel like it was worthwhile
      console.log(this.dataHandler.plant.byweekday);
      this.dataHandler.plant.byweekday.forEach(function (part, index, theArray) {
        if (theArray[index] === "RRule.MO") {
          theArray[index] = RRule.MO;
        } else if (theArray[index] === "RRule.TU") {
          theArray[index] = RRule.TU;
        } else if (theArray[index] === "RRule.WE") {
          theArray[index] = RRule.WE;
        } else if (theArray[index] === "RRule.TH") {
          theArray[index] = RRule.TH;
        } else if (theArray[index] === "RRule.FR") {
          theArray[index] = RRule.FR;
        } else if (theArray[index] === "RRule.SA") {
          theArray[index] = RRule.SA;
        } else if (theArray[index] === "RRule.SU") {
          theArray[index] = RRule.SU;
        } else {
          console.log("go check your json m8 it's straight fucked");
        }
      });
      console.log(this.dataHandler.plant.byweekday);

      object.rrule = new RRule({
        freq: RRule.WEEKLY,
        interval: this.dataHandler.plant.interval,
        byweekday: this.dataHandler.plant.byweekday
      });
      object.rrule = object.rrule.toString();
      //this.homePage.writeToList();
      this.storage.set(this.dataHandler.plant.id, object);
      this.plantQuant = object.quant;
      console.log(object);
    });
  }

  ngOnInit() {
    this.storage.get(this.dataHandler.plant.id).then(object => {
      if (object != null) {
        if (object.quant > 0) {
          this.showChip = true;
        } else {
          this.showChip = false;
        }
        this.plantQuant = object.quant;
      } else {
        this.showChip = false;
      }
    })
  }
}
