import { Component } from '@angular/core';
import { NavController, NavParams, Loading } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { vars } from '../../vars';
import { ListeStagePubPage } from '../liste-stage-pub/liste-stage-pub';

import { Storage } from '@ionic/Storage';
import { ListeStagePropPage } from '../liste-stage-prop/liste-stage-prop';

/**
 * Generated class for the PubStagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pub-stage',
  templateUrl: 'pub-stage.html',
})
export class PubStagePage {

  loading: Loading;
  stage = { sujet_stage: '', desc_stage: '', date_deb: new Date().toISOString(), date_fin: new Date().toISOString() };

  data: any ={};

  constructor(private storage: Storage, private http: HttpClient,public navCtrl: NavController, public navParams: NavParams) {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PubStagePage');
  }

  publier() {
    this.http.post(vars.url + '/api/stagePub', {
      "sujet_stage": this.stage.sujet_stage,
      "desc_stage": this.stage.desc_stage,
      "date_deb": this.stage.date_deb,
      "date_fin": this.stage.date_fin,
      "id_prop": this.data.id
    })
      .subscribe(
      res => {
        console.log("res");
          this.navCtrl.setRoot(ListeStagePubPage);
      },
      err => {
       
        this.navCtrl.setRoot(ListeStagePubPage);
        console.log("err");
      },

    );
  }
}
