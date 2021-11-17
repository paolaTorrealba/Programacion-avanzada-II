import React, { useEffect, useState } from 'react'
import Form from './Form'
import Main from './Main'
import Tabla from './Tabla'

//url a la 'base'
const URL = "http://localhost:5000/mascotas/";

const Crud = () => {
    const [mascotas, setMascotas] = useState([])
    const [mascotaEdit, setMascotaEdit] = useState(null)
    const [loading, setloading] = useState(false)


    useEffect(() => {
        const getMascotas = async (url) => {
            setloading(true);
            try {
                const res = await fetch(url);
                const data = await res.json();
                console.log("mascotas: ", data);
                setMascotas(data);
                setloading(false);
            } catch (error) {

            }
        }
        getMascotas(URL)
    }, [])

    const crearMascota = (nuevaMascota) => {
        nuevaMascota.id = Date.now();
        setloading(true);
        fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaMascota)
        })
            .then(res => res.json())
            .then(mascota => {
                setMascotas(mascotas => [...mascotas, mascota])
            })
            .finally(() => {
                alert("Se creo la mascota correctamente")
                setloading(false);
            })
    }

    const modificarMascota = (mascotaAModificar) => {
        setloading(true);
        fetch(URL + mascotaAModificar.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mascotaAModificar)
        })
            .then(res => res.json())
            .then(mascotaModificada => {
                setMascotas((mascotas) => {
                    return mascotas.map((mascota) =>
                        mascota.id === mascotaModificada.id ? mascotaModificada : mascota
                    )
                })
            })
            .finally(() => {
                alert("Se modifico la mascota correctamente")
                setloading(false);
            })
    }

    const borrarMascota = (id) => {
        if (window.confirm("confirma que desea eliminar " + id)) {
            setloading(true);
            fetch(URL + id, {
                method: "DELETE"
            })
                .then(res => {
                    if (res.ok) {
                        setMascotas((mascotas) => {
                            return mascotas.filter(mascota => mascota.id !== id)
                        })
                    }
                })
                .finally(() => {
                    alert("Se eliminaron los datos correctamente")
                    setloading(false);
                })
        }
    }

    return (
        <div className="columns">
            <div className="column">
                <section className="section">
                    {
                        loading
                            ? (<Main />)
                            : (<Tabla
                                data={mascotas}
                                setMascotaEdit={setMascotaEdit}
                                borrarMascota={borrarMascota}
                            />)
                    }
                </section>

            </div>
            <div className="column">
                <section className="section">
                    <Form
                        crearMascota={crearMascota}
                        modificarMascota={modificarMascota}
                        setMascotaEdit={setMascotaEdit}
                        mascotaEdit={mascotaEdit}
                    />
                </section>
            </div>
        </div>
    )
}

export default Crud