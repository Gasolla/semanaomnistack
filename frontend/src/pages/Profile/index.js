import React, { useState, useEffect } from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import  './styles.css';
import logoIMG from '../../assets/logo.svg';

function Profile() {
	const history = useHistory();
	const [incedents, setIncedents] = useState([]);
	const ongName = localStorage.getItem('ongName');
	const ongId = localStorage.getItem('ongId');

	useEffect(()=> {
		api.get('profile', {
			headers: {
				Authorization: ongId, 
			}
		}).then(response => {
			setIncedents(response.data)
		})
	}, [ongId]);

	async function handleDeleteIncidents(id){
		try{
			console.log(id);
			console.log(ongId);
		  await api.delete(`incidents/${id}`, {
			headers: {
				Authorization: ongId, 
			}
		  });
		  setIncedents(incedents.filter(incident=> incident.id!==id));
		} catch(erro){
		  alert('Erro ao deletar caso, tente novamente!')
		}
	}

	function handlelogout(){
		localStorage.clear();
		history.push('/');
	}
	
  	return (
		<div className="profile-container">
			<header>
				<img src={logoIMG} alt="Be Tho Hero"></img>
	  			<span>Bem vindo, {ongName}</span>
				<Link className="button" to="/incedents/new">Cadastrar novo caso</Link>
				<button type="button" onClick={handlelogout}>
					<FiPower size={18} color="#E02041" />
				</button>
			</header> 
			<h1>Casos cadastrados</h1>
			<ul>
				{incedents.map(incident =>(
					<li key={incident.id}>
						<strong>CASO:</strong>
						<p>{incident.title}</p>
						
						<strong>DESCRIÇÃO:</strong>
						<p>{incident.descripition}</p>
						
						<strong>Valor:</strong>
						<p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
						<button type="button" onClick={()=>handleDeleteIncidents(incident.id)}>
							<FiTrash2 size={20} color="#a8a8b3" />
						</button>
					</li>
				))}

			</ul>   
		</div>

    );
};

export default Profile;