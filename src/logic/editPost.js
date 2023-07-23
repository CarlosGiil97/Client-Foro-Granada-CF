import React from "react";
import axios from 'axios';
import { toast } from "react-hot-toast";

export function postEdit(infoPost) {

    let userId = localStorage.getItem('id');
    infoPost.userId = userId;
    axios.put('http://localhost:8000/api/posts/' + infoPost.id, infoPost, {
        headers: {
            'Authorization': `token`
        }
    })
        .then((res) => {
            if (res.data.code == 'ok') {
                toast(res.data.status, {
                    icon: '✅',
                });
                window.location.href = '/';
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