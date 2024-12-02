import calendarApi from "../api/calendarApi";
import { Event, EventResponse, EventsResponse } from "../interfaces/event.interface";
import { addEvent, loadingEvents, onDeleteEvent, onSetActiveEvent, updateEvent, useAppDispatch } from "../store"
import { useAppSelector } from "../store/hook/useAppSelector"


export const useCalendarStore = () => {

  const dispatch = useAppDispatch();
  const { events, activeEvent } = useAppSelector((state) => state.calendar);


  const startGettingEvents = async () => {
    const { data } = await calendarApi.get<EventsResponse>(`/events/get`)

    console.log(data);

    dispatch(loadingEvents(data.events));
  }

  const startNewEvent = async (event: Event) => {

    if (event._id) {
      //! Updating

      const { data } = await calendarApi.put<EventResponse>(`/events/update/${event._id}`, event)

      dispatch(updateEvent(data.event));

    } else {

      //! Creating

      const { data } = await calendarApi.post<EventResponse>('/events/create', event)

      dispatch(addEvent({ ...data.event }))
    }
  }

  const setActiveEvent = (calendarEvent: Event) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const deleteEvent = async (id: string) => {

    const { data }  = await calendarApi.delete<EventResponse>(`/events/delete/${id}`)

    if (!data.event._id) return;

    dispatch(onDeleteEvent(data.event._id))
  }

  return {
    //! Propiedades
    events,
    activeEvent,

    //! Metodos
    startNewEvent,
    setActiveEvent,
    startGettingEvents,
    deleteEvent,

  }
}
