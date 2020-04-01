import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ApiEndpoints } from '../../constants/api-endpoints';
import { Conversation } from '../../models/conversation.model';
import { ConversationsActions } from '../actions/conversations.actions';

const conversations: Conversation[] = [
  {
    id: 1,
    messages: [
      {
        id: 1,
        text: 'Hi'
      }
    ]
  },
  {
    id: 2,
    messages: [
      {
        id: 1,
        text: 'Hi'
      },
      {
        id: 2,
        text: 'How are you?'
      },
    ]
  },

];

@Injectable()
export class ConversationsEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {
  }

  // usually we call the backend instead of hardcoding them
  private getConversations(): Observable<Conversation[]> {
    return new Observable(observer => {
      return observer.next(conversations);
    });
  }

  getConversations$ = createEffect(() => this.actions$.pipe(
    ofType(ConversationsActions.GET_CONVERSATIONS),
    exhaustMap(action => {
      return this.getConversations()
        .pipe(
          map((conversations: Conversation[]) => ({
            type: ConversationsActions.GET_CONVERSATIONS_SUCCESS.type,
            payload: conversations
          })),
          catchError(() => EMPTY)
        );
    })
    )
  );

}
