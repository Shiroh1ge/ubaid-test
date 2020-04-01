import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  private isLoggedIn$ = new BehaviorSubject(false);
  private isOnline$ = new BehaviorSubject(false);
  private myNumber$ = new Subject();

  public login() {
    this.isLoggedIn$.next(true);
  }

  public logout() {
    this.isLoggedIn$.next(false);
  }

  public setOnline() {
    this.isOnline$.next(true);
  }

  public setOffline() {
    this.isOnline$.next(false);
  }

  public getOnlineStatus(): Observable<boolean> {
    return this.isOnline$.asObservable();
  }

  public isUserLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  public getNumber(): Observable<number | unknown> {
    return this.myNumber$.asObservable();
  }

  public addNumbersOnInterval() {
    setInterval(() => {
      this.myNumber$.next(Math.random() * 100)
    }, 500)
  }

  constructor() {

  }

}


