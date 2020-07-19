import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CardTodo from './CardTodo';
import Navbar from './Navbar';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';

function Home(){


    const [todosAlta, setTodosAlta] = useState([])
    const [todosMedia, setTodosMedia] = useState([])
    const [todosBaja, setTodosBaja] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [currentTodo, setCurrentTodo] = useState({})
    const [isOpenDelete, setDelete] = useState(false)

    useEffect(()=>{
        axios.get('https://todoapp-33d94.firebaseio.com/users/jack/name.json').then((response) =>{
            console.log(response.data)
            const elements = Object.entries(response.data).reverse();
            
            const realData = elements.map((todo) => {
                const [id, data] = todo; //destructurando arreglo de adentro
                return{
                    id,
                    ...data
                }
            })
            const alta = realData.filter((todo) => todo.prioridad === "3")
            const media = realData.filter((todo) => todo.prioridad === "2")
            const baja = realData.filter((todo) => todo.prioridad === "1")
            setTodosAlta(alta)
            setTodosMedia(media)
            setTodosBaja(baja)
        }).catch((error) => {
            alert(error)
        })
    },[isOpen])

    return(
        <div className="App">
            <Navbar/>
            <div className="container mt-5 pt-5">

                <div className="row justify-content-center mb-5">
                    <div className="col-4">
                        <a href="/createTodo" className="btn btn-lg bg-dark text-white">
                            Crear To-Do
                        </a>
                    </div>
                </div>

                <div className="row">

                    <div className="col-sm-4 col-md-4 col-lg-4">
                        <h4>Importantes</h4>
                            { todosAlta.map((todo) => {
                                return(                                
                                    <CardTodo
                                    nombre={todo.user}
                                    todo={todo.todo}
                                    prioridad={todo.prioridad}
                                    edit={() => {
                                        setCurrentTodo(todo)
                                        setIsOpen(true)
                                    }}
                                    delete={() => {
                                        setCurrentTodo(todo)
                                        setDelete(true)
                                    }}
                                    />
                                )
                            } )}
                    </div>

                    <div className="col-sm-4 col-md-4 col-lg-4">
                        <h4>No pasa nada</h4>
                            { todosMedia.map((todo) => {
                                return(                                
                                    <CardTodo
                                    nombre={todo.user}
                                    todo={todo.todo}
                                    prioridad={todo.prioridad}
                                    edit={() => {
                                        setCurrentTodo(todo)
                                        setIsOpen(true)
                                    }}
                                    />
                                )
                            } )}
                    </div>

                    <div className="col-sm-4 col-md-4 col-lg-4">
                        <h4>Fresh</h4>
                            { todosBaja.map((todo) => {
                                return(                                
                                    <CardTodo
                                    nombre={todo.user}
                                    todo={todo.todo}
                                    prioridad={todo.prioridad}
                                    edit={() => {
                                        setCurrentTodo(todo)
                                        setIsOpen(true)
                                    }}
                                    />
                                )
                            } )}
                    </div>

                </div>
            </div>
            <ModalEdit open={isOpen} close={setIsOpen} todo={currentTodo}/>
            <ModalDelete open={isOpenDelete} close={setDelete} todo={currentTodo}/>
        </div>
    )
}

export default Home;