import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './styles.css';

export default function NewIncident () {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(evt) {
        evt.preventDefault();

        const data = {
            title,
            description,
            value,
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })    

            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    return (
        <div className="new-incident-container">

            <div className="content">
                <section>
                     <img src={logoImg} alt="logo-heroes"/>
                     <h1>Cadastro novo caso</h1>
                     <p>Descreva o caso detalhadamente para encontar em herói para resolver isso.</p>
               
                     <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                         Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Titulo do cado" 
                        value={title}
                        onChange={evt => setTitle(evt.target.value)}
                    />

                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={evt => setDescription(evt.target.value)}
                    />

                    <input 
                        placeholder="Valor em reais" 
                        value={value}
                        onChange={evt => setValue(evt.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>   
                </form>
            </div>
        </div>
    );
}