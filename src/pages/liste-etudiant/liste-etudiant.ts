import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { vars } from '../../vars';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the ListeEtudiantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-liste-etudiant',
  templateUrl: 'liste-etudiant.html',
})
export class ListeEtudiantPage {
  Etudiants: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ListeEtudiantPage');
    this.getAllEtudiants();
  }

  getAllEtudiants() {
    this.http.get(vars.url + "/api/etudiant").subscribe
      ( 
          res => {
            this.Etudiants = res;
            console.log("etu"+this.Etudiants);
            
          },
          err => {
            console.log("Problème de connexion");
          },
   

    );
  }

}
