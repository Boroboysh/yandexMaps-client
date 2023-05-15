import * as React from 'react';
import {Layout} from "@consta/uikit/Layout";
import {Text} from "@consta/uikit/Text";
import {Navigate} from "react-router";
let Profile = ({login}) => {
    let styles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        padding: '10px 0px 10px 10px',
    }

    let loginStyle = {
        fontWeight: '600'
    }

    if (!window.localStorage.getItem('ymaps_bearer_token')) {
        return <Navigate to='/login' />
    }

    return (
        <Layout style={styles}>
            <Text size="2xl">
                Ваш профиль:
            </Text>
            <Text style={loginStyle} size="2xl">
                {login}
            </Text>
        </Layout>
    );
};

export default Profile;