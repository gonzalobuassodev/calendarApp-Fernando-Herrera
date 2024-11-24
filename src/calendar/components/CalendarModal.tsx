import { differenceInSeconds } from 'date-fns';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import Modal from 'react-modal';
// import 'sweetalert2/dist/sweetalert2.min.css';

import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';
import Swal from 'sweetalert2';
import { useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

registerLocale('es', es);

Modal.setAppElement('#root');

export const CalendarModal = () => {
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startNewEvent } = useCalendarStore();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValue, setFormValue] = useState({
        title: activeEvent.title,
        notes: activeEvent.notes,
        start: new Date(activeEvent.start),
        end: new Date(activeEvent.end),
    });

    useEffect(() => {
        if (!activeEvent) return;

        setFormValue({
            ...activeEvent,
            start: new Date(activeEvent.start),
            end: new Date(activeEvent.end),
        });
    }, [activeEvent]);

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return formValue.title.length > 0 ? '' : 'is-invalid';
    }, [formValue.title, formSubmitted]);

    const onCloseModal = () => {
        closeDateModal();
    };

    const onChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const onDateChange = (e: Date | null, changing: string) => {
        setFormValue({
            ...formValue,
            [changing]: e,
        });
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        const diference = differenceInSeconds(formValue.end, formValue.start);
        if (diference <= 0) {
            Swal.fire(
                'La fecha de fin debe ser mayor a la de inicio',
                '',
                'error'
            );
            return;
        }

        if (isNaN(diference)) {
            Swal.fire(
                'La fecha de fin debe ser mayor a la de inicio',
                '',
                'error'
            );
            return;
        }

        if (formValue.title === '') {
            Swal.fire('El título del evento es obligatorio', '', 'error');
            return;
        }

        startNewEvent({
            ...formValue,
            bgColor: '#0062cc',
            start: formValue.start.toISOString(),
            end: formValue.end.toISOString(),
            user: {
                _id: '3434',   
                name: 'Gonzalo',
            }
        })

        onCloseModal();
        setFormSubmitted(false);
    };

    return (
        <Modal
            isOpen={isDateModalOpen}
            onAfterClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
            onRequestClose={onCloseModal}
        >
            <h1> 
                {
                    (activeEvent.title) 
                    ? `Editar evento ${activeEvent.title}`
                    : 'Nuevo evento'
                } 
            </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>
                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValue.start}
                        onChange={(e) => onDateChange(e, 'start')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValue.start}
                        selected={formValue.end}
                        onChange={(e) => onDateChange(e, 'end')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValue.title}
                        onChange={onChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        Una descripción corta
                    </small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        className={`form-control`}
                        rows={5}
                        placeholder="Notas"
                        name="notes"
                        value={formValue.notes}
                        onChange={onChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">
                        Información adicional
                    </small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

                <button
                    className="btn btn-outline-secondary"
                    onClick={onCloseModal}
                >
                    Cancelar
                </button>
            </form>
        </Modal>
    );
};
