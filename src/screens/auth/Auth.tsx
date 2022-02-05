import {observer, useLocalObservable} from 'mobx-react-lite';
import {useStores} from '../../App';
import {Navigate} from 'react-router-dom';
import {makeAutoObservable} from 'mobx';
import {Button, Form} from 'react-bootstrap';
import {LoadingSpinner, Message} from '../../components';
import styled from 'styled-components';

const AuthDiv = styled.div`
    width: 60vw;
    margin: 100px auto;
`;

class AuthLocalStore {
    constructor() {
        makeAutoObservable(this);
    }

    email = '';
    password = '';

    errors = {
        email: '',
        password: '',
    };

    onChangeEmail = (value: string) => {
        this.email = value;
    };

    onChangePassword = (value: string) => {
        this.password = value;
    };

    validatePassword = () => {
        if (!!this.password) {
            this.errors.password = '';
        } else {
            this.errors.password = 'Password is required field';
        }
    };

    validateEmail = () => {
        if (!this.email) {
            this.errors.email = 'Email is required field';
        } else {
            const isValid = this.email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
            if (isValid) {
                this.errors.email = '';
            } else {
                this.errors.email = 'Email does not match to pattern';
            }
        }
    };

    get disabledButton() {
        return !this.email || !this.password;
    }
}

export const Auth = observer(() => {
    const {
        stores: {
            authStore: {isLoggedIn, loading, error, clearError, signIn},
        },
    } = useStores();

    const {
        errors,
        email,
        password,
        onChangeEmail,
        onChangePassword,
        validateEmail,
        validatePassword,
    } = useLocalObservable(() => new AuthLocalStore());

    return (
        <AuthDiv>
            {isLoggedIn && <Navigate to='/' />}
            <h2>JSOS</h2>
            <hr className='my-4'></hr>
            <Form onSubmit={(event) => signIn(event, email, password)}>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Adres e-mail</Form.Label>
                    <Form.Control
                        onBlur={validateEmail}
                        value={email}
                        onChange={(event) => onChangeEmail(event.target.value)}
                        type='email'
                        placeholder='Email'
                    />
                </Form.Group>
                <Message show={!!errors.email} text={errors.email} />
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control
                        onBlur={validatePassword}
                        value={password}
                        onChange={(event) => onChangePassword(event.target.value)}
                        type='password'
                        placeholder='Hasło'
                    />
                </Form.Group>
                <Message show={!!errors.password} text={errors.password} />
                <Button type='submit'>
                    <LoadingSpinner loading={loading} />
                    Zaloguj
                </Button>
                <Message show={!!error} text={error} dismissible onClose={clearError} />
            </Form>
        </AuthDiv>
    );
});
