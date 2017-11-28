webpackJsonp([1],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_Storage__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signin_signin__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__vars__ = __webpack_require__(82);
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
            selector: 'page-signup',template:/*ion-inline-start:"E:\Projet\Ionic\App\src\pages\signup\signup.html"*/'<!--\n  Generated template for the SignupPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>S\'inscrire</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n    <ng-template *ngIf="status==\'Status\';then Status; "></ng-template>\n    <ng-template *ngIf="status==\'enseignant\';then enseignant; "></ng-template>\n    <ng-template *ngIf="status==\'etudiant\';then etudiant; "></ng-template>\n    <ng-template *ngIf="status==\'entreprise\';then entreprise;"></ng-template>\n    <ng-template #Status>\n        Choisir votre status\n        <ion-item>\n            <ion-label>Status</ion-label>\n            <ion-select name="etat" [(ngModel)]="status" (ngModelChange)="print()">\n                <option disabled selected value="-1">---- Votre Status ----</option>\n                <ion-option *ngFor="let statut of statuses" [value]="statut.value">{{statut.name}}</ion-option>\n            </ion-select>\n        </ion-item>\n    </ng-template>\n    <ng-template #etudiant>\n        <!--<form (ngSubmit)="submitEtudiant()">-->\n\n        <form (ngSubmit)="submitEtudiant()" #registerForm="ngForm">\n            <ion-item>\n                <ion-label color="primary">Nom</ion-label>\n                <ion-input type="text" [(ngModel)]="nom" name="nom" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Prenom</ion-label>\n                <ion-input type="text" [(ngModel)]="prenom" name="prenom" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Cin</ion-label>\n                <ion-input type="number" [(ngModel)]="cin" name="cin" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Email</ion-label>\n                <ion-input type="email" [(ngModel)]="email" name="email" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Mot de passe</ion-label>\n                <ion-input type="password" [(ngModel)]="pass" name="pass" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Confirmer mot de passe</ion-label>\n                <ion-input type="password" [(ngModel)]="comf_pass" name="comf_pass" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Tel</ion-label>\n                <ion-input type="number" [(ngModel)]="tel" name="tel" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Date de naissance</ion-label>\n                <ion-datetime [(ngModel)]="dateNess" name="dateNess" required></ion-datetime>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Cycle </ion-label>\n                <ion-input type="text" [(ngModel)]="cy_etud" name="cy_etud" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Niveau d\'étude</ion-label>\n                <ion-input type="text" [(ngModel)]="niv_etud" name="niv_etud" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Specialite</ion-label>\n                <ion-input type="text" [(ngModel)]="specialite" name="specialite"></ion-input>\n            </ion-item>\n\n            <div *ngIf=\'erreur != ""\'>\n                <ion-card>\n                    <ion-card-content>\n                        {{erreur}}\n                    </ion-card-content>\n                </ion-card>\n            </div>\n            <button ion-button type="submit" block [disabled]="!registerForm.form.valid">Inscription</button>\n        </form>\n        <button ion-button color="dark" (click)="changeStatut()" block>\n      Return\n    </button>\n        <button ion-button class="register-btn" block clear (click)="createAccount()">Déja inscrire, Connexion</button>\n\n    </ng-template>\n\n    <ng-template #entreprise>\n        <form (ngSubmit)="submitEntreprise()" #registerFormEntreprise="ngForm">\n            <ion-item>\n                <ion-label color="primary">Nom</ion-label>\n                <ion-input type="text" [(ngModel)]="nom" name="nom" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Prenom</ion-label>\n                <ion-input type="text" [(ngModel)]="prenom" name="prenom" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Cin</ion-label>\n                <ion-input type="number" [(ngModel)]="cin" name="cin" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Email</ion-label>\n                <ion-input type="email" [(ngModel)]="email" name="email" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Mot de passe</ion-label>\n                <ion-input type="password" [(ngModel)]="pass" name="pass" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Confirmer mot de passe</ion-label>\n                <ion-input type="password" [(ngModel)]="comf_pass" name="comf_pass" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Tel</ion-label>\n                <ion-input type="number" [(ngModel)]="tel" name="tel"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Nom Entreprise</ion-label>\n                <ion-input [(ngModel)]="nomEntreprise" name="nomEntreprise" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Tel Entreprise </ion-label>\n                <ion-input type="text" [(ngModel)]="telEntreprise" name="telEntreprise" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Adresse Entreprise</ion-label>\n                <ion-input type="text" [(ngModel)]="adresseEntreprise" name="adresseEntreprise" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Fax Entreprise</ion-label>\n                <ion-input type="number" [(ngModel)]="faxEntreprise" name="faxEntreprise"></ion-input>\n            </ion-item>\n\n            <div *ngIf=\'erreur != ""\'>\n                <ion-card>\n                    <ion-card-content>\n                        {{erreur}}\n                    </ion-card-content>\n                </ion-card>\n            </div>\n            <button ion-button type="submit" block [disabled]="!registerFormEntreprise.form.valid">Inscription</button>\n        </form>\n        <button ion-button color="dark" (click)="changeStatut()" block>\n      Return\n    </button>\n        <button ion-button class="register-btn" block clear (click)="createAccount()">Déja inscrire, Connexion</button>\n\n    </ng-template>\n\n    <ng-template #enseignant>\n        <form (ngSubmit)="submitEnseignant()" #registerFormEnseignante="ngForm">\n            <ion-item>\n                <ion-label color="primary">Nom</ion-label>\n                <ion-input type="text" [(ngModel)]="nom" name="nom" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Prenom</ion-label>\n                <ion-input type="text" [(ngModel)]="prenom" name="prenom" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Cin</ion-label>\n                <ion-input type="number" [(ngModel)]="cin" name="cin" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Email</ion-label>\n                <ion-input type="email" [(ngModel)]="email" name="email" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Mot de passe</ion-label>\n                <ion-input type="password" [(ngModel)]="pass" name="pass" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Confirmer mot de passe</ion-label>\n                <ion-input type="password" [(ngModel)]="comf_pass" name="comf_pass" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Tel</ion-label>\n                <ion-input type="number" [(ngModel)]="tel" name="tel"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Grade</ion-label>\n                <ion-input type="text" [(ngModel)]="grade" name="grade"></ion-input>\n            </ion-item>\n\n            <div *ngIf=\'erreur != ""\'>\n                <ion-card>\n                    <ion-card-content>\n                        {{erreur}}\n                    </ion-card-content>\n                </ion-card>\n            </div>\n            <button ion-button type="submit" block [disabled]="!registerFormEnseignante.form.valid">Inscription</button>\n        </form>\n        <button ion-button color="dark" (click)="changeStatut()" block>\n      Return\n    </button>\n        <button ion-button class="register-btn" block clear (click)="createAccount()">Déja inscrire, Connexion</button>\n\n    </ng-template>\n</ion-content>'/*ion-inline-end:"E:\Projet\Ionic\App\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_Storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_Storage__["b" /* Storage */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]) === "function" && _e || Object])
    ], SignupPage);
    return SignupPage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_Storage__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__vars__ = __webpack_require__(82);
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
            selector: 'page-signin',template:/*ion-inline-start:"E:\Projet\Ionic\App\src\pages\signin\signin.html"*/'<!--\n  Generated template for the SigninPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>signin</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content class="login-content" padding>\n    <ion-row class="logo-row">\n        <ion-col></ion-col>\n        <ion-col width-67>\n            <img src="assets/images/logo.png" />\n        </ion-col>\n        <ion-col></ion-col>\n    </ion-row>\n    <div class="login-box">\n        <form (ngSubmit)="login()" #registerForm="ngForm">\n            <ion-row>\n                <ion-col>\n                    <ion-list inset>\n\n                        <ion-item>\n                            <ion-input type="text" placeholder="Email" name="email" [(ngModel)]="user.email" required></ion-input>\n                        </ion-item>\n\n                        <ion-item>\n                            <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="user.password" required></ion-input>\n                        </ion-item>\n\n                    </ion-list>\n                </ion-col>\n            </ion-row>\n            <div *ngIf=\'erreur != ""\'>\n                <ion-card>\n                    <ion-card-content>\n                        {{erreur}}\n                    </ion-card-content>\n                </ion-card>\n            </div>\n            <ion-row>\n                <ion-col class="signup-col">\n                    <button ion-button full type="submit" [disabled]="!registerForm.form.valid">Login</button>\n                </ion-col>\n            </ion-row>\n\n        </form>\n        <button ion-button full clear (click)="createAccount()">Créer compte</button>\n    </div>\n</ion-content>'/*ion-inline-end:"E:\Projet\Ionic\App\src\pages\signin\signin.html"*/,
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_Storage__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vars__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(42);
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
                "nomEntreprise": this.user.nom_ent,
                "telEntreprise": this.user.tel_ent,
                "adresseEntreprise": this.user.adresse_ent,
                "faxEntreprise": this.user.fax_ent,
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
            selector: 'page-setting-profile',template:/*ion-inline-start:"E:\Projet\Ionic\App\src\pages\setting-profile\setting-profile.html"*/'<!--\n  Generated template for the SettingProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n        <ion-title>Mon compte</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <div *ngIf=\'success != ""\'>\n        <ion-card>\n            <ion-card-content class="success-content">\n                Modification avec succes\n            </ion-card-content>\n        </ion-card>\n    </div>\n\n    <ng-template *ngIf="user.type==1;then etudiant; "></ng-template>\n    <ng-template *ngIf="user.type==2;then enseignant; "></ng-template>\n    <ng-template *ngIf="user.type==3 || user.type==4;then entreprise;"></ng-template>\n\n\n    <ng-template #etudiant>\n        <!--<form (ngSubmit)="submitEtudiant()">-->\n\n        <form (ngSubmit)="submitEtudiant()" #registerForm="ngForm">\n            <ion-item>\n                <ion-label color="primary">Nom</ion-label>\n                <ion-input type="text" [(ngModel)]="user.nom" name="nom" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Prenom</ion-label>\n                <ion-input type="text" [(ngModel)]="user.prenom" name="prenom" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Cin</ion-label>\n                <ion-input type="number" [(ngModel)]="user.cin" name="cin" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Email</ion-label>\n                <ion-input type="email" [(ngModel)]="user.email" name="email" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Tel</ion-label>\n                <ion-input type="number" [(ngModel)]="user.tel" name="tel" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Date de naissance</ion-label>\n                <ion-datetime [(ngModel)]="user.date_naiss" name="dateNess" required></ion-datetime>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Cycle </ion-label>\n                <ion-input type="text" [(ngModel)]="user.cycle_etude" name="cy_etud" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Niveau d\'étude</ion-label>\n                <ion-input type="text" [(ngModel)]="user.niveau_etude" name="niv_etud"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Specialite</ion-label>\n                <ion-input type="text" [(ngModel)]="user.specialite" name="specialite"></ion-input>\n            </ion-item>\n\n            <div *ngIf=\'erreur != ""\'>\n                <ion-card>\n                    <ion-card-content class="erreur-content">\n                        {{erreur}}\n                    </ion-card-content>\n                </ion-card>\n            </div>\n            <button ion-button type="submit" block [disabled]="!registerForm.form.valid">Modifier</button>\n        </form>\n    </ng-template>\n\n    <ng-template #entreprise>\n        <form (ngSubmit)="submitEntreprise()" #registerFormEntreprise="ngForm">\n            <ion-item>\n                <ion-label color="primary">Nom</ion-label>\n                <ion-input type="text" [(ngModel)]="user.nom" name="nom" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Prenom</ion-label>\n                <ion-input type="text" [(ngModel)]="user.prenom" name="prenom" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Cin</ion-label>\n                <ion-input type="number" [(ngModel)]="user.cin" name="cin" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Email</ion-label>\n                <ion-input type="email" [(ngModel)]="user.email" name="email" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Tel</ion-label>\n                <ion-input type="number" [(ngModel)]="user.tel" name="tel"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Nom Entreprise</ion-label>\n                <ion-input [(ngModel)]="user.nom_ent" name="nomEntreprise" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Tel Entreprise </ion-label>\n                <ion-input type="text" [(ngModel)]="user.tel_ent" name="telEntreprise" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Adresse Entreprise</ion-label>\n                <ion-input type="text" [(ngModel)]="user.adresse_ent" name="adresseEntreprise" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Fax Entreprise</ion-label>\n                <ion-input type="number" [(ngModel)]="user.fax_ent" name="faxEntreprise"></ion-input>\n            </ion-item>\n\n            <div *ngIf=\'erreur != ""\'>\n                <ion-card>\n                    <ion-card-content class="erreur-content">\n                        {{erreur}}\n                    </ion-card-content>\n                </ion-card>\n            </div>\n            <button ion-button type="submit" block [disabled]="!registerFormEntreprise.form.valid">Modifier</button>\n        </form>\n    </ng-template>\n\n    <ng-template #enseignant>\n        <form (ngSubmit)="submitEnseignant()" #registerFormEnseignante="ngForm">\n            <ion-item>\n                <ion-label color="primary">Nom</ion-label>\n                <ion-input type="text" [(ngModel)]="user.nom" name="nom" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Prenom</ion-label>\n                <ion-input type="text" [(ngModel)]="user.prenom" name="prenom" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Cin</ion-label>\n                <ion-input type="number" [(ngModel)]="user.cin" name="cin" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Email</ion-label>\n                <ion-input type="email" [(ngModel)]="user.email" name="email" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Tel</ion-label>\n                <ion-input type="number" [(ngModel)]="user.tel" name="tel" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="primary">Grade</ion-label>\n                <ion-input type="text" [(ngModel)]="user.grade" name="grade" required></ion-input>\n            </ion-item>\n\n            <div *ngIf=\'erreur != ""\'>\n                <ion-card>\n                    <ion-card-content class="erreur-content">\n                        {{erreur}}\n                    </ion-card-content>\n                </ion-card>\n            </div>\n            <button ion-button type="submit" block [disabled]="!registerFormEnseignante.form.valid">Modifier</button>\n        </form>\n    </ng-template>\n</ion-content>'/*ion-inline-end:"E:\Projet\Ionic\App\src\pages\setting-profile\setting-profile.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_Storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_Storage__["b" /* Storage */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]) === "function" && _e || Object])
    ], SettingProfilePage);
    return SettingProfilePage;
    var _a, _b, _c, _d, _e;
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
		289,
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signin_signin__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_Storage__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(43);
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
            selector: 'page-welcome',template:/*ion-inline-start:"E:\Projet\Ionic\App\src\pages\welcome\welcome.html"*/'<!--\n  Generated template for the WelcomePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n\n<ion-content padding id="welcome">\n  <br>\n  <img src="assets/imgs/logo.png" class="logo" />\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <h5>Bienvenu dans notre application !</h5>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n<br>\n  <ion-grid>\n    <ion-row>\n      <ion-col center text-center>\n        <button ion-button full class="btn1" color="lightText" (click)="login()">Se Connecter</button>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col center text-center>\n        <button ion-button full class="btn2"  (click)="signup()">S\'inscrire</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n\n-->\n\n\n<ion-content class="login-content" padding>\n    <ion-row class="logo-row">\n        <ion-col></ion-col>\n        <ion-col width-67>\n            <img src="assets/images/logo.png" />\n        </ion-col>\n        <ion-col></ion-col>\n    </ion-row>\n    <ion-grid>\n        <ion-row>\n            <ion-col>\n                <!--<h5>Bienvenu dans notre application gestion stage !</h5>-->\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n    <div>\n        <ion-row class="btn-row">\n            <ion-col class="login-col">\n                <button ion-button class="login-btn" full (click)="login()">Se Connecter</button>\n            </ion-col>\n        </ion-row>\n\n        <ion-row>\n            <ion-col class="signup-col">\n                <button ion-button class="signup-btn" full (click)="signup()">S\'inscrire</button>\n            </ion-col>\n        </ion-row>\n\n    </div>\n</ion-content>'/*ion-inline-end:"E:\Projet\Ionic\App\src\pages\welcome\welcome.html"*/,
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(287);
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
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(228);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_Storage__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_list_list__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_welcome_welcome__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_signin_signin__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_setting_profile_setting_profile__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_auth_service_auth_service__ = __webpack_require__(205);
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
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_14__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_Storage__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_setting_profile_setting_profile__ = __webpack_require__(107);
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
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Accueil', component: __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */] },
            //{ title: 'List', component: ListPage },
            //{ title: 'Signup', component: SignupPage },
            //{ title: 'Welcome', component: WelcomePage },
            //{ title: 'Signin', component: SigninPage },
            { title: 'Mon Compte', component: __WEBPACK_IMPORTED_MODULE_7__pages_setting_profile_setting_profile__["a" /* SettingProfilePage */] },
            { title: 'Logout', component: null },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        if (page.component) {
            this.nav.setRoot(page.component);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Projet\Ionic\App\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"E:\Projet\Ionic\App\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_Storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
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
            selector: 'page-list',template:/*ion-inline-start:"E:\Projet\Ionic\App\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\Projet\Ionic\App\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_Storage__ = __webpack_require__(29);
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
            selector: 'page-home',template:/*ion-inline-start:"E:\Projet\Ionic\App\src\pages\home\home.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n        <ion-title>Accueil</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <h3>Bienvenu !</h3>\n\n    <p>\n        {{ data.nom }} {{data.prenom}}\n    </p>\n\n\n    <div *ngIf=\'data.type == 4\'>\n        <ion-card>\n            <ion-card-content>\n                Votre inscription est en cours de validation,<br> Merci de votre collaboration.\n            </ion-card-content>\n        </ion-card>\n    </div>\n\n</ion-content>'/*ion-inline-end:"E:\Projet\Ionic\App\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_Storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return vars; });
var vars = (function () {
    function vars() {
    }
    vars.url = "http://127.0.0.1:8001";
    return vars;
}());

//# sourceMappingURL=vars.js.map

/***/ })

},[206]);
//# sourceMappingURL=main.js.map