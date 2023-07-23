import React from "react";
import axios from 'axios';


export function listLastPosts() {


    axios.get('http://localhost:8000/api/posts')
        .then((res) => {
            //devuelvo result
            let response = res.data;
            return response;


        })
        .catch((error) => {
            return ('<h5>Ha ocurrido un error al listar los ultimos posts</h5>');
        })
}