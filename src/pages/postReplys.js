import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { formatDate } from "../logic/helperDate";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaHeart, FaPen } from 'react-icons/fa';




export function PostReplys() {

    const [value, setValue] = useState('');

    const postId = useParams();
    const [userCreation, setuserCreation] = useState('');
    const [dateCreation, setDateCreation] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [replyes, setReplyes] = useState([]);


    let modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }


    const handleSubmit = (e) => {


    };

    const saveReply = () => {


    };

    const saveLikePost = () => {

    }

    //con useEffect hago una petición para obtener las categories
    useEffect(() => {

        axios.get('http://localhost:8000/api/posts/' + postId.postId)
            .then((res) => {
                setuserCreation(res.data.infoUser.username)
                setDateCreation(res.data.date_created)
                setTitle(res.data.title)
                setDescription(res.data.body)

                if (Object.keys(res.data.replyes).length > 0) {
                    setReplyes(res.data.replyes)
                }
            })
            .catch((error) => {
                return ('<h5>Ha ocurrido un error al listar los ultimos posts</h5>');
            })
    }, []);


    return (
        <>
            <center>
                <div className="mt-5">
                    <div className="flex flex-col">
                        {/* Información del post */}
                        <div className="flex justify-between items-center m-4">
                            {/* Información del usuario que creó el post */}
                            <div className="flex items-center">
                                <img src="/img/avatar.png" alt="Imagen del usuario" className="w-8 h-8 rounded-full mr-2" />
                                <p className="text-gray-700 font-medium">{userCreation ?? ''}</p>
                            </div>
                            {/* Información del post */}
                            <div className="flex items-center">
                                <p className="text-gray-500 mr-4">{dateCreation != '' ? formatDate(dateCreation) : 'Hace muuchoo tiempoo ...'}</p>
                                <p className="text-gray-500">{/* Otra información del post */}</p>
                            </div>
                        </div>

                        {/* Formulario para informar sobre el post que se está*/}
                        <form className="flex flex-col mb-8">
                            {/* Input para el contenido de la respuesta */}
                            <h1 class="mb-4 text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">{title}</h1>

                            <span className="border border-gray-400 rounded-lg p-2 mb-4 bg-gray-100 p-10 m-4" >{description}</span>

                            {/* Botón para enviar la respuesta */}


                            <div className="flex justify-end mb-4">
                                {/* Agregar los iconos de corazón */}
                                <a href="#test" class="m-2 bg-green-300 hover:bg-green-400 text-white-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                    <FaPen className="mr-2" />
                                    <span>Comentar</span>
                                </a>
                                <a onClick={saveLikePost} class="m-2 bg-red-300 hover:bg-red-400 text-white-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                    <FaHeart className="mr-2" />
                                    <span>Me gusta</span>
                                </a>
                            </div>
                            <hr />
                        </form>

                        {/* Lista de respuestas */}
                        <div className="flex flex-col">
                            {replyes.length > 0 ?
                                console.log(replyes)
                                : console.log(replyes)}
                            <div className="border border-gray-400 rounded-lg p-4 mb-4">
                                {/* Información del usuario que escribió la respuesta */}
                                <div className="flex items-center mb-2">
                                    <img src="ruta-a-la-imagen-del-usuario" alt="Imagen del usuario" className="w-6 h-6 rounded-full mr-2" />
                                    <p className="text-gray-700 font-medium">Nombre del usuario</p>
                                </div>
                                {/* Contenido de la respuesta */}
                                <p className="text-gray-700">Contenido de la respuesta</p>
                            </div>

                            {/* Respuesta 2 */}


                            {/* ... y así sucesivamente para cada respuesta */}
                        </div>
                    </div>
                    {/* <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} />
                    <button className="btn btn-success" onClick={saveReply} /> */}
                </div>
            </center >

        </>


    );
}
