import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { vars } from '../../vars';
import { DisplayStagePage } from '../display-stage/display-stage';

import { Storage } from '@ionic/Storage';
/**
 * Generated class for the ListeStagePubPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-liste-stage-pub',
  templateUrl: 'liste-stage-pub.html',
})
export class ListeStagePubPage {
  loading: Loading;
  Stages: any;
  data: any = {};
  lien: string = "/api/stage/1";

  constructor(private storage: Storage, private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {

    this.getData();
  }
  getData() {
    this.storage.get('user').then(val => {
      if (val) {
        this.data = val
        console.log(this.data);
        this.getAllStages();
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeStagePubPage');
  }

  getAllStages() {
    if (this.data.type == 3)
      this.lien = "/api/stageByProp/" + this.data.id;
    console.log(this.lien);
    this.http.get(vars.url + this.lien).subscribe
      (
      res => {
        this.Stages = res;
        console.log("Stages" + this.Stages);
      },
      err => {
        console.log("Problème de connexion");
      },


    );
  }

  displayStages(item, action) {
    this.navCtrl.push(DisplayStagePage, {
      'item': item,
      'action': action
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
}