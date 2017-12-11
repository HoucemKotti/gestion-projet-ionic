import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


import { Storage } from '@ionic/Storage';
import { ListeStagePropPage } from '../liste-stage-prop/liste-stage-prop';
import { vars } from '../../vars';
/**
 * Generated class for the PropStagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-prop-stage',
  templateUrl: 'prop-stage.html',
})
export class PropStagePage {

  stage = { sujet_stage: '', desc_stage: '', date_deb: new Date().toISOString(), date_fin: new Date().toISOString() };

  data: any = {}

  constructor(private storage: Storage, private http: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
    this.getData();
  }
  getData() {
    this.storage.get('user').then(val => {
      if (val) {
        this.data = val
        console.log(this.data);
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PropStagePage');
  }


  proposer() {
    console.log("ID Prop"+this.data.id);
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
        this.navCtrl.setRoot(ListeStagePropPage);
      },
      err => {

        this.navCtrl.setRoot(ListeStagePropPage);
        console.log("err");
      },

    );
  }


}
