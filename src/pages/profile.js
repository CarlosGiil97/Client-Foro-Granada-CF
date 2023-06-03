import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { updateProfile } from "../logic/updateProfile";
import { toast } from "react-hot-toast";
import Context from '../components/context'

export function Profile() {

    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [active, setActive] = useState(true)
    const [selectedImage, setSelectedImage] = useState(null);
    const [id, setId] = useState(null);
    const serverUrl = process.env.REACT_APP_SERVER_URL_IMG;

    const { logout } = useContext(Context);

    //con useEffect hago una petición para obtener toda la info del usuario
    useEffect(() => {
        let userId = localStorage.getItem('id');
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/users/' + userId, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then((res) => {
                let infoClient = res.data.user;
                if (infoClient != null) {
                    console.log(infoClient)
                    setName(infoClient.name)
                    setSurname(infoClient.surname)
                    setUsername(infoClient.username)
                    setEmail(infoClient.email)
                    setPhone(infoClient.phone)
                    setAddress(infoClient.address)
                    setId(infoClient.id)
                    setActive(infoClient.active === 1 ? true : false)
                }
            })
            .catch((error) => {
                console.error(error)
            })

    }, []);

    const changeStatusMenu = () => {
        isOpen == true ? setIsOpen(false) : setIsOpen(true);
    }

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const uploadImgProfile = async (event) => {
        return;
        let userId = localStorage.getItem('id');
        event.preventDefault();

        if (selectedImage) {
            const formData = new FormData();
            //formData.append('image', selectedImage);
            formData['image'] = selectedImage;

            console.log(formData);
            try {
                const response = await axios.post('http://localhost:8000/api/users/uploadImg', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // Manejar la respuesta del servidor aquí si es necesario
                console.log(response.data);
            } catch (error) {
                // Manejar el error aquí si es necesario
                console.error(error);
            }
        } else {
            toast('La imagen no puede estar vacia', {
                icon: '❌',
            });
        }
    }







    const updateForm = (e) => {
        e.preventDefault();
        let data = { name, surname, username, email, phone, address };
        console.log(data)
        //itero data para comprobar que ningun campo está vacio
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key] === undefined || data[key] === null || data[key] == '') {
                    toast('Todos los campos son obligatorios', {
                        icon: '❌',
                    });
                    return;
                }
            }
        }

        updateProfile(data)
    }


    return (
        <>



            <div className=" pt-10">
                <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg px-4 py-4">
                    <div className="flex justify-center">
                        <div className="rounded-full w-24 h-24 overflow-hidden">
                            <img src={serverUrl + id + '.png'} alt="Avatar" />
                        </div>
                    </div>
                    <form className="flex flex-wrap" onSubmit={updateForm}>
                        <div className="w-full md:w-1/2 pr-2 mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="first-name">
                                Nombre
                            </label>
                            <input onChange={(e) => setName(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="first-name" type="text" value={name} />
                        </div>
                        <div className="w-full md:w-1/2 pl-2 mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="last-name">
                                Apellido
                            </label>
                            <input onChange={(e) => setSurname(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="last-name" type="text" value={surname} />
                        </div>
                        <div className="w-full md:w-1/2 pr-2 mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input onChange={(e) => setEmail(e.target.value)} disabled className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value={email} />
                        </div>

                        <div className="w-full md:w-1/2 pl-2 mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="last-name">
                                Telefono
                            </label>
                            <input onChange={(e) => setPhone(e.target.value)} maxLength={9} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="last-name" type="tel" value={phone} />
                        </div>
                        <div className="w-full md:w-2/2 pl-2 mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                                Nombre de usuario
                            </label>
                            <input onChange={(e) => setUsername(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={username} />
                        </div>
                        <div className="w-full md:w-2/2 pl-2 mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                                Dirección
                            </label>
                            <input onChange={(e) => setAddress(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" value={address} />
                        </div>
                        <div className="w-full md:w-1/2 pl-2 mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                                Estado de la cuenta
                            </label>
                            {active === true ?
                                <>
                                    <input
                                        class="relative float-left -ml-[1.5rem] ml-4 mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="radioDefault02"
                                        checked disabled /></>
                                :
                                <>
                                    <input
                                        class="relative float-left -ml-[1.5rem] ml-4 mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="radioDefault02"
                                        disabled /></>}

                            <label
                                class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                for="radioDefault02">
                                Activo
                            </label>
                        </div>
                        <div className="w-full md:w-1/2 pl-2 mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                                Actualizar imagen de perfil
                            </label>
                            <input
                                disabled
                                onChange={handleImageChange}
                                class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                id="formFileLg"
                                type="file" />
                            <a onClick={uploadImgProfile} class="m-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                Actualizar imagen
                            </a>

                        </div>
                        <div className="w-full flex justify-end">
                            <a onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Cerrar sesión
                            </a>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Actualizar
                            </button>

                        </div>
                    </form>
                </div>
            </div >



        </>


    );
}
