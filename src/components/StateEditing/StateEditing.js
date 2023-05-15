import React, {useState} from 'react';
import styles from './stateEditing.module.css'
import {TextField} from "@consta/uikit/TextField";
import {Button} from "@consta/uikit/Button";
import {deletePointApi, updatePointApi} from "../../api/api";
import {FieldGroup} from "@consta/uikit/FieldGroup";
import {cnMixSpace} from "@consta/uikit/MixSpace";
import {Text} from "@consta/uikit/Text";

const StateEditing = ({indexArray, point, dispatch, setCentredCoordinates, pointerSelector}) => {
    const [isEditing, setIsEditing] = useState(false);

    const [editName, setEditNamePoint] = useState();
    const [editLongitude, setEditLongitude] = useState();
    const [editLatitude, setEditLatitude] = useState();

    let updatePoint = (index) => {
        if (isEditing) {
            const newState = {
                name: editName ? editName : point.name,
                longitude: editLongitude ? editLongitude : point.longitude,
                latitude: editLatitude ? editLatitude : point.latitude,
            }

            dispatch(updatePointApi({
                id: pointerSelector.pointers[index].id,
                state: newState
            }))

            setIsEditing(false)
        } else {
            setIsEditing(true)
        }
    }

    return (
        <section className={styles.locationList__element}>
            <section className={styles.locationList__element__viewMode} style={{
                display: !isEditing ? '' : 'none'
            }}
                     onClick={() => setCentredCoordinates({
                         center: [point.longitude, point.latitude],
                         zoom: 9
                     })}>
                <Text as="span">{point.name} |</Text>
                <Text as="span"> {point.longitude} |</Text>
                <Text as="span"> {point.latitude} </Text>
            </section>
            <section className={styles.locationList__element__editMode} style={{
                display: isEditing ? '' : 'none'
            }}>
                <TextField value={editName}
                           label='Название'
                           placeholder={'Default: ' + point.name}
                           onChange={(e) => setEditNamePoint(e.value)}
                           size="xs"
                />
                <TextField value={editLongitude}
                           label='Долгота'
                           placeholder={'Default: ' + point.longitude}
                           onChange={(e) => setEditLongitude(e.value)}
                           size="xs"
                />
                <TextField value={editLatitude}
                           label='Широта'
                           placeholder={'Default: ' + point.latitude}
                           onChange={(e) => setEditLatitude(e.value)}
                           size="xs"
                />
            </section>

            <section className={styles.locationList__element__buttons}>
                <FieldGroup size="s" className={cnMixSpace({
                    m: 'm',
                    mT: 'l',
                })}>
                    <Button label="Редактировать"
                            size="s"
                            view="secondary"
                        // style={{marginRight: '5px '}}
                            onClick={() => updatePoint(indexArray)}
                    />

                    <Button label="Удалить"
                            view='secondary'
                            size='s'
                        // style={{margin: '5px'}}
                            onClick={() => dispatch(deletePointApi(point.id))}
                    />
                </FieldGroup>
            </section>
        </section>
    )
}

export default StateEditing