import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [respositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data)
    })
  }, [])

  async function handleAddRepository() {
    const res = await api.post('/repositories',{
      title: "React Brabo do Diegão",
      url: "https://github.com/...",
      techs: [
        "ReactJS",
        "NodeJS",
        "React Native"
      ]
    })

    const repository = res.data

    setRepositories([...respositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const newRepos = respositories.filter(repository => repository.id !== id)
    setRepositories(newRepos)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
