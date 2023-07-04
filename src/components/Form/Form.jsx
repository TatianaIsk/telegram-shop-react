import React, {useCallback, useEffect, useState} from 'react';
import './Form.css'
import {useTelegram} from "../../hooks/useTelegram";
const Form = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            login,
            password,
        }
        tg.sendData(JSON.stringify(data))
    }, [login, password])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if (!login || !password) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [login, password])

    const onChangeLogin = (e) => {
        setLogin(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className={'form'}>
            <h3>Введите данные</h3>
            <input
                className={'input'}
                type='text'
                placeholder={'логин'}
                value={login}
                onChange={onChangeLogin}
            />
            <input
                className={'input'}
                type='password'
                placeholder={'пароль'}
                value={password}
                onChange={onChangePassword}
            />
        </div>
    );
};

export default Form;