import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { vars } from '../../vars';
import { ListeStagePropPage } from '../liste-stage-prop/liste-stage-prop';

import { Storage } from '@ionic/Storage';

import * as jsmin from 'pdfmake/build/pdfmake.min';
import * as fonta from 'pdfmake/build/vfs_fonts';
import * as pdfmake from 'pdfmake/build/pdfmake';

import * as jsPDF from 'jspdf';

/** 
 * Generated class for the DisplayStagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-display-stage',
  templateUrl: 'display-stage.html',
})
export class DisplayStagePage {

  loading: Loading;
  item: any;
  data: any = {};
  action: any;

  constructor(private storage: Storage, public viewCtrl: ViewController, private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.item = navParams.get('item');
    this.action = navParams.get('action');
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
    console.log('ionViewDidLoad DisplayStagePage');
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

  toPDF() {
    var doc = new jsPDF();
    doc.fromHTML('<h1>Sujet</h1>'+this.item.sujet_stage+'<h1>Description</h1>'+this.item.desc_stage+'<h1>Date debut</h1>'+this.item.date_deb+'<h1>Date fin</h1>'+this.item.date_fin+'<h1>Entreprise</h1>'+this.item.nom_ent+'<h1>Email</h1>'+this.item.email);
    doc.save('demande-stage.pdf');
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

  return() {
    // this.navCtrl.setRoot(ListeStagePropPage)

    this.viewCtrl.dismiss();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
