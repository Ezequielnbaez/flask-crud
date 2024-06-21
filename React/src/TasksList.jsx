import React from "react"

//cuando queremos realizar el update llamamos
// a updateTask, una vez que se realizó llamamos a updateCallback
const TasksList = ({tasks, updateTask, updateCallback}) => {
    
    //Borrar, recibe el id de la task
    const onDelete = async(id) => {
        try{
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_task/${id}`, options)
            if(response.status ===200){
                updateCallback()
            }else {
                console.error("No se pudo eliminar")
            }
        } catch(error) {
            alert(error)
        }
    }
    
    
    
    return <div>
        <h2>Tareas</h2>
        <table>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map ((task)=> (
                    <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.date}</td>
                        <td>
                            <button onClick={()=>updateTask(task)}>Actualizar</button>
                            <button onClick={()=>onDelete(task.id)}>Eliminar</button>
                        </td>
                    </tr>
                    ))}
            </tbody>
        </table>
    </div>
}

export default TasksList