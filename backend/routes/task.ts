import { Application, Request, Response } from 'express'
import { Task } from '../../models/Task'
import todos = require('../../models/variables');

module.exports = function(app: Application){

   app.post('/api/task', (req: Request, res: Response) => {
      
      var listId = req.body.listId
      var description = req.body.description
      var dueDate = req.body.dueDate
      var priority = req.body.priority

      var index = todos.findIndex((t => t.id == listId));

      if(description == ""){
         res.status(400).send("Please enter a description")
      }
      else if(dueDate == ""){
         res.status(400).send("Please enter a due date")

      } else if(todos[index].tasks.some(t => t.description == description)){
         res.status(400).send("The task already exists on the list")

      } else{
         
         if(index != -1){ 

            var id = 1
            if(todos[index].tasks.length > 0) { 
               id = todos[index].tasks.sort((a,b) => b.id - a.id)[0].id + 1; 
            }

            var task: Task = {
               id: id,
               description: description,
               dueDate: dueDate,
               priority: priority,
               complete: false
            }

            todos[index].tasks.push(task)
            res.status(200).send(todos)
         }else {
            res.status(400).send("The to-do list was not found")
         }
      }

   });

   app.put('/api/task', (req: Request, res: Response) => {
      
      var listId = req.body.listId
      var taskId = req.body.taskId
      var description = req.body.description
      var dueDate = req.body.dueDate
      var priority = req.body.priority
      var complete = req.body.complete

      var listIndex = todos.findIndex((t => t.id == listId));
      if(listIndex != -1) {
         var taskIndex = todos[listIndex].tasks.findIndex((t => t.id == taskId))
         if(taskIndex != -1){ 
            todos[listIndex].tasks[taskIndex].description = description
            todos[listIndex].tasks[taskIndex].dueDate = dueDate
            todos[listIndex].tasks[taskIndex].priority = priority
            todos[listIndex].tasks[taskIndex].complete = complete
            res.status(200).send(todos)
         } else {
            res.status(400).send("The task list was not found")
         }
      } else {
         res.status(400).send("The to-do list was not found")
      }

   });

   app.delete('/api/task', (req: Request, res: Response) => {
      
      var listId = req.body.listId
      var taskId = req.body.taskId

      var listIndex = todos.findIndex((t => t.id == listId));
      if(listIndex != -1) {
         var taskIndex = todos[listIndex].tasks.findIndex((t => t.id == taskId))
         if(taskIndex != -1){ 
            todos[listIndex].tasks.splice(taskIndex, 1)
            res.status(200).send(todos)
         } else {
            res.status(400).send("The task list was not found")
         }
      } else {
         res.status(400).send("The to-do list was not found")
      }

   });
}

