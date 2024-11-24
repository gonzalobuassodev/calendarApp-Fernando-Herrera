import { onCloseDateModal, onOpenDateModal, useAppDispatch } from "../store"
import { useAppSelector } from "../store/hook/useAppSelector"

export const useUiStore = () => {


    const { isDateModalOpen } = useAppSelector((state) => state.ui)
    const dispatch = useAppDispatch();

    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }

  return {

    //! Propiedades
    isDateModalOpen,

    //! Metodos
      openDateModal,
      closeDateModal,
  }
}
