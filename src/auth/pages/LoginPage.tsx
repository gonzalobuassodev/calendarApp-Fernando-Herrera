import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './LoginPage.css';
import { useAuthStore } from '../../hooks';
import Swal from 'sweetalert2';

export const LoginPage = () => {


    const { startLogin, startRegister ,errorMessage} = useAuthStore();

    const [formLogin, setFormLogin] = useState({
        loginEmail: '',
        loginPassword: '',
    });

    const [formRegister, setFormRegister] = useState({
        registerName: '',
        registerEmail: '',
        registerPassword: '',
        registerConfirmPassword: '',
    });

    const onChangeInputLogin = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormLogin({
            ...formLogin,
            [name]: value,
        });
    };

    const onChangeRegisterInput = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setFormRegister({
            ...formRegister,
            [name]: value
        })

    }

    const onSubmitLogin = (e: FormEvent) => {
        e.preventDefault();

        if (formLogin.loginEmail === '' || formLogin.loginPassword === '') {
            alert('Por favor ingrese correo y contraseña');
        }

        startLogin(formLogin);


    }

    const onSubmitRegister = (e: FormEvent) => {
        e.preventDefault()

        if (formRegister.registerPassword !== formRegister.registerConfirmPassword) alert('Las contraseñas no coinciden');

        if (formRegister.registerName === '' || formRegister.registerEmail === '' || formRegister.registerPassword === '' || formRegister.registerConfirmPassword === '') alert('Por favor ingrese todos los campos');

        startRegister({
            registerName: formRegister.registerName,
            registerEmail: formRegister.registerEmail,
            registerPassword: formRegister.registerPassword
        })
    }

    useEffect(() => {
        console.log(errorMessage)
      if (errorMessage !== '') {
        
        Swal.fire('Error en la autenticación', errorMessage, 'error');
      }
    }, [errorMessage])
    

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={onSubmitLogin}>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={formLogin.loginEmail}
                                onChange={onChangeInputLogin}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={formLogin.loginPassword}
                                onChange={onChangeInputLogin}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={onSubmitRegister}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={formRegister.registerName}
                                onChange={onChangeRegisterInput}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={formRegister.registerEmail}
                                onChange={onChangeRegisterInput}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword"
                                value={formRegister.registerPassword}
                                onChange={onChangeRegisterInput}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                value={formRegister.registerConfirmPassword}
                                name="registerConfirmPassword"
                                onChange={onChangeRegisterInput}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
