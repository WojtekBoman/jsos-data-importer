import {observer} from 'mobx-react-lite';
import {Button} from 'react-bootstrap';
import {Navigate} from 'react-router-dom';
import {useStores} from '../../App';
import {LoadingSpinner, Message} from '../../components';
import styled from 'styled-components';

const MainDiv = styled.div`
    width: 60vw;
    margin: 10px 20px;
`;

const ImportDiv = styled.div`
    margin: 20px auto;
`;

export const Main = observer(() => {
    const {
        stores: {
            authStore: {isLoggedIn, logout},
            importStore: {error, loading, successText, clearError, clearSuccessText, importTerms},
        },
    } = useStores();

    return (
        <MainDiv>
            {!isLoggedIn && <Navigate to='/auth' />}
            <h2>JSOS</h2>
            <h6>
                Dane powinny być importowane po kolei, pominięcie któregoś z kroków może spowodować
                błędy w zapisie danych do bazy
            </h6>
            <LoadingSpinner loading={loading} />
            <Message show={!!error} text={error} dismissible onClose={clearError} />
            <Message
                show={!!successText}
                text={successText}
                dismissible
                variant='success'
                onClose={clearSuccessText}
            />
            <hr className='my-4'></hr>
            <ImportDiv>
                <h4>Zaimportuj dane semestrów</h4>
                <Button disabled={loading} onClick={importTerms}>
                    Importuj
                </Button>
            </ImportDiv>
            <ImportDiv>
                <h4>Zaimportuj dane wydziałów</h4>
                <Button disabled={loading}>Importuj</Button>
            </ImportDiv>
            <ImportDiv>
                <h4>Zaimportuj dane kierunków</h4>
                <Button disabled={loading}>Importuj</Button>
            </ImportDiv>
            <ImportDiv>
                <h4>Zaimportuj dane prowadzących</h4>
                <Button disabled={loading}>Importuj</Button>
            </ImportDiv>
            <ImportDiv>
                <h4>Zaimportuj dane studentów</h4>
                <Button disabled={loading}>Importuj</Button>
            </ImportDiv>
            <ImportDiv>
                <h4>Zaimportuj dane wpisów studentów</h4>
                <Button disabled={loading}>Importuj</Button>
            </ImportDiv>
            <hr className='my-4'></hr>
            <Button onClick={logout}>Wyloguj się</Button>
        </MainDiv>
    );
});
