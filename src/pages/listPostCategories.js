import React from "react";
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { info } from "autoprefixer";
import { FaTrash, FaRegEye, FaRegSquarePlus } from "react-icons/fa6";




export function Categories(props) {

    const { categoryId } = useParams();
    const [infoCat, setInfoCat] = useState(null);

    //con useEffect hago una petición para obtener las categories
    useEffect(() => {

        axios.get('http://localhost:8000/api/categories/' + categoryId, {
        })
            .then((res) => {

                setInfoCat(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, []);

    return (

        <>
            {infoCat != null ?
                <>
                    <center>
                        <div className="mt-5">
                            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-white mr-1">Posts asociados a la categoría
                                <a className="relative z-10 rounded-full bg-red-900 p-3 py-1.5 font-medium text-white ml-2"> #{infoCat.nombre ?? null}</a>
                            </h1>
                            <a href={'/post/' + categoryId} className="bg-green-100 text-green-800   mb-5 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Crear post nuevo </a>

                            {infoCat['posts'].length > 0 ?
                                <div className="flex justify-center mt-5">
                                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center mx-4">
                                        {
                                            infoCat['posts'].map((post) => {

                                                return <div className="bg-gray-100 p-4 h-full">
                                                    <div className="flex flex-col h-full justify-between">
                                                        <div>
                                                            <h1 class="text-5xl font-extrabold mb-3 dark:text-white"><small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">{post.title}</small></h1>
                                                            <p class="text-gray-500 dark:text-gray-400 ">{post.body}</p>
                                                        </div>
                                                        <div className="flex justify-center mt-4">
                                                            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded flex items-center m-3">
                                                                Ver respuestas <FaRegEye className="ml-1" />
                                                            </button>
                                                            {post.id_user == localStorage.getItem('id') ?
                                                                <>
                                                                    <button className="bg-red-500 text-white font-bold py-2 px-4 rounded flex items-center m-3">
                                                                        Eliminar <FaTrash className="ml-1" />
                                                                    </button>                                                                </> : ''}

                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>

                                : <h5>Esta categoria aún no tiene posts asociados</h5>}
                        </div>
                    </center >
                </>
                : <h3>Cargando información de la categoria</h3>}


        </>


    );
}
