import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBIcon
}
    from 'mdb-react-ui-kit';

import { useLogin } from '../logic/useLogin';
import { formRegisterAction } from '../logic/actionFormRegister';

function FormLogin() {
    const formLoginAction = useLogin();

    //para controlar si mostrar formulario de login o de registro
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    //variables para el login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    //variables para registro
    const [emailR, setEmailR] = useState('');
    const [passwordR, setPasswordR] = useState('');
    const [surnameR, setSurnameR] = useState('');
    const [nameR, setNameR] = useState('');
    const [phoneR, setPhoneR] = useState('');
    const [usernameR, setUsernameR] = useState('');


    const viewRegister = () => {
        setShowLogin(false)
        setShowRegister(true)
    }

    const viewLogin = () => {
        setShowLogin(true)
        setShowRegister(false)
    }

    const handleSubmit = (event, mail, password) => {
        event.preventDefault();
        formLoginAction(mail, password);
    };


    return (
        <MDBContainer fluid className='p-4'>

            <MDBRow>

                <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                    <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                        El foro del <br />
                        <span style={{
                            color: '#B71C1C'
                        }} >GRANADA CLUB DE FUTBOL</span>
                    </h1>

                    <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                        quibusdam tempora at cupiditate quis eum maiores libero
                        veritatis? Dicta facilis sint aliquid ipsum atque?
                    </p>

                </MDBCol>

                <MDBCol md='6'>

                    <MDBCard className='my-5'>
                        {showLogin ?
                            <>
                                <h1>Iniciar sesión</h1>
                                <form className='form-horizontal' onSubmit={(event) => handleSubmit(event, email, password)}>
                                    <MDBCardBody className='p-5'>

                                        <MDBInput wrapperClass='mb-4' name="email" onChange={(event) => setEmail(event.target.value)} label='Email' id='form1' type='email' />
                                        <MDBInput wrapperClass='mb-4' name="password" onChange={(event) => setPassword(event.target.value)} label='Contraseña' id='form1' type='password' />


                                        <MDBBtn className='w-100 mb-4' style={{
                                            backgroundColor: '#B71C1C'
                                        }} size='md'>Iniciar sesión</MDBBtn>

                                        <div className="text-center">

                                            <p>¿No tiene cuenta?</p><a href="#" onClick={viewRegister}>Registro</a>

                                        </div>

                                    </MDBCardBody>
                                </form>
                            </> : ''
                        }

                        {showRegister ?
                            <>
                                <h1>Registro</h1>
                                <form className='form-horizontal' onSubmit={(event) => formRegisterAction(event, emailR, passwordR, nameR, surnameR, usernameR, phoneR)}>
                                    <MDBCardBody className='p-5'>

                                        <MDBInput wrapperClass='mb-4' name="email" onChange={(event) => setEmailR(event.target.value)} label='Email' id='form1' type='email' />
                                        <MDBInput wrapperClass='mb-4' name="password" onChange={(event) => setPasswordR(event.target.value)} label='Contraseña' id='form1' type='password' />
                                        <MDBInput wrapperClass='mb-4' name="name" onChange={(event) => setNameR(event.target.value)} label='Nombre' id='form1' type='text' />
                                        <MDBInput wrapperClass='mb-4' name="name" onChange={(event) => setSurnameR(event.target.value)} label='Apellidos' id='form1' type='text' />
                                        <MDBInput wrapperClass='mb-4' name="name" onChange={(event) => setUsernameR(event.target.value)} label='Nombre de usuario' id='form1' type='text' />
                                        <MDBInput wrapperClass='mb-4' name="name" onChange={(event) => setPhoneR(event.target.value)} label='Movil' id='form1' type='tel' maxLength={9} />


                                        <MDBBtn className='w-100 mb-4' style={{
                                            backgroundColor: '#B71C1C'
                                        }} size='md'>Registro</MDBBtn>

                                        <div className="text-center">

                                            <p>Si ya tienes cuenta</p><a onClick={viewLogin} href="#" >Inicia sesión</a>

                                        </div>

                                    </MDBCardBody>
                                </form>
                            </> : ''
                        }



                    </MDBCard>

                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}

export default FormLogin;