import { FaPlus } from "react-icons/fa"
import { emptyEvent, onOpenDateModal, onSetActiveEvent, useAppDispatch } from "../../store"


export const FabAddNewEvent = () => {

    const dispatch = useAppDispatch();

    const openModal = () => {
        dispatch(onSetActiveEvent(emptyEvent));
        dispatch (onOpenDateModal())  
    }

  return (
    <button 
        onClick={openModal}
        className="fab btn btn-primary">
        <FaPlus />
    </button>
  )
}
