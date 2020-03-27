import React, {useState} from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import  './styles.css';
import logoIMG from '../../assets/logo.svg';

function NewIncedents() {
  const [title, setTitle] = useState('');
  const [descripition, setDescripition] = useState('');
  const [value, setValue] = useState('');
  const ongId = localStorage.getItem('ongId');
  const usehistory = useHistory();
  async function handleIncidentes(e){
    e.preventDefault();
    const data = {
      title, 
      descripition, 
      value, 
    };
    
    try{
      await api.post('incidents', data, 
      {
        headers: {
          Authorization: ongId, 
        }
      });
      usehistory.push('/profile');
    }catch(err){
        alert('Erro no cadastro, tente novamente.')
     }
  }

  return (
    <div className="new-incedents-container">
      <div className="content">
        <section>
          <img src={logoIMG} alt="Be Tho Hero"></img>
          <h1>Cadastro novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link className="back-link" to="/profile"><FiArrowLeft size={16} color="#02041" />Voltar para home</Link>
        </section>

        <form onSubmit={handleIncidentes}>
          <input placeholder="Titulo do caso" 
            value={title}
            onChange={e=>setTitle(e.target.value)}
          />
          <textarea  placeholder="Descrição" 
              value={descripition}
              onChange={e=>setDescripition(e.target.value)}  
          />
          <input placeholder="Valor em reais" 
              value={value}
              onChange={e=>setValue(e.target.value)}  
          />
          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
    );
};

export default NewIncedents;