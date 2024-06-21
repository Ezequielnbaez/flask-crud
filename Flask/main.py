from flask import request, jsonify
from config import app, db
from models import Task


@app.route("/tasks", methods=["GET"])
#Consigue las tasks de la db y las pasa a json
def get_tasks():
    tasks = Task.query.all()
    json_tasks = list(map(lambda x: x.to_json(),tasks))
    return jsonify({"tasks": json_tasks})

@app.route("/create_task", methods=["POST","GET"])
#crea las task y las pasa a json
def create_task():
   title = request.json.get("title")
   description = request.json.get("description")
   date = request.json.get("date")

   if not title or not date:
      return (
         jsonify({"message": "Ingresa un título y una fecha"}),
         400,
        )
   new_task = Task(title=title,description=description,date=date)
   try: 
        db.session.add(new_task)
        db.session.commit()
   except Exception as e:
        return jsonify({"message": str(e)}),400 

   return jsonify({"message": "Tarea creada"}),201

@app.route("/update_task/<int:task_id>", methods=["POST","GET"])
#Consigue las tasks de la db las actualiza con
#los datos que ingresaron y las pasa a json actualizados
def update_task(task_id):
    task = Task.query.get(task_id)
    
    if not task:
        return jsonify({"message": "Tarea no encontrada"}),404
    data = request.json
    task.title = data.get("title", task.title)
    task.description = data.get("description", task.description)
    task.date = data.get("date", task.date)

    db.session.commit()

    return jsonify({"message": "Tarea actualizada"}),200

@app.route("/delete_task/<int:task_id>", methods=["DELETE"])
#Consigue el id de la tarea y elimina la misma
def delete_task(task_id):
    task = Task.query.get(task_id)
    
    if not task:
        return jsonify({"message": "Tarea no encontrada"}),404
    
    db.session.delete(task)
    db.session.commit()
        
    return jsonify({"message": "Tarea eliminada"}),200



#Si importamos este archivo, la siguiente línea prevee de que se hagan las tareas y nos permite sólo 
#obtener el recurso importado.
if __name__== "__main__":
    with app.app_context():
        db.create_all()
    #Crea la base de datos si no existe y si existe evita la siguiente línea    


    app.run(debug=True)
