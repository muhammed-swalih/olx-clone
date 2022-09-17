import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { firebaseContext} from './Context'
import {
    firebase,
    auth,
    storage,
    
} from './firebase'
import Context from './Context'

ReactDOM.render(
<firebaseContext.Provider value={{firebase,auth,storage}}>
<Context>
<App />
</Context>
</firebaseContext.Provider>


, document.getElementById('root'));
