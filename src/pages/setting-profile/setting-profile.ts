import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';

import { vars } from '../../vars';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the SettingProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting-profile',
  templateUrl: 'setting-profile.html',
})
export class SettingProfilePage {

  loading: Loading; 
  user: any = {};
  erreur: string = "";
  success: string = "";
  constructor(private loadingCtrl: LoadingController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  ionViewDidLoad() {
    this.storage.get('user').then((val) => {
      this.user = val;
      console.log("aff"+JSON.stringify(this.user));
    });
  }
 
  submitEtudiant() {
  this.success= "";
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.user.email)) {
      this.erreur = "Email non valid !";
    }
    else {
      this.erreur = "";
    }

    if (this.erreur == "") {
      this.showLoading();
      this.http.put(vars.url + "/api/etudiant/" + this.user.id,
        {
          "nom": this.user.nom,
          "prenom": this.user.prenom,
          "cin": this.user.cin,
          "email": this.user.email,
          "password": this.user.password,
          "tel": this.user.tel,
          "date_naiss": this.user.date_naiss,
          "cycle_etude": this.user.cycle_etude,
          "niveau_etude": this.user.niveau_etude,
          "specialite": this.user.specialite,
        })
        .subscribe(
          
        (val) => {
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          if (response.status == 201 || response.status == 200) {
            this.loading.dismiss();
            this.storage.set('user',this.user);
            this.success="true";
            
          } else {

            this.loading.dismiss();
            if (response.error == "non isims") {
              this.erreur = "Etudiant n'est pas inscrit dans l'universite";
            } else {
              if (response.error == "user existe") { this.erreur = "Etudiant déja inscrit"; }
              else
                this.erreur = response.error;
            }
          }
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
    }
    console.log("submitEtudiant", this.user.nom);

  }

  submitEntreprise() {
    this.success= "";
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.user.email)) {
      this.erreur = "Email non valid !";
    }
    else {
      this.erreur = "";
    }


    if (this.erreur == "") {
      this.showLoading();
      this.http.put(vars.url + "/api/entreprise/" + this.user.id,

        {
          "nom": this.user.nom,
          "prenom": this.user.prenom,
          "cin": this.user.cin,
          "email": this.user.email,
          "password": this.user.password,
          "tel": this.user.tel,
          "nom_ent": this.user.nom_ent,
          "tel_ent": this.user.tel_ent,
          "adresse_ent": this.user.adresse_ent,
          "fax_ent": this.user.fax_ent,
        })
        .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          if (response.status == 201 || response.status == 200) {
            this.loading.dismiss();
            this.storage.set('user',this.user);
            this.success="true";
          } else {
            this.loading.dismiss();
            this.erreur = "Déja existe";
          }
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
    }

    //testing forms do not delete!
    console.log("submitEntreprise");

  }
  submitEnseignant() {
    this.success= "";
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.user.email)) {
      this.erreur = "Email non valid !";
    }
    else {
      this.erreur = "";
    }

    if (this.erreur == "") {
      this.showLoading();
      this.http.put(vars.url + "/api/enseignant/" + this.user.id,
        {
          "nom": this.user.nom,
          "prenom": this.user.prenom,
          "cin": this.user.cin,
          "email": this.user.email,
          "password": this.user.password,
          "tel": this.user.tel,
          "grade": this.user.grade
        })
        .subscribe(

          res => {
            
          console.log(res);
          if (res == 200) {
            this.loading.dismiss();
            this.storage.set('user',this.user);
            this.success="true";
          } else {
            this.loading.dismiss();
            if (res == "non isims") {
              this.erreur = "Enseignant n'est pas inscrit dans l'universite";
            } else {
              if (res == "user existe") { this.erreur = "Enseignant déja inscrit"; }
              else
                this.erreur = JSON.stringify(res);
            }
          }

          }
          /*
        (val) => {
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          console.log(response.status);
          if (response.status === 200) {
            this.loading.dismiss();
            this.storage.set('user',this.user);
            this.success="true";
          } else {
            this.loading.dismiss();
            if (response.error == "non isims") {
              this.erreur = "Enseignant n'est pas inscrit dans l'universite";
            } else {
              if (response.error == "user existe") { this.erreur = "Enseignant déja inscrit"; }
              else
                this.erreur = response.error;
            }
          }
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        }*/
      
      );
    }

    //testing forms do not delete!
    console.log("submitEntreprise");
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }


}
