import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/Storage';

import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { SettingProfilePage } from '../pages/setting-profile/setting-profile';


import { ListeDemEntreprisePage } from '../pages/liste-dem-entreprise/liste-dem-entreprise';
import { ListeEnseignantPage } from '../pages/liste-enseignant/liste-enseignant';
import { ListeEntreprisePage } from '../pages/liste-entreprise/liste-entreprise';
import { ListeEtudiantPage } from '../pages/liste-etudiant/liste-etudiant';
import { ListeStagePropPage } from '../pages/liste-stage-prop/liste-stage-prop';
import { ListeStagePubPage } from '../pages/liste-stage-pub/liste-stage-pub';
import { PubStagePage } from '../pages/pub-stage/pub-stage';


export interface MenuItem {
  title: string;
  component: any;
  color: any;
  type: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;
  
  pages: Array<{
    title: string;
    component: any;
    color: any;
    type: any;
  }>;

  user: any = {};

  constructor(private storage: Storage, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Accueil', component: HomePage, color: 'light', type: -1 },

      { title: 'Liste Etudiants', component: ListeEtudiantPage, color: 'light', type: 0 },
      { title: 'Liste Enseignants', component: ListeEnseignantPage, color: 'light', type: 0 },
      { title: 'Liste Entreprise', component: ListeEntreprisePage, color: 'light', type: 0 },
      { title: 'Liste demandes Entreprise', component: ListeDemEntreprisePage, color: 'light', type: 0 },
      { title: 'Publier Stage', component: PubStagePage, color: 'light', type: 0 },
      { title: 'Liste Stages proposés', component: ListeStagePropPage, color: 'light', type: 0 },
      { title: 'Liste Stages publiés', component: ListeStagePubPage, color: 'light', type: 0 },

      { title: 'Mon Compte', component: SettingProfilePage, color: 'light', type: 1 },
      { title: 'Offres de Stages', component: ListeStagePubPage, color: 'light', type: 1 },

      { title: 'Mon Compte', component: SettingProfilePage, color: 'light', type: 2 },

      { title: 'Mon Compte', component: SettingProfilePage, color: 'light', type: 3 },
      { title: 'Publier Stage', component: PubStagePage, color: 'light', type: 3 },
      { title: 'Liste Stages proposés', component: ListeStagePropPage, color: 'light', type: 3 },
      { title: 'Liste Stages publiés', component: ListeStagePubPage, color: 'light', type: 3 },
      { title: 'Mon Compte', component: SettingProfilePage, color: 'light', type: 4 },
      { title: 'Déconnexion', component: null, color: 'light', type: -1 },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('user').then((val) => {
        this.user = val;
      });
    });
  }

  openPage(page) {
    if (page.component) {
      this.nav.setRoot(page.component);
      page.color = 'dark';

      for (let p of this.pages) {

        if (p.title == page.title) {
          p.color = 'dark';
        }
        else {
          p.color = 'light';
        }

      }
    } else {
      this.storage.clear();
      this.nav.setRoot(WelcomePage);
    }
  }

}
