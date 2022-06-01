import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {characterUrl} from './characterUrl'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
fetch(characterUrl)
    .then(async res=>{
        let data = await res.json();
        root.render(
            <React.StrictMode>
                <App {...data}/>
            </React.StrictMode>
        );
    })

