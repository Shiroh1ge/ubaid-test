import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { conversationsReducer, ConversationsState } from './reducers/conversations.reducer';


export interface GlobalState {
    conversations: ConversationsState;
}

export const reducers: ActionReducerMap<GlobalState> = {
    conversations: conversationsReducer
};


export const metaReducers: MetaReducer<GlobalState>[] = [];
