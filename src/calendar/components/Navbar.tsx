import { FaCalendarAlt } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io';

export const Navbar = () => {
    return (
        <>
            <div className="navbar navbar-dark bg-dark mb-4 px-4">
                <span className="navbar-brand">
                    <FaCalendarAlt />
                    &nbsp; Gonzalo
                </span>

                <button className="btn btn-outline-danger">
                    <IoMdExit />
                    &nbsp; Salir
                </button>
            </div>
        </>
    );
};
