import { User } from "./auth.interface";

export interface EventsResponse {
  ok: boolean;
  events: Event[];
}

export interface EventResponse {
    ok: boolean;
    event: Event;
}

export interface Event {
    _id?: string;
    title: string;
    notes: string;
    start: string;
    end: string;
    bgColor?: string;
    user: User
}

