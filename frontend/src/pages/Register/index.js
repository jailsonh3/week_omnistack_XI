import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function Register(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(evt){
        evt.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

       try {
            const response = await api.post('ongs', data)

            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/');
       } catch (err) {
            alert('Erro no cadastro, tente novamente.');
       }


    }


    return (
        <div className="register-container">

            <div className="content">
                <section>
                     <img src={logoImg} alt="logo-heroes"/>
                     <h1>Cadastro</h1>
                     <p>Faça seu cadastro, entre na platafoma e ajude pessoas a encontrarem os casos da sua ONG.</p>
               
                     <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                         Já tenho cadastro!
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG" 
                        value={name}
                        onChange={ evt => setName(evt.target.value)}   
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={ evt => setEmail(evt.target.value)}
                    />
                    <input 
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={ evt => setWhatsapp(evt.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={ evt => setCity(evt.target.value)}
                        />
                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }}
                            value={uf}
                            onChange={ evt => setUf(evt.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>   
                </form>
            </div>
        </div>
    );
}