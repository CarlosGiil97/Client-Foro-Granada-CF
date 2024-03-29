import React from "react";
import axios from 'axios';
import { toast } from "react-hot-toast";

export function formRegisterAction(event, emailR, passwordR, nameR, surnameR, usernameR, phoneR) {

    event.preventDefault();
    const datos = { email: emailR, password: passwordR, name: nameR, surname: surnameR, phone: phoneR, username: usernameR };


    axios.post('http://localhost:8000/api/users/register/', {
        mode: 'no-cors',
        header: { 'Access-Control-Allow-Origin': 'http://localhost:3001' },
        email: emailR, password: passwordR, name: nameR, surname: surnameR, phone: phoneR, username: usernameR
    })
        .then(response => {


            if (response.status == 200) {
                toast('Registro finalizado con éxito! Ya puede iniciar sesión', {
                    icon: '✅',
                });
                window.location.reload();


            } else {
                console.log(response)
                toast(response.data.status, {
                    icon: '❌',
                });

            }
        })
        .catch(error => {

            if (error.response.status === 401) {
                toast.error("This didn't work.")
            } else {
                toast.error("This didn't work.")
                    ;
            }
        });

}
