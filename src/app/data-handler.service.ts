import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataHandlerService {
  plants: any;
  plant: any;
  userPlants: any;
  constructor(private httpClient: HttpClient) { };

  getJson() {
    console.log("ay m8 getJson got called by sumthin");
    return this.httpClient.get("http://botanicalapp.com/wp-content/botanical-data/data.json");
  }
}