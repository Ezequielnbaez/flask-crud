import { useState, useEffect } from 'react'
import './App.css'
import TasksList from './TasksList'
import TaskForm from './TaskForm'

function App() {
  //Declarás una constante que usa State donde se guarden las tareas
  const [tasks, setTasks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState({})

  //Apenas el componente carga, llamas a fetchtasks
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    //Fetcheas a la dirección y aguardas(await) respuesta
    const response = await fetch("http://127.0.0.1:5000/tasks")
    const data = await response.json()
    setTasks(data.tasks)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    //Si cerramos vacia la data
    setCurrentTask({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  //Al updatear cierra el modal y actualiza 
  //la lista de tareas con fetch
  const onUpdate = () =>{
    closeModal()
    fetchTasks()
  }
  //Si abris el modal para actualizar, 
  //este recibe la tarea respectiva y la envía
  //para que se settee al formulario
  const openEditModal = (task) => {
    if (isModalOpen) return
    setCurrentTask(task)
    setIsModalOpen(true)
  }

//updateTask={openEditModal} Le envias a la TaskList el modal con 
//la data de la tarea
  return (
    <>
      <TasksList tasks={tasks} updateTask={openEditModal} updateCallback={onUpdate}/>
      <button onClick={openCreateModal}>Crear contacto nuevo</button>
      {isModalOpen && <div className='modal'>
        <div className='modal-content'>
          <span className='"close' onClick={closeModal}>&times;</span>
          <TaskForm existingTask={currentTask} updateCallback={onUpdate}/>
        </div>
      </div>
      }
    </>
  );
}

export default App
