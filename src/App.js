import './App.css';
import {Route, Routes, useNavigate} from "react-router";
import Main from "./components/Main/Main";
import React, {useEffect} from "react";
import {presetGpnDefault, Theme} from "@consta/uikit/Theme";
import {Header, HeaderLogin, HeaderModule} from "@consta/uikit/Header";
import {Layout} from "@consta/uikit/Layout";
import {Text} from "@consta/uikit/Text";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@consta/uikit/Button";
import {getPointerListApi, logoutApi, userInfoApi} from "./api/api";
import {YMaps} from "@pbe/react-yandex-maps";
import axios from "axios";
import data from './../package.json';
import InternalServer from "./components/InternalServer/InternalServer";
import NotFound from "./components/NotFound/NotFound";

axios.defaults.baseURL = data.serverUrl;
axios.defaults.withCredentials = true;

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {login, errorValidate, status} = useSelector(state => state.login);

    useEffect(() => {
        if (!login && window.localStorage.getItem('ymaps_bearer_token')) {
            dispatch(userInfoApi());
        }

        if (login) {
            dispatch(getPointerListApi())
        }
    }, [login])

    if (status === 'reject') {
        return <InternalServer/>

    }

    return (
        <Theme preset={presetGpnDefault}>
            <Layout direction='column' style={{width: '100%', alignItems: 'center'}}>
                <Header leftSide={
                    <>
                        <HeaderModule>
                            <Text style={{cursor: "pointer"}} view="brand" onClick={() => navigate('/')}>
                                YMaps
                            </Text>

                        </HeaderModule>
                    </>
                } rightSide={
                    <>
                        <HeaderModule>
                            <HeaderLogin
                                isLogged={login}
                                personName={login}
                                onClick={() => login ? navigate('/profile') : navigate('/login')}
                                label='Войти'
                            />

                            {
                                login ? <Button label="Выйти" onClick={() => dispatch(logoutApi())}/> : <></>
                            }
                        </HeaderModule>
                    </>
                }/>
            </Layout>
            <YMaps>
                <Routes>
                    <Route element={<Login isLogged={login} navigate={navigate} dispatch={dispatch}
                                           errorValidate={errorValidate}/>} path="/login"/>
                    <Route element={<Register isLogged={login} navigate={navigate} dispatch={dispatch}
                                              errorValidate={errorValidate}/>}
                           path="/register"/>
                    <Route element={<Main isLogged={login} dispatch={dispatch} status={status}/>} path="/"/>
                    <Route element={<Profile login={login}/>} path="/profile"/>
                    <Route element={<InternalServer/>} path="/500"/>
                    <Route element={<NotFound/>} path="*"/>
                </Routes>

            </YMaps>
        </Theme>

    );
}

export default App;
