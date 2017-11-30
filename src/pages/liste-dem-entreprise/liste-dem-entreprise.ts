import { Component } from '@angular/core';
import { NavController, NavParams , Loading, LoadingController } from 'ionic-angular';

import { vars } from '../../vars';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the ListeDemEntreprisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-liste-dem-entreprise',
  templateUrl: 'liste-dem-entreprise.html',
})
export class ListeDemEntreprisePage {

  loading: Loading; 
  Entreprises: any;

  constructor(private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeDemEntreprisePage');
    this.getAllEntreprises();
  }

  getAllEntreprises() {
    this.http.get(vars.url + "/api/entreprise/all/4").subscribe
      ( 
          res => {
            this.Entreprises = res;
            console.log("etu"+this.Entreprises);
            
          },
          err => {
            console.log("Problème de connexion");
          },
   

    );
  }
  updateEntreprises(id) {
  this.showLoading();
  this.http.put(vars.url + "/api/entreprise/" + id,
    {
      "type": 3,
    })
    .subscribe(
      
    (val) => {
      console.log("POST call successful value returned in body",
        val);
    },
    response => {
      this.loading.dismiss();
      this.navCtrl.setRoot(ListeDemEntreprisePage);
      console.log("POST call in error", response);
    },
    () => {
      console.log("The POST observable is now completed.");
    });

}

deleteEntreprises(id) {
  this.showLoading();
  this.http.delete(vars.url + "/api/entreprise/" + id)
    .subscribe(
      
    (val) => {
      console.log("POST call successful value returned in body",
        val);
    },
    response => {
      this.loading.dismiss();
      this.navCtrl.setRoot(ListeDemEntreprisePage);
      console.log("POST call in error", response);
    },
    () => {
      console.log("The POST observable is now completed.");
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
