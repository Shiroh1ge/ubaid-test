import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Conversation } from '../../models/conversation.model';
import { conversationsSelector } from '../reducers/conversations.reducer';
import { GlobalState } from '../store';

@Injectable({ providedIn: 'root' })
export class ConversationsSelectors {
  public conversations$: Observable<Conversation[]>;

  constructor(store: Store<GlobalState>) {
    this.conversations$ = store.pipe(select(conversationsSelector));
  }
}
