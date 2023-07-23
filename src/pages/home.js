import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import classNames from 'classnames';
import { listLastPosts } from "../logic/listLastPosts";
import { list } from "postcss";
import { ListGroup } from "flowbite-react";
import { FaPencil } from "react-icons/fa6";




export function Home() {

    const [posts, setPosts] = useState([]);
    const [userId, setuserId] = useState(localStorage.getItem("id"));

    useEffect(() => {
        axios.get('http://localhost:8000/api/posts')
            .then((res) => {

                setPosts(res.data)
            })
            .catch((error) => {
                return ('<h5>Ha ocurrido un error al listar los ultimos posts</h5>');
            })
    }, []);

    return (
        <>

            <div className="flex">

                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {posts.length != 0 ?
                            <>
                                {Object.keys(posts).map(function (key) {
                                    return (
                                        <article key={posts[key].id} className="flex max-w-xl flex-col items-start justify-between">
                                            <div className="flex items-center gap-x-4 text-xs">
                                                <time dateTime={posts[key].date_created} className="text-gray-500">
                                                    {posts[key].date_created}
                                                </time>
                                                <a
                                                    href={'/categories/' + posts[key].categories.id}
                                                    className="relative z-10 rounded-full bg-red-900 px-3 py-1.5 font-medium text-white "
                                                >
                                                    {posts[key].categories != null ? posts[key].categories.nombre : 'Sin categoria'}


                                                </a>

                                                {/* si el usuario logeado es el mismo que el creador del post, puede editarlo */}

                                                {posts[key]['id_user'] == userId ?
                                                    <>
                                                        <a
                                                            href={'/editPost/' + posts[key]['id']}
                                                            className="relative z-10 rounded-full bg-green-500 px-3 py-1.5 font-medium text-gray-600 "
                                                        >

                                                            <FaPencil />

                                                        </a>
                                                    </>
                                                    : ''}
                                            </div>
                                            <div className="group relative">
                                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                                    <a href={'/postReplys/' + posts[key]['id']}>
                                                        <span className="absolute inset-0" />
                                                        {posts[key].title}
                                                    </a>
                                                </h3>
                                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{posts[key].body}</p>
                                            </div>
                                            <div className="relative mt-8 flex items-center gap-x-4">
                                                {/* <img src={posts[key].author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" /> */}
                                                <div className="text-sm leading-6">
                                                    <p className="font-semibold text-gray-900">
                                                        <a href="">
                                                            <span className="absolute inset-0" />
                                                            {posts[key].info_user['username']} // {posts[key].info_user['email']}
                                                        </a>
                                                    </p>

                                                </div>
                                            </div>
                                        </article>
                                    )
                                })}
                            </>

                            : ''}
                    </div>
                </div>

            </div>

        </>


    );
}
