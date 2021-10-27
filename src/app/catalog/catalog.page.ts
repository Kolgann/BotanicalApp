import { Component, NgModule } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';

import { PlantDetailPage } from '../plant-detail/plant-detail.page';
import { DataHandlerService } from '../data-handler.service';

@Component({
  selector: 'app-catalog',
  templateUrl: 'catalog.page.html',
  styleUrls: ['catalog.page.scss']
})

export class CatalogPage {

  constructor(public modalController: ModalController, private dataHandler: DataHandlerService) { }

  ngOnInit() {
    this.getPlantsList();
  }

  doRefresh(event) {
    this.getPlantsList();
    setTimeout(() => {
      event.target.complete();
    }, 1000)
  }

  toggleExpanded(object) {
    object.expanded = !object.expanded;
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PlantDetailPage,
    });
    return await modal.present();
  }

  getPlantsList() {
    this.dataHandler.getJson().subscribe(
      data => {
        //set dataHandler.plants to an array with values pulled from data.json
        this.dataHandler.plants = Object.values(data);
        this.dataHandler.plants = Object.values(this.dataHandler.plants[0]);
        //set the quant and expanded properties for each plant
        this.dataHandler.plants.forEach(element => {
          element.quant = 0;
          element.expanded = false;
        });
        //sort dataHandler.plants array alphabetically by id
        this.dataHandler.plants.sort(function (a, b) {
          var x = a['id'];
          var y = b['id'];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        console.log(this.dataHandler.plants);
      }
    )
  }

  presentPlantDetailModal(plant: any) {
    this.dataHandler.plant = plant;
    this.presentModal();
  }
}
