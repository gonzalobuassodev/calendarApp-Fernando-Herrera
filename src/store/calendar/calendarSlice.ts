import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';

export interface CalendarState {
    events: Event[];
    activeEvent: Event;
}

export interface Event {
    _id?: string;
    title: string;
    notes: string;
    start: string;
    end: string;
    bgColor: string;
    user: User
}

interface User {
    _id: string;
    name: string;
}

const tempEvent: Event = {
    _id: '123',
    title: 'Nota 1',
    notes: 'Esta es la nota en duro',
    start: new Date("2024-11-24T15:20:46.003Z"
    ).toISOString(),
    end: addHours(new Date("2024-11-24T15:30:46.003Z"
    ), 2).toISOString(),
    bgColor: '#0062cc',
    user: {
        _id: '3434',
        name: 'Gonzalo',
    }
}

export const emptyEvent: Event = {
    // _id: '',
    title: '',
    notes: '',
    start: new Date().toISOString(),
    end: addHours(new Date(), 2).toISOString(),
    bgColor: '',
    user: {
        _id: '',
        name: '',
    }
}

const initialState: CalendarState = {
    events: [tempEvent],
    activeEvent: emptyEvent,
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {

        addEvent: (state, action: PayloadAction<Event>) => {
            state.events = [...state.events, action.payload];
        },
        updateEvent: (state, action: PayloadAction<Event>) => {
            state.events = state.events.map((event) => (
                event._id === action.payload._id 
                ? action.payload
                : event
            ))
        },
        onSetActiveEvent: (state, action: PayloadAction<Event>) => {
            state.activeEvent = action.payload;
        },
        onDeleteEvent: (state, action: PayloadAction<string>) => {
            state.events = state.events.filter((event) => event._id !== action.payload)
        },
        onClearEventActive: (state) => {
            state.activeEvent = emptyEvent;
        }



    },
})
export const { addEvent, onSetActiveEvent, onClearEventActive ,updateEvent, onDeleteEvent } = calendarSlice.actions
