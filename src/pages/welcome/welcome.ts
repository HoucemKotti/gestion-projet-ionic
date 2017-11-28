import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { SigninPage } from '../signin/signin';
import { Storage } from '@ionic/Storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    storage.get('user').then((val) => {
      if (val != null) { 
        navCtrl.setRoot(HomePage);
      }

    });
  }

  login() {
    this.navCtrl.push(SigninPage);
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
