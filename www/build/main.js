webpackJsonp([1],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_Storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signin_signin__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__vars__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = (function () {
    function SignupPage(storage, loadingCtrl, navCtrl, navParams, http) {
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.erreur = "";
        this.nom = "";
        this.prenom = "";
        this.cin = "";
        this.email = "";
        this.tel = "";
        this.pass = "";
        this.comf_pass = "";
        //init Etudiant Form Values
        this.dateNess = null;
        this.numInscrit = "";
        this.cy_etud = "";
        this.niv_etud = "";
        this.specialite = "";
        //init Enseignant Form Values
        this.grade = "";
        //init Entreprise Form Values
        this.nomEntreprise = "";
        this.telEntreprise = "";
        this.adresseEntreprise = "";
        this.faxEntreprise = "";
        this.statuses = [
            { name: "Enseignant", value: 'enseignant' },
            { name: "Etudiant", value: 'etudiant' },
            { name: "Entreprise", value: 'entreprise' }
        ];
        this.status = 'Status';
        storage.get('user').then(function (val) {
            if (val != null) {
                console.log(val);
                window.location.reload();
                navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
            }
        });
    }
    SignupPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    SignupPage.prototype.print = function () {
        console.log("Status", this.status);
    };
    SignupPage.prototype.changeStatut = function () {
        this.status = "Status";
        this.erreur = "";
    };
    SignupPage.prototype.createAccount = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__signin_signin__["a" /* SigninPage */]);
    };
    SignupPage.prototype.submitEtudiant = function () {
        var _this = this;
        if (this.nom === "" || this.prenom === "" || this.cin === "" || this.email === "" || this.dateNess === null || this.pass === "" || this.comf_pass === "" || this.tel === "" || this.cy_etud === "" || this.niv_etud === "" || this.specialite === "") {
            this.erreur = "Rempilr tous les champ !";
        }
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
            this.http.post(__WEBPACK_IMPORTED_MODULE_6__vars__["a" /* vars */].url + "/api/etudiant", {
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
                .subscribe(function (val) {
                console.log("POST call successful value returned in body", val);
            }, function (response) {
                if (response.status == 201) {
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_6__vars__["a" /* vars */].url + '/api/user', {
                        "email": _this.email,
                        "password": _this.pass
                    }).subscribe(function (res) {
                        //this.currentUser = new User('Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com');
                        _this.storage.set('user', res);
                        window.location.reload();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                    });
                }
                else {
                    _this.loading.dismiss();
                    if (response.error == "non isims") {
                        _this.erreur = "Etudiant n'est pas inscrit dans l'universite";
                    }
                    else {
                        if (response.error == "user existe") {
                            _this.erreur = "Etudiant déja inscrit";
                        }
                        else
                            _this.erreur = response.error;
                    }
                }
                console.log("POST call in error", response);
            }, function () {
                console.log("The POST observable is now completed.");
            });
        }
        console.log("submitEtudiant", this.nom);
    };
    SignupPage.prototype.submitEntreprise = function () {
        var _this = this;
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
            this.http.post(__WEBPACK_IMPORTED_MODULE_6__vars__["a" /* vars */].url + "/api/entreprise", {
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
                .subscribe(function (val) {
                console.log("POST call successful value returned in body", val);
            }, function (response) {
                if (response.status == 201 || response.status == 200) {
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_6__vars__["a" /* vars */].url + '/api/user', {
                        "email": _this.email,
                        "password": _this.pass
                    }).subscribe(function (res) {
                        _this.storage.set('user', res);
                        window.location.reload();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                    });
                }
                else {
                    _this.loading.dismiss();
                    _this.erreur = "Déja existe";
                }
                console.log("POST call in error", response);
            }, function () {
                console.log("The POST observable is now completed.");
            });
        }
        //testing forms do not delete!
        console.log("submitEntreprise");
    };
    SignupPage.prototype.submitEnseignant = function () {
        var _this = this;
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
            this.http.post(__WEBPACK_IMPORTED_MODULE_6__vars__["a" /* vars */].url + "/api/enseignant", {
                "nom": this.nom,
                "prenom": this.prenom,
                "cin": this.cin,
                "email": this.email,
                "password": this.pass,
                "tel": this.tel,
                "grade": this.grade
            })
                .subscribe(function (val) {
                console.log("POST call successful value returned in body", val);
            }, function (response) {
                if (response.status == 201 || response.status == 200) {
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_6__vars__["a" /* vars */].url + '/api/user', {
                        "email": _this.email,
                        "password": _this.pass
                    }).subscribe(function (res) {
                        _this.storage.set('user', res);
                        window.location.reload();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                    });
                }
                else {
                    _this.loading.dismiss();
                    if (response.error == "non isims") {
                        _this.erreur = "Enseignant n'est pas inscrit dans l'universite";
                    }
                    else {
                        if (response.error == "user existe") {
                            _this.erreur = "Enseignant déja inscrit";
                        }
                        else
                            _this.erreur = response.error;
                    }
                }
                console.log("POST call in error", response);
            }, function () {
                console.log("The POST observable is now completed.");
            });
        }
        //testing forms do not delete!
        console.log("submitEntreprise");
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\signup\signup.html"*/'<!--\n\n  Generated template for the SignupPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar>\n\n        <ion-title>S\'inscrire</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n\n\n<ion-content padding>\n\n    <ng-template *ngIf="status==\'Status\';then Status; "></ng-template>\n\n    <ng-template *ngIf="status==\'enseignant\';then enseignant; "></ng-template>\n\n    <ng-template *ngIf="status==\'etudiant\';then etudiant; "></ng-template>\n\n    <ng-template *ngIf="status==\'entreprise\';then entreprise;"></ng-template>\n\n    <ng-template #Status>\n\n        Choisir votre status\n\n        <ion-item>\n\n            <ion-label>Status</ion-label>\n\n            <ion-select name="etat" [(ngModel)]="status" (ngModelChange)="print()">\n\n                <option disabled selected value="-1">---- Votre Status ----</option>\n\n                <ion-option *ngFor="let statut of statuses" [value]="statut.value">{{statut.name}}</ion-option>\n\n            </ion-select>\n\n        </ion-item>\n\n    </ng-template>\n\n    <ng-template #etudiant>\n\n        <!--<form (ngSubmit)="submitEtudiant()">-->\n\n\n\n        <form (ngSubmit)="submitEtudiant()" #registerForm="ngForm">\n\n            <ion-item>\n\n                <ion-label color="primary">Nom</ion-label>\n\n                <ion-input type="text" [(ngModel)]="nom" name="nom" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Prenom</ion-label>\n\n                <ion-input type="text" [(ngModel)]="prenom" name="prenom" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Cin</ion-label>\n\n                <ion-input type="number" [(ngModel)]="cin" name="cin" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Email</ion-label>\n\n                <ion-input type="email" [(ngModel)]="email" name="email" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Mot de passe</ion-label>\n\n                <ion-input type="password" [(ngModel)]="pass" name="pass" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Confirmer mot de passe</ion-label>\n\n                <ion-input type="password" [(ngModel)]="comf_pass" name="comf_pass" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Tel</ion-label>\n\n                <ion-input type="number" [(ngModel)]="tel" name="tel" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Date de naissance</ion-label>\n\n                <ion-datetime [(ngModel)]="dateNess" name="dateNess" required></ion-datetime>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Cycle </ion-label>\n\n                <ion-input type="text" [(ngModel)]="cy_etud" name="cy_etud" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Niveau d\'étude</ion-label>\n\n                <ion-input type="text" [(ngModel)]="niv_etud" name="niv_etud" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Specialite</ion-label>\n\n                <ion-input type="text" [(ngModel)]="specialite" name="specialite"></ion-input>\n\n            </ion-item>\n\n\n\n            <div *ngIf=\'erreur != ""\'>\n\n                <ion-card>\n\n                    <ion-card-content>\n\n                        {{erreur}}\n\n                    </ion-card-content>\n\n                </ion-card>\n\n            </div>\n\n            <button ion-button type="submit" block [disabled]="!registerForm.form.valid">Inscription</button>\n\n        </form>\n\n        <button ion-button color="dark" (click)="changeStatut()" block>\n\n      Return\n\n    </button>\n\n        <button ion-button class="register-btn" block clear (click)="createAccount()">Déja inscrire, Connexion</button>\n\n\n\n    </ng-template>\n\n\n\n    <ng-template #entreprise>\n\n        <form (ngSubmit)="submitEntreprise()" #registerFormEntreprise="ngForm">\n\n            <ion-item>\n\n                <ion-label color="primary">Nom</ion-label>\n\n                <ion-input type="text" [(ngModel)]="nom" name="nom" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Prenom</ion-label>\n\n                <ion-input type="text" [(ngModel)]="prenom" name="prenom" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Cin</ion-label>\n\n                <ion-input type="number" [(ngModel)]="cin" name="cin" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Email</ion-label>\n\n                <ion-input type="email" [(ngModel)]="email" name="email" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Mot de passe</ion-label>\n\n                <ion-input type="password" [(ngModel)]="pass" name="pass" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Confirmer mot de passe</ion-label>\n\n                <ion-input type="password" [(ngModel)]="comf_pass" name="comf_pass" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Tel</ion-label>\n\n                <ion-input type="number" [(ngModel)]="tel" name="tel"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Nom Entreprise</ion-label>\n\n                <ion-input [(ngModel)]="nomEntreprise" name="nomEntreprise" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Tel Entreprise </ion-label>\n\n                <ion-input type="text" [(ngModel)]="telEntreprise" name="telEntreprise" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Adresse Entreprise</ion-label>\n\n                <ion-input type="text" [(ngModel)]="adresseEntreprise" name="adresseEntreprise" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Fax Entreprise</ion-label>\n\n                <ion-input type="number" [(ngModel)]="faxEntreprise" name="faxEntreprise"></ion-input>\n\n            </ion-item>\n\n\n\n            <div *ngIf=\'erreur != ""\'>\n\n                <ion-card>\n\n                    <ion-card-content>\n\n                        {{erreur}}\n\n                    </ion-card-content>\n\n                </ion-card>\n\n            </div>\n\n            <button ion-button type="submit" block [disabled]="!registerFormEntreprise.form.valid">Inscription</button>\n\n        </form>\n\n        <button ion-button color="dark" (click)="changeStatut()" block>\n\n      Return\n\n    </button>\n\n        <button ion-button class="register-btn" block clear (click)="createAccount()">Déja inscrire, Connexion</button>\n\n\n\n    </ng-template>\n\n\n\n    <ng-template #enseignant>\n\n        <form (ngSubmit)="submitEnseignant()" #registerFormEnseignante="ngForm">\n\n            <ion-item>\n\n                <ion-label color="primary">Nom</ion-label>\n\n                <ion-input type="text" [(ngModel)]="nom" name="nom" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Prenom</ion-label>\n\n                <ion-input type="text" [(ngModel)]="prenom" name="prenom" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Cin</ion-label>\n\n                <ion-input type="number" [(ngModel)]="cin" name="cin" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Email</ion-label>\n\n                <ion-input type="email" [(ngModel)]="email" name="email" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Mot de passe</ion-label>\n\n                <ion-input type="password" [(ngModel)]="pass" name="pass" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Confirmer mot de passe</ion-label>\n\n                <ion-input type="password" [(ngModel)]="comf_pass" name="comf_pass" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Tel</ion-label>\n\n                <ion-input type="number" [(ngModel)]="tel" name="tel"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Grade</ion-label>\n\n                <ion-input type="text" [(ngModel)]="grade" name="grade"></ion-input>\n\n            </ion-item>\n\n\n\n            <div *ngIf=\'erreur != ""\'>\n\n                <ion-card>\n\n                    <ion-card-content>\n\n                        {{erreur}}\n\n                    </ion-card-content>\n\n                </ion-card>\n\n            </div>\n\n            <button ion-button type="submit" block [disabled]="!registerFormEnseignante.form.valid">Inscription</button>\n\n        </form>\n\n        <button ion-button color="dark" (click)="changeStatut()" block>\n\n      Return\n\n    </button>\n\n        <button ion-button class="register-btn" block clear (click)="createAccount()">Déja inscrire, Connexion</button>\n\n\n\n    </ng-template>\n\n</ion-content>'/*ion-inline-end:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_Storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_Storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__vars__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SigninPage = (function () {
    function SigninPage(storage, http, navCtrl, navParams, auth, alertCtrl, loadingCtrl) {
        this.storage = storage;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.erreur = "";
        this.user = { email: '', password: '' };
        storage.get('user').then(function (val) {
            if (val != null) {
                console.log(val);
                window.location.reload();
                navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
            }
        });
    }
    SigninPage.prototype.createAccount = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */]);
    };
    SigninPage.prototype.login = function () {
        var _this = this;
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(this.user.email)) {
            this.erreur = "Email non valid !";
        }
        else {
            this.erreur = "";
        }
        this.erreur = "";
        if (this.erreur == "") {
            this.showLoading();
            this.http.post(__WEBPACK_IMPORTED_MODULE_7__vars__["a" /* vars */].url + '/api/user', {
                "email": this.user.email,
                "password": this.user.password
            })
                .subscribe(function (res) {
                var user = res;
                //this.currentUser = new User('Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com');
                if (res != null) {
                    _this.storage.set('user', res);
                    console.log('user' + res);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                    window.location.reload();
                }
                else {
                    _this.showError("Vérifier email ou mot de passe");
                }
            }, function (err) {
                _this.showError("Problème de connexion");
            });
        }
    };
    SigninPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    SigninPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Erreur',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    SigninPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signin',template:/*ion-inline-start:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\signin\signin.html"*/'<!--\n\n  Generated template for the SigninPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar>\n\n        <ion-title>signin</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content class="login-content" padding>\n\n    <ion-row class="logo-row">\n\n        <ion-col></ion-col>\n\n        <ion-col width-67>\n\n            <img src="assets/images/logo.png" />\n\n        </ion-col>\n\n        <ion-col></ion-col>\n\n    </ion-row>\n\n    <div class="login-box">\n\n        <form (ngSubmit)="login()" #registerForm="ngForm">\n\n            <ion-row>\n\n                <ion-col>\n\n                    <ion-list inset>\n\n\n\n                        <ion-item>\n\n                            <ion-input type="text" placeholder="Email" name="email" [(ngModel)]="user.email" required></ion-input>\n\n                        </ion-item>\n\n\n\n                        <ion-item>\n\n                            <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="user.password" required></ion-input>\n\n                        </ion-item>\n\n\n\n                    </ion-list>\n\n                </ion-col>\n\n            </ion-row>\n\n            <div *ngIf=\'erreur != ""\'>\n\n                <ion-card>\n\n                    <ion-card-content>\n\n                        {{erreur}}\n\n                    </ion-card-content>\n\n                </ion-card>\n\n            </div>\n\n            <ion-row>\n\n                <ion-col class="signup-col">\n\n                    <button ion-button full type="submit" [disabled]="!registerForm.form.valid">Login</button>\n\n                </ion-col>\n\n            </ion-row>\n\n\n\n        </form>\n\n        <button ion-button full clear (click)="createAccount()">Créer compte</button>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\signin\signin.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_Storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_Storage__["b" /* Storage */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _g || Object])
    ], SigninPage);
    return SigninPage;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_Storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vars__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SettingProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingProfilePage = (function () {
    function SettingProfilePage(loadingCtrl, storage, navCtrl, navParams, http) {
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.user = {};
        this.erreur = "";
        this.success = "";
    }
    SettingProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('user').then(function (val) {
            _this.user = val;
            console.log("aff" + JSON.stringify(_this.user));
        });
    };
    SettingProfilePage.prototype.submitEtudiant = function () {
        var _this = this;
        this.success = "";
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(this.user.email)) {
            this.erreur = "Email non valid !";
        }
        else {
            this.erreur = "";
        }
        if (this.erreur == "") {
            this.showLoading();
            this.http.put(__WEBPACK_IMPORTED_MODULE_3__vars__["a" /* vars */].url + "/api/etudiant/" + this.user.id, {
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
                .subscribe(function (val) {
                console.log("POST call successful value returned in body", val);
            }, function (response) {
                if (response.status == 201 || response.status == 200) {
                    _this.loading.dismiss();
                    _this.storage.set('user', _this.user);
                    _this.success = "true";
                }
                else {
                    _this.loading.dismiss();
                    if (response.error == "non isims") {
                        _this.erreur = "Etudiant n'est pas inscrit dans l'universite";
                    }
                    else {
                        if (response.error == "user existe") {
                            _this.erreur = "Etudiant déja inscrit";
                        }
                        else
                            _this.erreur = response.error;
                    }
                }
                console.log("POST call in error", response);
            }, function () {
                console.log("The POST observable is now completed.");
            });
        }
        console.log("submitEtudiant", this.user.nom);
    };
    SettingProfilePage.prototype.submitEntreprise = function () {
        var _this = this;
        this.success = "";
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(this.user.email)) {
            this.erreur = "Email non valid !";
        }
        else {
            this.erreur = "";
        }
        if (this.erreur == "") {
            this.showLoading();
            this.http.put(__WEBPACK_IMPORTED_MODULE_3__vars__["a" /* vars */].url + "/api/entreprise/" + this.user.id, {
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
                .subscribe(function (val) {
                console.log("POST call successful value returned in body", val);
            }, function (response) {
                if (response.status == 201 || response.status == 200) {
                    _this.loading.dismiss();
                    _this.storage.set('user', _this.user);
                    _this.success = "true";
                }
                else {
                    _this.loading.dismiss();
                    _this.erreur = "Déja existe";
                }
                console.log("POST call in error", response);
            }, function () {
                console.log("The POST observable is now completed.");
            });
        }
        //testing forms do not delete!
        console.log("submitEntreprise");
    };
    SettingProfilePage.prototype.submitEnseignant = function () {
        var _this = this;
        this.success = "";
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(this.user.email)) {
            this.erreur = "Email non valid !";
        }
        else {
            this.erreur = "";
        }
        if (this.erreur == "") {
            this.showLoading();
            this.http.put(__WEBPACK_IMPORTED_MODULE_3__vars__["a" /* vars */].url + "/api/enseignant/" + this.user.id, {
                "nom": this.user.nom,
                "prenom": this.user.prenom,
                "cin": this.user.cin,
                "email": this.user.email,
                "password": this.user.password,
                "tel": this.user.tel,
                "grade": this.user.grade
            })
                .subscribe(function (res) {
                console.log(res);
                if (res == 200) {
                    _this.loading.dismiss();
                    _this.storage.set('user', _this.user);
                    _this.success = "true";
                }
                else {
                    _this.loading.dismiss();
                    if (res == "non isims") {
                        _this.erreur = "Enseignant n'est pas inscrit dans l'universite";
                    }
                    else {
                        if (res == "user existe") {
                            _this.erreur = "Enseignant déja inscrit";
                        }
                        else
                            _this.erreur = JSON.stringify(res);
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
    };
    SettingProfilePage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    SettingProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-setting-profile',template:/*ion-inline-start:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\setting-profile\setting-profile.html"*/'<!--\n\n  Generated template for the SettingProfilePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n        <ion-title>Mon compte</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <div *ngIf=\'success != ""\'>\n\n        <ion-card>\n\n            <ion-card-content class="success-content">\n\n                Modification avec succes\n\n            </ion-card-content>\n\n        </ion-card>\n\n    </div>\n\n\n\n    <ng-template *ngIf="user.type==1;then etudiant; "></ng-template>\n\n    <ng-template *ngIf="user.type==2;then enseignant; "></ng-template>\n\n    <ng-template *ngIf="user.type==3 || user.type==4;then entreprise;"></ng-template>\n\n\n\n\n\n    <ng-template #etudiant>\n\n        <!--<form (ngSubmit)="submitEtudiant()">-->\n\n\n\n        <form (ngSubmit)="submitEtudiant()" #registerForm="ngForm">\n\n            <ion-item>\n\n                <ion-label color="primary">Nom</ion-label>\n\n                <ion-input type="text" [(ngModel)]="user.nom" name="nom" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Prenom</ion-label>\n\n                <ion-input type="text" [(ngModel)]="user.prenom" name="prenom" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Cin</ion-label>\n\n                <ion-input type="number" [(ngModel)]="user.cin" name="cin" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Email</ion-label>\n\n                <ion-input type="email" [(ngModel)]="user.email" name="email" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Tel</ion-label>\n\n                <ion-input type="number" [(ngModel)]="user.tel" name="tel" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Date de naissance</ion-label>\n\n                <ion-datetime [(ngModel)]="user.date_naiss" name="dateNess" required></ion-datetime>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Cycle </ion-label>\n\n                <ion-input type="text" [(ngModel)]="user.cycle_etude" name="cy_etud" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Niveau d\'étude</ion-label>\n\n                <ion-input type="text" [(ngModel)]="user.niveau_etude" name="niv_etud"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Specialite</ion-label>\n\n                <ion-input type="text" [(ngModel)]="user.specialite" name="specialite"></ion-input>\n\n            </ion-item>\n\n\n\n            <div *ngIf=\'erreur != ""\'>\n\n                <ion-card>\n\n                    <ion-card-content class="erreur-content">\n\n                        {{erreur}}\n\n                    </ion-card-content>\n\n                </ion-card>\n\n            </div>\n\n            <button ion-button type="submit" block [disabled]="!registerForm.form.valid">Modifier</button>\n\n        </form>\n\n    </ng-template>\n\n\n\n    <ng-template #entreprise>\n\n        <form (ngSubmit)="submitEntreprise()" #registerFormEntreprise="ngForm">\n\n            <ion-item>\n\n                <ion-label color="primary">Nom</ion-label>\n\n                <ion-input type="text" [(ngModel)]="user.nom" name="nom" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Prenom</ion-label>\n\n                <ion-input type="text" [(ngModel)]="user.prenom" name="prenom" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Cin</ion-label>\n\n                <ion-input type="number" [(ngModel)]="user.cin" name="cin" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Email</ion-label>\n\n                <ion-input type="email" [(ngModel)]="user.email" name="email" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Tel</ion-label>\n\n                <ion-input type="number" [(ngModel)]="user.tel" name="tel"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Nom Entreprise</ion-label>\n\n                <ion-input [(ngModel)]="user.nom_ent" name="nomEntreprise" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Tel Entreprise </ion-label>\n\n                <ion-input type="text" [(ngModel)]="user.tel_ent" name="telEntreprise" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Adresse Entreprise</ion-label>\n\n                <ion-input type="text" [(ngModel)]="user.adresse_ent" name="adresseEntreprise" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Fax Entreprise</ion-label>\n\n                <ion-input type="number" [(ngModel)]="user.fax_ent" name="faxEntreprise"></ion-input>\n\n            </ion-item>\n\n\n\n            <div *ngIf=\'erreur != ""\'>\n\n                <ion-card>\n\n                    <ion-card-content class="erreur-content">\n\n                        {{erreur}}\n\n                    </ion-card-content>\n\n                </ion-card>\n\n            </div>\n\n            <button ion-button type="submit" block [disabled]="!registerFormEntreprise.form.valid">Modifier</button>\n\n        </form>\n\n    </ng-template>\n\n\n\n    <ng-template #enseignant>\n\n        <form (ngSubmit)="submitEnseignant()" #registerFormEnseignante="ngForm">\n\n            <ion-item>\n\n                <ion-label color="primary">Nom</ion-label>\n\n                <ion-input type="text" [(ngModel)]="user.nom" name="nom" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Prenom</ion-label>\n\n                <ion-input type="text" [(ngModel)]="user.prenom" name="prenom" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Cin</ion-label>\n\n                <ion-input type="number" [(ngModel)]="user.cin" name="cin" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Email</ion-label>\n\n                <ion-input type="email" [(ngModel)]="user.email" name="email" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Tel</ion-label>\n\n                <ion-input type="number" [(ngModel)]="user.tel" name="tel" required></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary">Grade</ion-label>\n\n                <ion-input type="text" [(ngModel)]="user.grade" name="grade" required></ion-input>\n\n            </ion-item>\n\n\n\n            <div *ngIf=\'erreur != ""\'>\n\n                <ion-card>\n\n                    <ion-card-content class="erreur-content">\n\n                        {{erreur}}\n\n                    </ion-card-content>\n\n                </ion-card>\n\n            </div>\n\n            <button ion-button type="submit" block [disabled]="!registerFormEnseignante.form.valid">Modifier</button>\n\n        </form>\n\n    </ng-template>\n\n</ion-content>'/*ion-inline-end:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\setting-profile\setting-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__ionic_Storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]])
    ], SettingProfilePage);
    return SettingProfilePage;
}());

//# sourceMappingURL=setting-profile.js.map

/***/ }),

/***/ 119:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 119;

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/setting-profile/setting-profile.module": [
		296,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 160;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signin_signin__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_Storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WelcomePage = (function () {
    function WelcomePage(storage, navCtrl, navParams) {
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        storage.get('user').then(function (val) {
            if (val != null) {
                navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
            }
        });
    }
    WelcomePage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__signin_signin__["a" /* SigninPage */]);
    };
    WelcomePage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignupPage */]);
    };
    WelcomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WelcomePage');
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-welcome',template:/*ion-inline-start:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\welcome\welcome.html"*/'<!--\n\n  Generated template for the WelcomePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n\n\n<ion-content padding id="welcome">\n\n  <br>\n\n  <img src="assets/imgs/logo.png" class="logo" />\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col>\n\n        <h5>Bienvenu dans notre application !</h5>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n<br>\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col center text-center>\n\n        <button ion-button full class="btn1" color="lightText" (click)="login()">Se Connecter</button>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col center text-center>\n\n        <button ion-button full class="btn2"  (click)="signup()">S\'inscrire</button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n\n\n-->\n\n\n\n\n\n<ion-content class="login-content" padding>\n\n    <ion-row class="logo-row">\n\n        <ion-col></ion-col>\n\n        <ion-col width-67>\n\n            <img src="assets/images/logo.png" />\n\n        </ion-col>\n\n        <ion-col></ion-col>\n\n    </ion-row>\n\n    <ion-grid>\n\n        <ion-row>\n\n            <ion-col>\n\n                <!--<h5>Bienvenu dans notre application gestion stage !</h5>-->\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n    <div>\n\n        <ion-row class="btn-row">\n\n            <ion-col class="login-col">\n\n                <button ion-button class="login-btn" full (click)="login()">Se Connecter</button>\n\n            </ion-col>\n\n        </ion-row>\n\n\n\n        <ion-row>\n\n            <ion-col class="signup-col">\n\n                <button ion-button class="signup-btn" full (click)="signup()">S\'inscrire</button>\n\n            </ion-col>\n\n        </ion-row>\n\n\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\welcome\welcome.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_Storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var apiUrl = 'http://127.0.0.1:8000/api/user/123456&123456';
var AuthServiceProvider = (function () {
    function AuthServiceProvider(http) {
        this.http = http;
        console.log('Hello AuthServiceProvider Provider');
    }
    AuthServiceProvider.prototype.getUser = function () {
        return this.http.get('http://127.0.0.1:8000/api/user/123456&123456')
            .map(function (res) { return res; });
    };
    AuthServiceProvider.prototype.login = function (credentials) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            _this.http.get(apiUrl)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    /*
      public login(credentials) {
        if (credentials.email === null || credentials.password === null) {
          return Observable.throw("Please insert credentials");
        } else {
          this.http.get('http://127.0.0.1:8000/api/user/123456&123456').subscribe(
            (val) => {
              console.log("POST call successful value returned in body",
                val);
    
            },
            response => {
              console.log("POST call in error", response);
            },
            () => {
              console.log("The POST observable is now completed.");
              
            });
            return Observable.create(observer => {
              // At this point make a request to your backend to make a real check!
              let access = (credentials.password === "pass" && credentials.email === "email");
              this.currentUser = new User('Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com', 'Simon', 'saimon@devdactic.com');
              observer.next(access);
              observer.complete();
            });
        }
      }
    */
    AuthServiceProvider.prototype.register = function (param) {
        if (param.email === null || param.password === null) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw("Tous les champs sont obligateur");
        }
        else {
            // At this point store the credentials to your backend!
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
                observer.next(true);
                observer.complete();
            });
        }
    };
    AuthServiceProvider.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    AuthServiceProvider.prototype.logout = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            _this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    };
    AuthServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListeDemEntreprisePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vars__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ListeDemEntreprisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ListeDemEntreprisePage = (function () {
    function ListeDemEntreprisePage(loadingCtrl, navCtrl, navParams, http) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
    }
    ListeDemEntreprisePage_1 = ListeDemEntreprisePage;
    ListeDemEntreprisePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListeDemEntreprisePage');
        this.getAllEntreprises();
    };
    ListeDemEntreprisePage.prototype.getAllEntreprises = function () {
        var _this = this;
        this.http.get(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* vars */].url + "/api/entreprise/all/4").subscribe(function (res) {
            _this.Entreprises = res;
            console.log("etu" + _this.Entreprises);
        }, function (err) {
            console.log("Problème de connexion");
        });
    };
    ListeDemEntreprisePage.prototype.updateEntreprises = function (id) {
        var _this = this;
        this.showLoading();
        this.http.put(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* vars */].url + "/api/entreprise/" + id, {
            "type": 3,
        })
            .subscribe(function (val) {
            console.log("POST call successful value returned in body", val);
        }, function (response) {
            _this.loading.dismiss();
            _this.navCtrl.setRoot(ListeDemEntreprisePage_1);
            console.log("POST call in error", response);
        }, function () {
            console.log("The POST observable is now completed.");
        });
    };
    ListeDemEntreprisePage.prototype.deleteEntreprises = function (id) {
        var _this = this;
        this.showLoading();
        this.http.delete(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* vars */].url + "/api/entreprise/" + id)
            .subscribe(function (val) {
            console.log("POST call successful value returned in body", val);
        }, function (response) {
            _this.loading.dismiss();
            _this.navCtrl.setRoot(ListeDemEntreprisePage_1);
            console.log("POST call in error", response);
        }, function () {
            console.log("The POST observable is now completed.");
        });
    };
    ListeDemEntreprisePage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    ListeDemEntreprisePage = ListeDemEntreprisePage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-liste-dem-entreprise',template:/*ion-inline-start:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\liste-dem-entreprise\liste-dem-entreprise.html"*/'<!--\n\n  Generated template for the ListeDemEntreprisePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Liste demandes Entreprise</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <ion-content padding>\n\n        <ion-list>\n\n            <!--<button ion-item *ngFor="let item of Entreprises">\n\n                    {{item.nom}} {{item.prenom}} \n\n                    <div class="item-note" item-end>\n\n                        {{item.nom_ent}}\n\n                      </div> \n\n                  </button>-->\n\n\n\n            <ion-item *ngFor="let item of Entreprises">\n\n                <h2>{{item.nom}} {{item.prenom}} </h2>\n\n                <h1>{{item.nom_ent}}</h1>\n\n                <button ion-button color="secondary" (click)="updateEntreprises(item.id)" icon-start item-end>\n\n                    <ion-icon name=\'checkmark\'></ion-icon>\n\n                    Accepter\n\n                  </button><button ion-button color="danger" (click)="deleteEntreprises(item.id)" icon-start item-end>\n\n                      <ion-icon name=\'close\'></ion-icon>\n\n                      Refuser\n\n                    </button>\n\n            </ion-item>\n\n        </ion-list>\n\n    </ion-content>\n\n</ion-content>'/*ion-inline-end:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\liste-dem-entreprise\liste-dem-entreprise.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], ListeDemEntreprisePage);
    return ListeDemEntreprisePage;
    var ListeDemEntreprisePage_1;
}());

//# sourceMappingURL=liste-dem-entreprise.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListeEnseignantPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vars__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
/**
 * Generated class for the ListeEnseignantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ListeEnseignantPage = (function () {
    function ListeEnseignantPage(http, navCtrl, navParams) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ListeEnseignantPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListeEnseignantPage');
        this.getAllEnseignants();
    };
    ListeEnseignantPage.prototype.getAllEnseignants = function () {
        var _this = this;
        this.http.get(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* vars */].url + "/api/enseignant").subscribe(function (res) {
            _this.Enseignant = res;
            console.log(_this.Enseignant);
        }, function (err) {
            console.log("Problème de connexion");
        });
    };
    ListeEnseignantPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-liste-enseignant',template:/*ion-inline-start:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\liste-enseignant\liste-enseignant.html"*/'<!--\n\n  Generated template for the ListeEnseignantPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Liste Enseignants</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <ion-list>\n\n        <button ion-item *ngFor="let item of Enseignant">\n\n          <ion-icon ios="ios-contact" md="md-contact"></ion-icon>\n\n            {{item.nom}} {{item.prenom}} \n\n            <div class="item-note" item-end>\n\n                {{item.grade}}\n\n              </div> \n\n          </button>\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\liste-enseignant\liste-enseignant.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ListeEnseignantPage);
    return ListeEnseignantPage;
}());

//# sourceMappingURL=liste-enseignant.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListeEntreprisePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vars__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ListeEntreprisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ListeEntreprisePage = (function () {
    function ListeEntreprisePage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
    }
    ListeEntreprisePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListeEntreprisePage');
        this.getAllEntreprises();
    };
    ListeEntreprisePage.prototype.getAllEntreprises = function () {
        var _this = this;
        this.http.get(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* vars */].url + "/api/entreprise/all/3").subscribe(function (res) {
            _this.Entreprises = res;
            console.log("etu" + _this.Entreprises);
        }, function (err) {
            console.log("Problème de connexion");
        });
    };
    ListeEntreprisePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-liste-entreprise',template:/*ion-inline-start:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\liste-entreprise\liste-entreprise.html"*/'<!--\n\n  Generated template for the ListeEntreprisePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Liste Entreprise</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <ion-list>\n\n        <button ion-item *ngFor="let item of Entreprises"> \n\n                {{item.nom}} {{item.prenom}} \n\n                <div class="item-note" item-end>\n\n                    {{item.nom_ent}}\n\n                  </div> \n\n              </button>\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\liste-entreprise\liste-entreprise.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], ListeEntreprisePage);
    return ListeEntreprisePage;
}());

//# sourceMappingURL=liste-entreprise.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListeEtudiantPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vars__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ListeEtudiantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ListeEtudiantPage = (function () {
    function ListeEtudiantPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
    }
    ListeEtudiantPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListeEtudiantPage');
        this.getAllEtudiants();
    };
    ListeEtudiantPage.prototype.getAllEtudiants = function () {
        var _this = this;
        this.http.get(__WEBPACK_IMPORTED_MODULE_2__vars__["a" /* vars */].url + "/api/etudiant").subscribe(function (res) {
            _this.Etudiants = res;
            console.log("etu" + _this.Etudiants);
        }, function (err) {
            console.log("Problème de connexion");
        });
    };
    ListeEtudiantPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-liste-etudiant',template:/*ion-inline-start:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\liste-etudiant\liste-etudiant.html"*/'<!--\n\n  Generated template for the ListeEtudiantPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Liste Etudiants </ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n    <ion-list>\n\n        <button ion-item *ngFor="let item of Etudiants">\n\n          <ion-icon ios="ios-contact" md="md-contact"></ion-icon>\n\n            {{item.nom}} {{item.prenom}} \n\n            <div class="item-note" item-end>\n\n                {{item.niveau_etude}} {{item.specialite}}\n\n              </div> \n\n          </button>\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\liste-etudiant\liste-etudiant.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], ListeEtudiantPage);
    return ListeEtudiantPage;
}());

//# sourceMappingURL=liste-etudiant.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListeStagePropPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ListeStagePropPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ListeStagePropPage = (function () {
    function ListeStagePropPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ListeStagePropPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListeStagePropPage');
    };
    ListeStagePropPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-liste-stage-prop',template:/*ion-inline-start:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\liste-stage-prop\liste-stage-prop.html"*/'<!--\n\n  Generated template for the ListeStagePropPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Liste stage proposés </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\liste-stage-prop\liste-stage-prop.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ListeStagePropPage);
    return ListeStagePropPage;
}());

//# sourceMappingURL=liste-stage-prop.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListeStagePubPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ListeStagePubPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ListeStagePubPage = (function () {
    function ListeStagePubPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ListeStagePubPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListeStagePubPage');
    };
    ListeStagePubPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-liste-stage-pub',template:/*ion-inline-start:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\liste-stage-pub\liste-stage-pub.html"*/'<!--\n\n  Generated template for the ListeStagePubPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>List Stage</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\liste-stage-pub\liste-stage-pub.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ListeStagePubPage);
    return ListeStagePubPage;
}());

//# sourceMappingURL=liste-stage-pub.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PubStagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the PubStagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PubStagePage = (function () {
    function PubStagePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    PubStagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PubStagePage');
    };
    PubStagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-pub-stage',template:/*ion-inline-start:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\pub-stage\pub-stage.html"*/'<!--\n\n  Generated template for the PubStagePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Publier Stage</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\pub-stage\pub-stage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], PubStagePage);
    return PubStagePage;
}());

//# sourceMappingURL=pub-stage.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(235);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_Storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_list_list__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_welcome_welcome__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_signin_signin__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_setting_profile_setting_profile__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_liste_dem_entreprise_liste_dem_entreprise__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_liste_enseignant_liste_enseignant__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_liste_entreprise_liste_entreprise__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_liste_etudiant_liste_etudiant__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_liste_stage_prop_liste_stage_prop__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_liste_stage_pub_liste_stage_pub__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_pub_stage_pub_stage__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_auth_service_auth_service__ = __webpack_require__(205);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_setting_profile_setting_profile__["a" /* SettingProfilePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_liste_dem_entreprise_liste_dem_entreprise__["a" /* ListeDemEntreprisePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_liste_enseignant_liste_enseignant__["a" /* ListeEnseignantPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_liste_etudiant_liste_etudiant__["a" /* ListeEtudiantPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_liste_stage_prop_liste_stage_prop__["a" /* ListeStagePropPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_liste_stage_pub_liste_stage_pub__["a" /* ListeStagePubPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_pub_stage_pub_stage__["a" /* PubStagePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_liste_entreprise_liste_entreprise__["a" /* ListeEntreprisePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/setting-profile/setting-profile.module#SettingProfilePageModule', name: 'SettingProfilePage', segment: 'setting-profile', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_Storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_setting_profile_setting_profile__["a" /* SettingProfilePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_liste_dem_entreprise_liste_dem_entreprise__["a" /* ListeDemEntreprisePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_liste_enseignant_liste_enseignant__["a" /* ListeEnseignantPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_liste_etudiant_liste_etudiant__["a" /* ListeEtudiantPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_liste_stage_prop_liste_stage_prop__["a" /* ListeStagePropPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_liste_stage_pub_liste_stage_pub__["a" /* ListeStagePubPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_pub_stage_pub_stage__["a" /* PubStagePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_liste_entreprise_liste_entreprise__["a" /* ListeEntreprisePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_21__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_Storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_setting_profile_setting_profile__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_liste_dem_entreprise_liste_dem_entreprise__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_liste_enseignant_liste_enseignant__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_liste_entreprise_liste_entreprise__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_liste_etudiant_liste_etudiant__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_liste_stage_prop_liste_stage_prop__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_liste_stage_pub_liste_stage_pub__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_pub_stage_pub_stage__ = __webpack_require__(212);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var MyApp = (function () {
    function MyApp(storage, platform, statusBar, splashScreen) {
        this.storage = storage;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__["a" /* WelcomePage */];
        this.user = {};
        this.initializeApp();
        this.pages = [
            { title: 'Accueil', component: __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */], color: 'light', type: -1 },
            { title: 'Liste Etudiants', component: __WEBPACK_IMPORTED_MODULE_11__pages_liste_etudiant_liste_etudiant__["a" /* ListeEtudiantPage */], color: 'light', type: 0 },
            { title: 'Liste Enseignants', component: __WEBPACK_IMPORTED_MODULE_9__pages_liste_enseignant_liste_enseignant__["a" /* ListeEnseignantPage */], color: 'light', type: 0 },
            { title: 'Liste Entreprise', component: __WEBPACK_IMPORTED_MODULE_10__pages_liste_entreprise_liste_entreprise__["a" /* ListeEntreprisePage */], color: 'light', type: 0 },
            { title: 'Liste demandes Entreprise', component: __WEBPACK_IMPORTED_MODULE_8__pages_liste_dem_entreprise_liste_dem_entreprise__["a" /* ListeDemEntreprisePage */], color: 'light', type: 0 },
            { title: 'Publier Stage', component: __WEBPACK_IMPORTED_MODULE_14__pages_pub_stage_pub_stage__["a" /* PubStagePage */], color: 'light', type: 0 },
            { title: 'Liste Stages proposés', component: __WEBPACK_IMPORTED_MODULE_12__pages_liste_stage_prop_liste_stage_prop__["a" /* ListeStagePropPage */], color: 'light', type: 0 },
            { title: 'Liste Stages publiés', component: __WEBPACK_IMPORTED_MODULE_13__pages_liste_stage_pub_liste_stage_pub__["a" /* ListeStagePubPage */], color: 'light', type: 0 },
            { title: 'Mon Compte', component: __WEBPACK_IMPORTED_MODULE_7__pages_setting_profile_setting_profile__["a" /* SettingProfilePage */], color: 'light', type: 1 },
            { title: 'Offres de Stages', component: __WEBPACK_IMPORTED_MODULE_13__pages_liste_stage_pub_liste_stage_pub__["a" /* ListeStagePubPage */], color: 'light', type: 1 },
            { title: 'Mon Compte', component: __WEBPACK_IMPORTED_MODULE_7__pages_setting_profile_setting_profile__["a" /* SettingProfilePage */], color: 'light', type: 2 },
            { title: 'Mon Compte', component: __WEBPACK_IMPORTED_MODULE_7__pages_setting_profile_setting_profile__["a" /* SettingProfilePage */], color: 'light', type: 3 },
            { title: 'Publier Stage', component: __WEBPACK_IMPORTED_MODULE_14__pages_pub_stage_pub_stage__["a" /* PubStagePage */], color: 'light', type: 3 },
            { title: 'Liste Stages proposés', component: __WEBPACK_IMPORTED_MODULE_12__pages_liste_stage_prop_liste_stage_prop__["a" /* ListeStagePropPage */], color: 'light', type: 3 },
            { title: 'Liste Stages publiés', component: __WEBPACK_IMPORTED_MODULE_13__pages_liste_stage_pub_liste_stage_pub__["a" /* ListeStagePubPage */], color: 'light', type: 3 },
            { title: 'Mon Compte', component: __WEBPACK_IMPORTED_MODULE_7__pages_setting_profile_setting_profile__["a" /* SettingProfilePage */], color: 'light', type: 4 },
            { title: 'Déconnexion', component: null, color: 'light', type: -1 },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.storage.get('user').then(function (val) {
                _this.user = val;
            });
        });
    };
    MyApp.prototype.openPage = function (page) {
        if (page.component) {
            this.nav.setRoot(page.component);
            page.color = 'dark';
            for (var _i = 0, _a = this.pages; _i < _a.length; _i++) {
                var p = _a[_i];
                if (p.title == page.title) {
                    p.color = 'dark';
                }
                else {
                    p.color = 'light';
                }
            }
        }
        else {
            this.storage.clear();
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__["a" /* WelcomePage */]);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\xampp\htdocs\gestion-projet-ionic\src\app\app.html"*/'<ion-menu [content]="content">\n\n    <ion-header>\n\n        <ion-toolbar>\n\n            <ion-title>Menu</ion-title>\n\n        </ion-toolbar>\n\n    </ion-header>\n\n\n\n    <ion-content>\n\n       \n\n        <ion-list>\n\n            <a *ngFor="let p of pages">\n\n                <button menuClose ion-item color={{p.color}} *ngIf="p?.type==-1 || p.type==user?.type" (click)="openPage(p)">\n\n                  {{p.title}}\n\n                 </button>\n\n            </a>\n\n        </ion-list>\n\n    </ion-content>\n\n\n\n\n\n\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"D:\xampp\htdocs\gestion-projet-ionic\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_Storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\list\list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>List</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n\n      {{item.title}}\n\n      <div class="item-note" item-end>\n\n        {{item.note}}\n\n      </div>\n\n    </button>\n\n  </ion-list>\n\n  <div *ngIf="selectedItem" padding>\n\n    You navigated here from <b>{{selectedItem.title}}</b>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return vars; });
var vars = (function () {
    function vars() {
    }
    vars.url = "http://127.0.0.1:8000";
    return vars;
}());

//# sourceMappingURL=vars.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_Storage__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = (function () {
    function HomePage(storage, navCtrl) {
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.data = {};
        this.getData();
    }
    HomePage.prototype.getData = function () {
        var _this = this;
        this.storage.get('user').then(function (val) {
            if (val) {
                _this.data = val;
                console.log(_this.data);
            }
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\home\home.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n        <ion-title>Accueil</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <h3>Bienvenu !</h3>\n\n\n\n    <p>\n\n        {{ data.nom }} {{data.prenom}}\n\n    </p>\n\n\n\n\n\n    <div *ngIf=\'data.type == 4\'>\n\n        <ion-card>\n\n            <ion-card-content>\n\n                Votre inscription est en cours de validation,<br> Merci de votre collaboration.\n\n            </ion-card-content>\n\n        </ion-card>\n\n    </div>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\xampp\htdocs\gestion-projet-ionic\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_Storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[213]);
//# sourceMappingURL=main.js.map