import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CobrowsingService {

  constructor() { }

  getUniqueId() {
    console.log("service called, sending unique id back")
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }


  getSequenceNumber() {
    return (Math.random()*100000).toString()
  }

}
