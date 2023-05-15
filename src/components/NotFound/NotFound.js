import React from 'react';
import styles from './notFound.module.css';

const NotFound = (props) => {
    return (
        <p className={styles.internalServer}>{"404 NOT FOUND"}</p>
    )
}

export default NotFound;