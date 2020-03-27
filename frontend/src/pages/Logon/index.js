import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import  './styles.css';
import hereoesIMG from '../../assets/heroes.png';
import logoIMG from '../../assets/logo.svg';

 function Logon() {
    const [id, setID] = useState('');
    const usehistory = useHistory();
    async function handleLogin(e){
        e.preventDefault();
        try{
            const response = await api.post('sessions', {id});
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            console.log(response.data.name);
            usehistory.push('/profile');
        }catch(err){
            alert('Falha no login');
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
            <img src={logoIMG} alt="Be Tho Hero"></img>
            <form onSubmit={handleLogin}>
                <h1>Faça seu login</h1>
                <input placeholder="Sua ID"
                    value={id}
                    onChange={e=>setID(e.target.value)}
                />
                <button type="submit" className="button">Entrar</button>
                <Link className="back-link" to="/register"><FiLogIn size={16} color="#02041" />Não tenho cadastro</Link>
            </form>
            </section>
            <img src={hereoesIMG} alt="Heroes"></img>
        </div>
    );
};

export default Logon;