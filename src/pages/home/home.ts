import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: any ={};
  constructor(private storage: Storage, public navCtrl: NavController) {
    this.getData();
  }
  getData() {
    this.storage.get('user').then(val => {
      if (val) {
        this.data=val
        console.log(this.data);
      }
    });
  }
}
