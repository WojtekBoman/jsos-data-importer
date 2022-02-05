import {observer} from 'mobx-react';
import React from 'react';
import './App.css';
import RootStore from './stores/RootStore';
import {Routes, Route} from 'react-router-dom';
import {Auth, Main} from './screens';

const rootStore = new RootStore();
const storesContext = React.createContext(rootStore);
export const useStores = () => React.useContext(storesContext);

export default observer(() => {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/auth' element={<Auth />}></Route>
            </Routes>
        </div>
    );
});
