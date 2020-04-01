import { Component } from '@angular/core';
import { combineLatest, interval, Observable, Subject, timer } from 'rxjs';
import { repeatWhen, takeUntil, withLatestFrom } from 'rxjs/operators';
import { AppService } from './app.service';
import { Message } from './models/message.model';
import { ConversationsActions } from './store/actions/conversations.actions';
import { ConversationsSelectors } from './store/selectors/conversations-selectors';
import { ThemeService } from './themes.service';

const testMessages = [
  {
    id: 0,
    text: 'asd'
  },
  {
    id: 1,
    text: 'bsd'
  },
  {
    id: 2,
    text: 'asdfgh'
  },
  {
    id: 3,
    text: 'qwe'
  },
  {
    id: 4,
    text: 'zxc'
  },
  {
    id: 5,
    text: 'asdqwe'
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ubaid-task';
  public isOnline: boolean;
  public isLoggedIn: boolean;
  public messages$: Observable<Message[]>;

  public loginUser() {
    this.appService.login();
  }

  public setOnline() {
    this.appService.setOnline();
  }

  public logoutUser() {
    this.appService.logout();
  }

  public setOffline() {
    this.appService.setOffline();
  }

  public setLightTheme() {
    this.themesService.setLightTheme();
  }

  public setDarkTheme() {
    this.themesService.setDarkTheme();
  }

  // Task #4 Not very clear from the specification if this is the required result
  public searchMessages(keyword: string) {
    const regex = new RegExp(keyword, 'i');

    this.messages$ = new Observable(subscriber => {
      const result = testMessages.filter(message => {
        return regex.test(message.text);
      });
      subscriber.next(result);
    });
  }

  constructor(private conversationsActions: ConversationsActions,
              private conversationsSelectors: ConversationsSelectors,
              private themesService: ThemeService,
              private appService: AppService
  ) {

  }

  ngOnInit() {
    // Task #1
    const start$ = new Subject();
    const stop$ = new Subject();

    timer(0, 500)
      .pipe(
        takeUntil(stop$),
        repeatWhen(() => start$)
      )
      .subscribe(() => console.log('polling'));

    this.appService.getOnlineStatus().subscribe(isOnline => {
      if (isOnline) {
        start$.next();
      } else {
        stop$.next();
      }
    });

    // Task #2
    combineLatest(this.appService.getOnlineStatus(), this.appService.isUserLoggedIn())
      .subscribe(([isOnline, isLoggedIn]) => {
        this.isOnline = isOnline;
        this.isLoggedIn = isLoggedIn;

        if (isOnline && isLoggedIn) {
          console.log('User is online and logged in');
        }
      });

    // Task #3
    this.appService.addNumbersOnInterval();
    const interval$ = interval(2000);

    interval$.pipe(
      withLatestFrom(this.appService.getNumber())
    )
      .subscribe(([seconds, number]) => {
        console.log('number', number);
      });


    // Task #6
    this.conversationsActions.getConversations();
    this.conversationsSelectors.conversations$.subscribe(conversations => {
      console.log('conversations', conversations);
    });

  }

}
