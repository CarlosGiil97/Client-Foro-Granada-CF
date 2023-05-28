import { useContext } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import Context from '../components/context'

export const useLogin = () => {
    const { login } = useContext(Context);

    const formLoginAction = (email, password) => {
        const datos = { email: email, password: password };

        axios.get('http://localhost:8000/api/users/login/', { mode: 'no-cors', header: { 'Access-Control-Allow-Origin': 'http://localhost:3001' }, params: { email: email, password: password } })
            .then(response => {
                if (response.data.code == 'ok') {
                    toast('Inicio de sesión con exito!', {
                        icon: '✅',
                    });
                    login(response.data.token, response.data.id)
                } else {
                    toast('Credenciales incorrectas', {
                        icon: '❌',
                    });
                }
            })
            .catch(error => {
                console.log(error);
                return;
                if (error.response.status === 401) {
                    toast.error("This didn't work.")
                } else {
                    toast.error("This didn't work.")
                        ;
                }
            });
    };

    return formLoginAction;
};
