import { useState } from "react"

//El formulario recibe la tarea existente si se va a actualizar, sino la data queda vacía para crear
const TaskForm = ({ existingTask = {}, updateCallback }) => {
    const [title, setTitle] = useState(existingTask.title || "")
    const [description, setDescription] = useState(existingTask.description || "")
    const [date, setDate] = useState(existingTask.date || "")

    //Se fija si al dar click elegiste actualizar o crear verificando si recibiste data de tarea o no
    const updating = Object.entries(existingTask).length !== 0

    const onSubmit = async (e) => {
        //No vamos a refrescar la página al submittear
        e.preventDefault()

        //Como const data es un objeto js lo pasamos a JSON
        const data = {
            title,
            description,
            date
        }
        //El url nos dice a donde va a ir el request, si estamos actualizando, envía la data a la 
        //ruta de /actualizar con su respectiva id
        // si no directamente va a la ruta de /crear
        const url = "http://127.0.0.1:5000/" + (updating ? `update_task/${existingTask.id}` : "create_task")
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        //Una vez convertido lo mandamo
        const response = await fetch(url, options)

        //Si tenemos éxito o no, te alerta
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }

    }

    return (
        <form onSubmit={onSubmit} >
            <div className="form">
                <h3>Tarea</h3>
                <div className="input-container ic1">
                    <input id="title" className="input" type="text" placeholder=" "
                        value={title} onChange={(e) => setTitle(e.target.value)} />
                    <div className="cut"></div>
                    <label htmlFor="firstname" className="placeholder">Título</label>
                </div>
                <div className="input-container ic2">
                    <textarea id="description" className="input" type="text" placeholder=" "
                        value={description} onChange={(e) => setDescription(e.target.value)} />
                    <div className="cut"></div>
                    <label htmlFor="description" className="placeholder">Descripción</label>
                </div>
                <div className="input-container ic2">
                    <input id="date" className="input" type="date" placeholder=" "
                        value={date} onChange={(e) => setDate(e.target.value)} />
                    <div className="cut cut-short"></div>
                    <label htmlFor="date" className="placeholder">Fecha</label>
                </div>
                <button type="submit" className="submit">Aceptar</button>
            </div>
        </form>
    )
}

export default TaskForm