import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { Conversation } from '../../models/conversation.model';
import { ConversationsActions } from '../actions/conversations.actions';
import { GlobalState } from '../store';

export interface ConversationsState {
  conversations: Conversation[];
}

export const conversationsInitialState: ConversationsState = {
  conversations: []
};

const reducer = createReducer(
  conversationsInitialState,
  on(ConversationsActions.GET_CONVERSATIONS_SUCCESS, (state, { payload }): ConversationsState => ({
    ...state,
    conversations: payload
  }))
);


export function conversationsReducer(state: ConversationsState | undefined, action: Action) {
  return reducer(state, action);
}

const getConversations = (state: GlobalState) => state.conversations.conversations;

export const conversationsSelector = createSelector([getConversations], category => category);

