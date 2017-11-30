import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/Storage';

import { SigninPage } from '../signin/signin';
import { HomePage } from '../home/home';

import { vars } from '../../vars';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  loading: Loading;
  erreur: string = "";
  // init formGroups

  public EtudiantForm: FormGroup;
  public EnseignantForm: FormGroup;
  public EntrepriseForm: FormGroup;

  //init General Form Values
  post: any;
  nom: string = "";
  prenom: string = "";
  cin: string = "";
  email: string = "";
  tel: string = "";
  pass: string = "";
  comf_pass: string = "";

  //init Etudiant Form Values

  dateNess: Date = null;
  numInscrit: string = "";
  cy_etud: string = "";
  niv_etud: string = "";
  specialite: string = "";

  //init Enseignant Form Values

  grade: string = "";

  //init Entreprise Form Values

  nomEntreprise: string = "";
  telEntreprise: string = "";
  adresseEntreprise: string = "";
  faxEntreprise: string = "";


  statuses = [
    { name: "Enseignant", value: 'enseignant' },
    { name: "Etudiant", value: 'etudiant' },
    { name: "Entreprise", value: 'entreprise' }
  ]
  status: string = 'Status';
  test: string;


  constructor(private storage: Storage, private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    storage.get('user').then((val) => {
      if (val != null) {
        console.log(val);
        window.location.reload();
        navCtrl.setRoot(HomePage);
      }

    });

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }


  print() {
    console.log("Status", this.status);
  }
  changeStatut() {
    this.status = "Status";
    this.erreur = "";
  }
  public createAccount() {
    this.navCtrl.push(SigninPage);
  }
  submitEtudiant() {

    if (this.nom === "" || this.prenom === "" || this.cin === "" || this.email === "" || this.dateNess === null || this.pass === "" || this.comf_pass === "" || this.tel === "" || this.cy_etud === "" || this.niv_etud === "" || this.specialite === "") { this.erreur = "Rempilr tous les champ !"; }
    else {
      if (this.comf_pass != this.pass)
        this.erreur = "Mot de passe confirmez n'est pas correct !";
      else {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(this.email)) {
          this.erreur = "Email non valid !";
        }
        else {
          this.erreur = "";
        }
      }


    }
    if (this.erreur == "") {
      this.showLoading();
      this.http.post(vars.url + "/api/etudiant",
        {
          "nom": this.nom,
          "prenom": this.prenom,
          "cin": this.cin,
          "email": this.email,
          "password": this.pass,
          "tel": this.tel,
          "date_naiss": this.dateNess,
          "cycle_etude": this.cy_etud,
          "niveau_etude": this.niv_etud,
          "specialite": this.specialite,
        })
        .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          if (response.status == 201) {
            this.http.post(vars.url + '/api/user', {
              "email": this.email,
              "password": this.pass
            }).subscribe(
              res => {
                //this.currentUser = new User('Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com');
                this.storage.set('user', res);
                window.location.reload();
                this.navCtrl.setRoot(HomePage);

              }
              );
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



    console.log("submitEtudiant", this.nom);

  }
  submitEntreprise() {

    if (this.comf_pass != this.pass)
      this.erreur = "Mot de passe confirmez n'est pas correct !";
    else {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.email)) {
        this.erreur = "Email non valid !";
      }
      else {
        this.erreur = "";
      }
    }

    if (this.erreur == "") {
      this.showLoading();
      this.http.post(vars.url + "/api/entreprise",

        {
          "nom": this.nom,
          "prenom": this.prenom,
          "cin": this.cin,
          "email": this.email,
          "password": this.pass,
          "tel": this.tel,
          "nom_ent": this.nomEntreprise,
          "tel_ent": this.telEntreprise,
          "adresse_ent": this.adresseEntreprise,
          "fax_ent": this.faxEntreprise,
        })
        .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          if (response.status == 201 || response.status == 200) {
            this.http.post(vars.url + '/api/user', {
              "email": this.email,
              "password": this.pass
            }).subscribe(
              res => {
                this.storage.set('user', res);
                window.location.reload();
                this.navCtrl.setRoot(HomePage);

              }
              );
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

    if (this.comf_pass != this.pass)
      this.erreur = "Mot de passe confirmez n'est pas correct !";
    else {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.email)) {
        this.erreur = "Email non valid !";
      }
      else {
        this.erreur = "";
      }
    }

    if (this.erreur == "") {
      this.showLoading();
      this.http.post(vars.url + "/api/enseignant",
        {
          "nom": this.nom,
          "prenom": this.prenom,
          "cin": this.cin,
          "email": this.email,
          "password": this.pass,
          "tel": this.tel,
          "grade": this.grade
        })
        .subscribe(

        (val) => {
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          if (response.status == 201 || response.status == 200) {
            this.http.post(vars.url + '/api/user', {
              "email": this.email,
              "password": this.pass
            }).subscribe(
              res => {
                this.storage.set('user', res);
                window.location.reload();
                this.navCtrl.setRoot(HomePage);

              }
              );
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
        });
    }

    //testing forms do not delete!
    console.log("submitEntreprise");

  }


}
