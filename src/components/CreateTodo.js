import React, {useState} from 'react';
import '../App.css';
import axios from 'axios';
import Navbar from './Navbar';

function CreateTodo(props) {

  const [user, setUser] = useState('')
  const [todo, setTodo] = useState('')
  const [prioridad, setPrioridad] = useState('3')

  const clear = () =>{
    setPrioridad('3')
    setTodo('')
    setUser('')
  }

  const saveTodo = (event) => {
    event.preventDefault();
    axios.post('https://todoapp-33d94.firebaseio.com/users/jack/name.json', {user, todo, prioridad}).then((response) =>{
      alert("Se ha creado el todo con exito")
      //clear()
      props.history.push('/')
    }).catch(() => {
      alert("Hubo un problema che")
    }) //Naming principle, si tus variables se llaman igual que tu key, you might as well just use la variable
  }
  return (
    <div className="App">
      <Navbar/>
      <div className="container">
        <div className="col-12 col-lg-8 col-md-8 col-sm-8">
          <form onSubmit={saveTodo}>
            <div className="form-group">
              <label htmlFor="">Usuario: </label>
              <input type="text" onChange={(event) => setUser(event.target.value)} value={user} className="form-control" name="user" placeholder="Mi nombre"/>
            </div>

            <div className="form-group">
              <label htmlFor="">To-Do</label>
              <textarea name="todo" value={todo} onChange={(event) => setTodo(event.target.value)} id="" className="form-control" cols="30" rows="10"></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="">Prioridad</label>
              <select name="Prioridad" value={prioridad} onChange={(event) => setPrioridad(event.target.value)} id="" className="form-control">
                <option value="3">Alta</option>
                <option value="2">Media</option>
                <option value="1">Baja</option>
              </select>
            </div>
            <button type="submit" className="btn btn-info">Guardar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTodo;
