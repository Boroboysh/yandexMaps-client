import React, {useEffect, useState} from "react";
import styles from './main.module.css'
import {Map, Placemark, ZoomControl} from "@pbe/react-yandex-maps";
import {useSelector} from "react-redux";
import {TextField} from "@consta/uikit/TextField";
import {Button} from "@consta/uikit/Button";
import {createNewPoint} from "../../api/api";
import {Text} from "@consta/uikit/Text";
import {Layout} from "@consta/uikit/Layout";
import StateEditing from "../StateEditing/StateEditing";
import {Loader} from "@consta/uikit/Loader";

let Main = ({isLogged, dispatch, status}) => {
    const pointerSelector = useSelector(state => state.pointer)

    const [centredCoordinates, setCentredCoordinates] = useState({center: [], zoom: 9});

    const [currentUserLongitude, setCurrentUserLongitude] = useState(0)
    const [currentUserLatitude, setCurrentUserLatitude] = useState(0)

    const [namePoint, setNamePoint] = useState();
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentUserLongitude(position.coords.longitude);
                setCurrentUserLatitude(position.coords.latitude)

                setCentredCoordinates({
                    center: [position.coords.longitude, position.coords.latitude],
                    zoom: 10
                });

            }, (err) => {
                console.log(err)
            });
        } else {
            alert('Geolocation is not supported by your browser')
        }
    }, [])

    if (!isLogged) {
        if (status !== 'idle') {
            return <div className={styles.wrapper}><Loader/></div>
        }
        else {
            return (
                <div className={styles.wrapper}>
                    <Layout>
                        <section className={styles.layout}>
                            <div className={styles.layout__title}>
                                Веб-приложение для работы с Яндекс картами
                            </div>
                            <div className={styles.layout__description}>
                                Создание, удаление и редактирование точек на карте
                            </div>
                        </section>
                    </Layout>
                </div>
            )
        }
    }

    return (
        <div className={styles.wrap}>
            <section className={styles.locationListWrap}>
                <form >
                    <label htmlFor="namePoint">
                        <TextField label="Название: "
                                   onChange={(e) => setNamePoint(e.value)}
                                   type="text"
                                   value={namePoint}
                                   size="s"

                        />
                    </label>
                    <label htmlFor="longitude">
                        <TextField label="Долгота: "
                                   onChange={(e) => setLongitude(e.value)}
                                   type="text"
                                   value={longitude}
                                   size="s"
                        />
                    </label>
                    <label htmlFor="latitude">
                        <TextField label="Широта: "
                                   onChange={(e) => setLatitude(e.value)}
                                   type="text"
                                   value={latitude}
                                   size="s"
                        />
                    </label>
                    <label htmlFor="error">
                    {
                        pointerSelector.errorValidate.map((error) => <Text size="s" view="alert"> {error} </Text>)
                    }
                    </label>
                </form>
                <Button label="Добавить"
                        onClick={() => dispatch(createNewPoint({namePoint, longitude, latitude}))}
                        size="s"
                        id="buttonAddNew"/>
                <section className={styles.locationList}>
                    <div className={styles.locationList__title}>
                        <Text view='primary'>Название</Text>
                        <Text view='primary'>Долгота</Text>
                        <Text view='primary'>Широта</Text>
                    </div>
                    <div>
                        {
                            pointerSelector.pointers.map((point, index) => {
                                return <StateEditing key={index} indexArray={index} point={point} dispatch={dispatch}
                                                     setCentredCoordinates={setCentredCoordinates}
                                                     pointerSelector={pointerSelector}/>
                            })
                        }
                    </div>
                </section>
            </section>
            <section className={styles.yandexMapWrap}>
                <Map state={centredCoordinates} width="800px" height="800px">
                    {
                        pointerSelector.pointers.map((point) => <Placemark key={point.id}
                                                                           geometry={[point.longitude, point.latitude]}
                                                                           properties={{
                                                                               balloonContent: point.name,
                                                                           }}
                        />)
                    }
                    <Placemark geometry={[currentUserLongitude, currentUserLatitude]}
                               properties={{
                                   balloonContent: 'Ты здесь',
                               }}
                               modules={['geoObject.addon.balloon']}
                    />
                    <ZoomControl options={{float: "right"}}/>
                </Map>
            </section>
        </div>
    )
}

export default Main;