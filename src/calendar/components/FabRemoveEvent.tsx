import { MdDeleteForever } from 'react-icons/md';
import { onClearEventActive, onDeleteEvent, useAppDispatch } from '../../store';
import { useCalendarStore } from '../../hooks';

export const FabRemoveEvent = () => {
    const dispatch = useAppDispatch();
    const { activeEvent } = useCalendarStore();

    const startDeleteEvent = () => {
        if (activeEvent._id === undefined) return;

        dispatch(onDeleteEvent(activeEvent._id));
        dispatch(onClearEventActive());
    };

    return (
        <>
            {
            (activeEvent._id !== undefined) 
            ? 
                <button
                    onClick={startDeleteEvent}
                    className="fab_remove btn btn-danger"
                >
                    <MdDeleteForever />
                </button>
            : null}
        </>
    );
};
