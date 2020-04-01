import { Message } from './message.model';

export interface Conversation {
  id: number;
  messages: Message[]
}
