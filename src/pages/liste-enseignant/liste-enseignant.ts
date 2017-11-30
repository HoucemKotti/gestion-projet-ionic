import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { vars } from '../../vars';
import { HttpClient } from '@angular/common/http';
/**
/**
 * Generated class for the ListeEnseignantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-liste-enseignant',
  templateUrl: 'liste-enseignant.html',
})
export class ListeEnseignantPage {
  Enseignant: any;

  constructor( private http: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeEnseignantPage');
    this.getAllEnseignants();
  }

  getAllEnseignants() {
    this.http.get(vars.url + "/api/enseignant").subscribe
      ( 
          res => {
            this.Enseignant = res;
            console.log(this.Enseignant);
            
          },
          err => {
            console.log("Problème de connexion");
          },
   

    );

}
}