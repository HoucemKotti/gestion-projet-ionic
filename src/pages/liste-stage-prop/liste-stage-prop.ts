import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { vars } from '../../vars';
import { DisplayStagePage } from '../display-stage/display-stage';

import { Storage } from '@ionic/Storage';
/**
 * Generated class for the ListeStagePropPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-liste-stage-prop',
  templateUrl: 'liste-stage-prop.html',
})
export class ListeStagePropPage {

  loading: Loading;
  Stages: any;
  data: any = {};
  lien: string = "/api/stage/0";

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
    console.log('ionViewDidLoad ListeStagesPage');
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
      }


      );
  }
  updateStages(id) {
    this.showLoading();
    this.http.put(vars.url + "/api/stageValid/" + id,
      {
        "etat_proposition": 1,
      })
      .subscribe(

      (val) => {
        console.log("POST call successful value returned in body",
          val);
      },
      response => {
        this.loading.dismiss();
        this.navCtrl.setRoot(ListeStagePropPage);
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });

  }

  deleteStages(id) {
    this.showLoading();
    this.http.delete(vars.url + "/api/stage/" + id)
      .subscribe(

      (val) => {
        console.log("POST call successful value returned in body",
          val);
      },
      response => {
        this.loading.dismiss();
        this.navCtrl.setRoot(ListeStagePropPage);
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });

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