import { Injectable } from '@angular/core';
import { createAction, props, Store } from '@ngrx/store';
import { Conversation } from '../../models/conversation.model';
import { GlobalState } from '../store';

@Injectable({ providedIn: 'root' })
export class ConversationsActions {
  public static GET_CONVERSATIONS = createAction(
    'GET_CONVERSATIONS'
  );
  public static GET_CONVERSATIONS_SUCCESS = createAction(
    'GET_CONVERSATIONS_SUCCESS',
    props<{ payload: Conversation[] }>()
  );

  constructor(private store: Store<GlobalState>) {

  }

  public getConversations() {
    return this.store.dispatch(ConversationsActions.GET_CONVERSATIONS());
  }

}


