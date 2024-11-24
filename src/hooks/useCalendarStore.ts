import { addEvent, Event, onSetActiveEvent, updateEvent, useAppDispatch } from "../store"
import { useAppSelector } from "../store/hook/useAppSelector"

export const useCalendarStore = () => {

  const dispatch = useAppDispatch();
  const { events, activeEvent } = useAppSelector((state) => state.calendar);

  const startNewEvent = async (event: Event) => {

    if (event._id) {
      //!Actualizando
      dispatch(updateEvent(event));
    } else {
      //!Creando
      dispatch(addEvent({ ...event, _id: new Date().getTime() }))
    }
  }

  const setActiveEvent = (calendarEvent: Event) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  return {
    //! Propiedades
    events,
    activeEvent,

    //! Metodos
    startNewEvent,
    setActiveEvent,

  }
}
