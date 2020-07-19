import React from 'react';


function CardTodo(props){

const bg = {
    "1":"card text-white bg-success my-3",
    "2":"card text-white bg-warning my-3",
    "3":"card text-white bg-danger my-3",
}

    return(
        <div className={bg[props.prioridad]}>
            <div className="card-header">
                Creado por: {props.nombre}
                <button className="close" onClick={() => props.delete()}>
                    <span>&times;</span>
                </button>
            </div>

            <div className="card-body">
                <p className="card-text">{props.todo}</p>
            </div>
            <div className="card-footer text-center">
                <button className="btn btn-info btn-card" onClick={() => props.edit()}>Editar</button>
            </div>
        </div>
    )
}

export default CardTodo;