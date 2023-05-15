import React from 'react';
import styles from './internalServer.module.css';

const InternalServer = (props) => {
    return (
        <>
            <p className={styles.internalServer}>{"500 SERVER ERROR!"}</p>
            <p>
                <a href="/">Вернуться на главную</a>
            </p>
        </>
    )
}

export default InternalServer;