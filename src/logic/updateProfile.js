import React from "react";
import axios from 'axios';
import { toast } from "react-hot-toast";

export function updateProfile(profile) {
    let userId = localStorage.getItem('id');
    let token = localStorage.getItem('token');
    axios.put('http://localhost:8000/api/users/' + userId, profile, {
        headers: {
            'Authorization': `token ${token}`
        }
    })
        .then((res) => {
            if (res.data.code == 'ok') {
                toast(res.data.status, {
                    icon: '✅',
                });
            } else {
                toast('Ha ocurrido algun error al procesar los datos !', {
                    icon: '❌',
                });
            }

        })
        .catch((error) => {
            toast('Ha ocurrido algun error al procesar los datos !', {
                icon: '❌',
            });
        })
}