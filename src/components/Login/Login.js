import React, {useState} from "react";
import styles from './login.module.css'
import {Button} from "@consta/uikit/Button";
import {TextField} from "@consta/uikit/TextField";
import {Layout} from "@consta/uikit/Layout";
import {Text} from "@consta/uikit/Text";
import {loginApi} from "../../api/api";
import {Navigate} from "react-router";


let Login = ({navigate, dispatch, isLogged, errorValidate}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    if (isLogged) {
        return <Navigate to='/' />
    }

    return (
        <div className={styles.wrap}>
            <Text style={{fontWeight: "600", textTransform: "uppercase"}}>
                Вход
            </Text>
            <section className={styles.form_wrap}>
                <form className={styles.login_layout}>
                    <Layout direction='column'>
                        <TextField onChange={(e) => setEmail(e.value)}
                                   className={styles.textfield}
                                   label="E-mail"
                                   type="email"
                                   value={email}
                                   required
                        />
                        <TextField onChange={(e) => setPassword(e.value)}
                                   className={styles.textfield}
                                   label='Пароль'
                                   type="password"
                                   value={password}
                                   required
                        />
                    </Layout>
                </form>
                <Button className={styles.button} label={'Войти'} view={'secondary'} onClick={() => dispatch(loginApi({email, password}))}/>
                <div className={styles.registerLink}>
                    <Text style={{cursor: "pointer"}} view="brand" onClick={() => navigate('/register')}>
                        Еще не зарегистрированы?
                    </Text>
                </div>
                <section className={styles.errorValidate}>
                    {
                        errorValidate.map((error) => <Text size="s" view="alert"> {error} </Text>)
                    }
                </section>
            </section>
        </div>
    )
}

export default Login;