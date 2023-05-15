import React, {useState} from 'react';
import styles from './register.module.css';
import {Text} from "@consta/uikit/Text";
import {Layout} from "@consta/uikit/Layout";
import {TextField} from "@consta/uikit/TextField";
import {Button} from "@consta/uikit/Button";
import {registerApi} from "../../api/api";
import {Navigate} from "react-router";

const Register = ({navigate, dispatch, errorValidate, isLogged}) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    if (isLogged) {
        return <Navigate to='/' />
    }

    return (
        <div className={styles.wrap}>
            <Text>
                Регистрация
            </Text>
            <section className={styles.form_wrap}>
                <form>
                    <Layout direction='column'>
                        <TextField label="Логин" type="text" onChange={(e) => setName(e.value)} value={name} required/>
                        <TextField label="E-mail" type="email" onChange={(e) => setEmail(e.value)} value={email}
                                   required/>
                        <TextField label='Пароль' type="password" onChange={(e) => setPassword(e.value)}
                                   value={password} required/>
                    </Layout>
                </form>
                <Button label={'Зарегистрироваться'} view={'secondary'}
                        onClick={() => dispatch(registerApi({name, email, password}))}/>
                <Text className={styles.loginLink} style={{cursor: "pointer"}} view="brand"
                      onClick={() => navigate('/login')}>
                    Уже зарегистрированы?
                </Text>
                <section className={styles.errorValidate}>
                    {
                        errorValidate.map((error) => <Text size="s" view="alert"> {error} </Text>)
                    }
                </section>
            </section>
        </div>
    );
};

export default Register;