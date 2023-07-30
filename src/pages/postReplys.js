import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { formatDate } from "../logic/helperDate";
import { newReply } from "../logic/newReply";
import { updateReply } from "../logic/updateReply";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaHeart, FaPen, FaTrash } from 'react-icons/fa';


export function PostReplys() {

    const [value, setValue] = useState('');

    const postId = useParams();
    const [userCreation, setuserCreation] = useState('');
    const [dateCreation, setDateCreation] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [replyes, setReplyes] = useState([]);
    const [numReplies, setNumReplies] = useState(0);
    const [numLikes, setNumLikes] = useState(0);
    const [titleReply, setTitleReply] = useState('');
    const [userId, setUserId] = useState(localStorage.getItem('id'));

    //estados para contolar la respuesta a editar
    const [editReply, setEditReply] = useState(false)
    const [titleEdit, setTitleEdit] = useState('');
    const [bodyEdit, setBodyEdit] = useState('');
    const [idReplyEdit, setIdReplyEdit] = useState(null);


    let modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }


    const saveReply = () => {

        let params = {};

        let userId = localStorage.getItem('id');

        params.reply = value;
        params.postId = postId.postId;
        params.userId = userId;
        params.title = titleReply;

        console.log(params);
        newReply(params)

    };

    const saveLikePost = () => {
        axios.put('http://localhost:8000/api/posts/updateLikes/' + postId.postId)
            .then((res) => {
                if (res.data.code == 'ok') {

                    setNumLikes(res.data.num_likes)
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

    const getInfoReply = (idReply) => {
        //activo modo edición
        setEditReply(true)

        //recorro las respuestas y me quedo con la que quiero editar
        const replyToEdit = replyes.find(objeto => objeto.id === idReply);
        console.log(replyToEdit)
        setTitleEdit(replyToEdit.title)
        setBodyEdit(replyToEdit.body)
        setIdReplyEdit(idReply)


    }

    const replyEdit = () => {
        let params = {};

        params.title = titleEdit;
        params.body = bodyEdit;

        updateReply(idReplyEdit, params)
    }


    //con useEffect hago una petición para obtener las categories
    useEffect(() => {

        axios.get('http://localhost:8000/api/posts/' + postId.postId)
            .then((res) => {
                setuserCreation(res.data.infoUser.username)
                setDateCreation(res.data.date_created)
                setTitle(res.data.title)
                setDescription(res.data.body)
                setNumLikes(res.data.num_likes)

                if (Object.keys(res.data.replyes).length > 0) {
                    setNumReplies(res.data.numReplies)
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
                        <form className="flex flex-col mb-2">
                            {/* Input para el contenido de la respuesta */}
                            <h1 className="mb-4 text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">{title}</h1>

                            <span className="border border-gray-400 rounded-lg p-2 mb-4 bg-gray-100 p-10 m-4" >{description}</span>

                            {/* Botón para enviar la respuesta */}


                            <div className="flex justify-end mb-4">
                                {/* Agregar los iconos de corazón */}
                                {numReplies > 0 ?
                                    <a className="m-2 bg-slate-100 hover:bg-slate-300 text-white-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                        Mostrando {numReplies} respuestas
                                    </a>
                                    : ''}
                                <a href="#addResponse" className="m-2 bg-green-300 hover:bg-green-400 text-white-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                    <FaPen className="mr-2" />
                                    <span>Comentar</span>
                                </a>
                                <a onClick={saveLikePost} className="m-2 bg-red-300 hover:bg-red-400 text-white-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                    <FaHeart className="mr-2" />
                                    <span>Me gusta ({numLikes})</span>
                                </a>
                            </div>

                        </form>
                        <hr className="w-48 h-1 mx-auto my-4 bg-red-800 border-0 rounded md:my-10 dark:bg-gray-700" />

                        {/* Lista de respuestas */}
                        <div className="flex flex-col scrollable">
                            {replyes != null ?


                                replyes.map((reply, index) => (
                                    <div key={index} className="bg-gray-100 rounded-lg p-4 m-4">
                                        {/* Información del usuario que escribió la respuesta */}
                                        <div className="flex items-center mb-2">
                                            <img src="/img/avatar.png" alt="Imagen del usuario" className="w-6 h-6 rounded-full mr-2" />
                                            <p className="text-gray-700 font-medium underline">{reply.user.username ?? null}</p>
                                        </div>
                                        {/* Contenido de la respuesta */}

                                        {reply.user.id == userId && (
                                            <>
                                                <a href="#editResponses" className="btn btn-success float-right m-1" onClick={() => getInfoReply(reply.id)}>
                                                    <FaPen />
                                                </a>
                                                <button className="btn btn-danger float-right m-1" >
                                                    <FaTrash />
                                                </button>
                                            </>

                                        )}
                                        <p className="text-gray-700 text-left ml-2" dangerouslySetInnerHTML={{ __html: reply.body }}>

                                        </p>

                                    </div>
                                ))

                                : 'Este mensaje no contiene aun respuestas'
                            }


                        </div>


                        <hr className="w-48 h-1 mx-auto my-4 bg-red-800 border-0 rounded md:my-10 dark:bg-gray-700" />
                        <div className="m-3">
                            <center>

                                {!editReply ?
                                    <>
                                        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">Añadir respuesta:</h1>
                                        <input onChange={(e) => setTitleReply(e.target.value)} type="text" className="form-control m-3" placeholder="Introduce titulo" ></input>
                                        <ReactQuill id="addResponse" className="m-3" theme="snow" value={value} onChange={setValue} modules={modules} />
                                        <button className="btn btn-primary" onClick={saveReply}>Guardar</button>
                                    </>
                                    :
                                    <>
                                        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">Editar respuesta:</h1>
                                        <input onChange={(e) => setTitleEdit(e.target.value)} value={titleEdit} type="text" className="form-control m-3" placeholder="Introduce titulo" ></input>
                                        <ReactQuill id="editResponses" className="m-3" theme="snow" value={bodyEdit} onChange={setBodyEdit} modules={modules} />
                                        <button className="btn btn-primary" onClick={replyEdit}>Editar</button>
                                    </>}

                            </center>
                        </div>

                    </div>
                    {/* 
                    <button className="btn btn-success" onClick={saveReply} /> */}
                </div>
            </center >

        </>


    );
}
