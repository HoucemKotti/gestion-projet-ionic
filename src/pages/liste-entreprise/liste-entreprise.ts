import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { vars } from '../../vars';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the ListeEntreprisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-liste-entreprise',
  templateUrl: 'liste-entreprise.html',
})
export class ListeEntreprisePage {
  Entreprises: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeEntreprisePage');
    this.getAllEntreprises();
  }

  getAllEntreprises() {
    this.http.get(vars.url + "/api/entreprise/all/3").subscribe
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

}
