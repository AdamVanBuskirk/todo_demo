import { Application, Request, Response } from 'express'
import { Todo } from '../../models/Todo'
import todos = require('../../models/variables');

module.exports = function(app: Application){

   app.get('/api/todo', (req: Request, res: Response) => {
      res.status(200).send(todos)
   });

   app.delete('/api/todo', (req: Request, res: Response) => {
      if(req.body.id == 0){
         res.status(400).send("To-do not found")
      } else{
         var index = todos.findIndex(t => t.id == req.body.id)
         if(index != -1) {
            todos.splice(index, 1)
            res.status(200).send(todos)
         } else {
            res.status(400).send("To-do not found")
         }  
      }
   });

   app.post('/api/todo', (req: Request, res: Response) => {
      
      var id = 1
      if(todos.length > 0) { 
         id = todos.sort((a,b) => b.id - a.id)[0].id + 1; 
      }

      var rTodo: Todo = {
         id: id,
         name: req.body.name,
         tasks: []
      }
   
      if(rTodo.name == ""){
         res.status(400).send("Please enter a name")
      }
      else if(todos.some(t => t.name == rTodo.name)){
         res.status(400).send("The todo already exists")
      } else{
         todos.push(rTodo)
         res.status(200).send(todos)
      }

   });
}

