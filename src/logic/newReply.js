import React from "react";
import axios from 'axios';
import { toast } from "react-hot-toast";

export function newReply(infoReply) {


    axios.post('http://localhost:8000/api/posts/newReply', infoReply)
        .then((res) => {
            if (res.data.code == 'ok') {
                toast(res.data.status, {
                    icon: '✅',
                });
                window.location.reload();
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