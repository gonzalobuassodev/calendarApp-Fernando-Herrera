import { FaCalendarAlt } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io';
import { useAuthStore } from '../../hooks';

export const Navbar = () => {


    const { startLogout, user } = useAuthStore();

    return (
        <>
            <div className="navbar navbar-dark bg-dark mb-4 px-4">
                <span className="navbar-brand">
                    <FaCalendarAlt />
                    &nbsp; { user.name}
                </span>

                <button 
                    onClick={startLogout}
                className="btn btn-outline-danger">
                    <IoMdExit />
                    &nbsp; Salir
                </button>
            </div>
        </>
    );
};
