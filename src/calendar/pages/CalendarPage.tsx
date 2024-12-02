import { Calendar, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, FabAddNewEvent, Navbar } from '../components';
import { getMessagesES, localizer } from '../../helpers';
import { useEffect, useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useCalendarStore, useUiStore } from '../../hooks';
import { FabRemoveEvent } from '../components/FabRemoveEvent';
import { Event } from '../../interfaces/event.interface';

export const CalendarPage = () => {
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent } = useCalendarStore();

    const { startGettingEvents} = useCalendarStore();

    useEffect(() => {
        startGettingEvents();
    }, []);

    const [lastView, setLastView] = useState<string>(
        localStorage.getItem('lastView') || 'week'
    );

    const eventPropGetter = (event: Event, start: Date, end: Date, isSelected: boolean) => {
          console.log(event, start, end, isSelected);

        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.7,
            color: '#fff',
        };

        return {
            style,
        };
    };

    const onDoubleClickEvent = (event: Event) => {
        setActiveEvent({
            ...event,
            start: new Date(event.start).toISOString(),
            end: new Date(event.end).toISOString(),
        });
        openDateModal();
    };

    const onSelect = (event: Event) => {
        console.log('onSelect', event._id);
        setActiveEvent({
            ...event,
            start: new Date(event.start).toISOString(),
            end: new Date(event.end).toISOString(),
        });
    };

    const onViewChanged = (event: View) => {
        localStorage.setItem('lastView', event);
        setLastView(event);
    };
    return (
        <>
            <Navbar />

            <Calendar
                culture="es"
                localizer={localizer}
                defaultView={lastView as View}
                events={events.map((event) => ({
                    ...event,
                    start: new Date(event.start),
                    end: new Date(event.end),
                }))}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesES()}
                eventPropGetter={eventPropGetter}
                components={{
                    event: CalendarEvent,
                }}
                onDoubleClickEvent={onDoubleClickEvent}
                onSelectEvent={onSelect}
                onView={(e) => onViewChanged(e)}
            />

            <CalendarModal />
            <FabAddNewEvent />
                
            <FabRemoveEvent />


        </>
    );
};
