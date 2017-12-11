import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import {IonicStorageModule} from '@ionic/Storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { WelcomePage } from '../pages/welcome/welcome';
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
import { PropStagePage } from '../pages/prop-stage/prop-stage';
import { DisplayStagePage } from '../pages/display-stage/display-stage';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    SignupPage,
    SigninPage,
    SettingProfilePage,
    ListeDemEntreprisePage,
    ListeEnseignantPage,
    ListeEtudiantPage,
    ListeStagePropPage,
    ListeStagePubPage,
    PubStagePage,
    PropStagePage,
    ListeEntreprisePage,
    DisplayStagePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    SignupPage,
    SigninPage,
    SettingProfilePage,
    ListeDemEntreprisePage,
    ListeEnseignantPage,
    ListeEtudiantPage,
    ListeStagePropPage,
    ListeStagePubPage,
    PubStagePage,
    PropStagePage,
    ListeEntreprisePage,
    DisplayStagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
