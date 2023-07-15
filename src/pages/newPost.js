import React from "react";
import classNames from 'classnames';
import { useState } from 'react';


export function NewPost() {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const categories = ['Categoria 1', 'Categoria 2', 'Categoria 3'];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el post al servidor
        console.log(title)
        console.log(category)
        console.log(description)
    };

    return (
        <>
            <div className="flex">
                <div className="w-screen max-w-lg">
                    <form onSubmit={handleSubmit} className="w-screen max-w-lg">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
                                    Título
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="title"
                                    type="text"
                                    placeholder="Escribe el título de tu post aquí"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="category">
                                    Categoría
                                </label>
                                <div className="relative">
                                    <select
                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M14.95 7.95a1 1 0 011.41 0l3.54 3.54a1 1 0 010 1.41l-7.07 7.07a1 1 0 01-.7.29H3a1 1 0 01-1-1v-3.15a1 1 0 01.29-.7l7.07-7.07zM6 10.83V12h1.17l4.63-4.63-1.41-1.41L6 10.83z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                                    Descripción
                                </label>
                                <textarea
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="description"
                                    placeholder="Escribe una descripción breve de tu post aquí"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Publicar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>


    );
}
