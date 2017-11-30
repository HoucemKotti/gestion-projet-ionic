import { Component } from '@angular/core';
import { NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { User } from '../../Entities/User';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/Storage';

import { vars } from '../../vars';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  erreur: string = "";
  loading: Loading;
  user = { email: '', password: '' };

  constructor(private storage: Storage, private http: HttpClient, private navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    storage.get('user').then((val) => {
      if (val != null) {
        console.log(val);
        window.location.reload();
        navCtrl.setRoot(HomePage);
      }

    });
  }

  public createAccount() {
    this.navCtrl.push(SignupPage);
  }

  public login() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.user.email)) {
      this.erreur = "Email non valid !";
    }
    else {
      this.erreur = "";
    }

    if (this.erreur == "") {
      this.showLoading();
      this.http.post(vars.url + '/api/user', {
        "email": this.user.email,
        "password": this.user.password
      })
        .subscribe(
        res => {
          let user = res;
          //this.currentUser = new User('Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com');
          if (res != null) {
            this.storage.set('user', res);
            console.log('user' + res);
            this.navCtrl.setRoot(HomePage);
            window.location.reload()
          } else {
            this.showError("Vérifier email ou mot de passe");
          }
        },
        err => {
          this.showError("Problème de connexion");
        },

      );
    }
  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Erreur',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}