import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../../Entities/User';

let apiUrl = 'http://127.0.0.1:8000/api/user/123456&123456';

@Injectable()
export class AuthServiceProvider {
  currentUser: User;
  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }
  getUser() {
    return this.http.get('http://127.0.0.1:8000/api/user/123456&123456')
      .map(res => res);
  }

  public login(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.get(apiUrl)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }
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
  public register(param) {
    if (param.email === null || param.password === null) {
      return Observable.throw("Tous les champs sont obligateur");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }


}
