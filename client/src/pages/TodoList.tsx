import React from "react"
import { Link } from 'react-router-dom';
import moment from "moment";
import { Todo } from '../../../models/Todo'
import { addTodo, getTodos, deleteTodo } from '../endpoints/Todo'
import { addTask, editTask, deleteTask } from '../endpoints/Task'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { BsBackspace, BsPencil } from'react-icons/bs'
import { IoTrashOutline } from 'react-icons/io5'
import { FcHighPriority, FcLowPriority, FcMediumPriority} from 'react-icons/fc'
import Notification from '../components/notification'
import 'bootstrap/dist/css/bootstrap.min.css'
import './TodoList.css'

interface ComponentProps {
}

type Props = ComponentProps;

interface State {
    todos: Array<Todo>;
    showAddTodoForm: boolean;
    showTaskForm: boolean;
    name: string;
    activeList: number;
    activeTask: number;
    description: string;
    dueDate: string;
    priority: number;
    taskComplete: boolean;
}

class TodoList  extends React.PureComponent<Props, State> {

  constructor(props: Props) {
      super(props);
      this.state = {
          todos: [],
          showAddTodoForm: false,
          showTaskForm: false,
          name: "",
          activeList: -1,
          activeTask: -1,
          description: "",
          dueDate: "",
          priority: 0,
          taskComplete: false
      }
  }

  componentDidMount = () => {
    this.loadTodos();
  }

  /* Controls which page shows, to-do or task */
  setActiveList = (e: React.MouseEvent<HTMLAnchorElement>, listId: number) => {
    e.preventDefault()
    this.setState({ activeList: listId });
  }
 
  goBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); 
    this.setState({ 
      activeList: -1,
      showTaskForm: false,
      showAddTodoForm: false,
    })
  }
  
  toggleAddTodoForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.setState({
      showAddTodoForm: !this.state.showAddTodoForm
    })
  }

  toggleAddTaskForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.setState({
      activeTask: -1,
      showTaskForm: !this.state.showTaskForm,
      description: "",
      dueDate: "",
      priority: 0
    })
  }

  toggleEditTask = (taskId: number) => {

    var todoIndex = this.state.todos.findIndex(t => t.id == this.state.activeList)
    var taskIndex =this.state.todos[todoIndex].tasks.findIndex(t => t.id == taskId)

    /* set form fields to task being edited */

    this.setState({ 
      activeTask: taskId,
      showTaskForm: true,
      description: this.state.todos[todoIndex].tasks[taskIndex].description,
      dueDate: this.state.todos[todoIndex].tasks[taskIndex].dueDate,
      priority: this.state.todos[todoIndex].tasks[taskIndex].priority,
      taskComplete: this.state.todos[todoIndex].tasks[taskIndex].complete
    })
  }

  loadTodos = () => {
    getTodos()
    .then((data) => {
        this.setState({ todos: (data as Array<Todo>) })
    }, (error) => {
    });
  }

  getTodos = (todos: Array<Todo>) => {
    this.setState({ todos: todos })
  }

  deleteTodo = (id: number) => {
    deleteTodo(id)
    .then((data) => {
      this.getTodos(data as Array<Todo>);
      Notification.success("To-dos", "To-do successfully removed")
    }, (error) => {
    });
  }

  addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    addTodo(e)
      .then((data) =>{
        this.setState({ name: "" });
        this.getTodos(data as Array<Todo>);
        Notification.success("To-dos", "To-do successfully added")
      }, (error) => {
        Notification.error("To-dos", error)
      }); 
  }

  addTask = (e: React.FormEvent<HTMLFormElement>) => {
    addTask(e)
      .then((data) =>{
        this.setState({ description: "", dueDate: "", priority: 1 });
        this.getTodos(data as Array<Todo>);
        Notification.success("Tasks", "Task successfully added")
      }, (error) => {
        Notification.error("Tasks", error)
      }); 
  }

  editTask = (e: React.FormEvent<HTMLFormElement>) => {
    editTask(e)
      .then((data) =>{
        this.getTodos(data as Array<Todo>);
        this.setState({ showTaskForm: false })
        Notification.success("Tasks", "Task successfully saved")
      }, (error) => {
        Notification.error("Tasks", error)
      }); 
  }

  deleteTask = (taskId: number, listId: number) => {
    deleteTask(taskId, listId)
    .then((data) => {
      this.getTodos(data as Array<Todo>);
      Notification.success("Tasks", "Task successfully removed")
    }, (error) => {
    });
  }

  render() {

    var isAddTodoDisabled = (this.state.name == "") ? true : false
    var isAddTaskDisabled = (this.state.description == "" || this.state.dueDate == "") ? true : false
    var sortedTodos = this.state.todos.sort((a,b) => b.id - a.id)

    var todoList = sortedTodos.map((todo, index) => {

      var totalTasks = todo.tasks.length
      var completedTasks = todo.tasks.filter(t => t.complete).length
      var cListComplete = (completedTasks == totalTasks && totalTasks > 0) ? "list-complete" : "";

      return (
        <div key={index} className="row m-3 pt-2 pb-2 todo-list-row">
          <div className={`col-11 ${cListComplete}`}>
            <Link to="/" onClick={(e) => this.setActiveList(e, todo.id)}>
              {todo.name}</Link> ({completedTasks}/{totalTasks})
          </div>
          <div className="col-1">
            <Link to="/" onClick={() => this.deleteTodo(todo.id)}>
              <IoTrashOutline  color="#555" size={20} />
            </Link>
          </div>
        </div>
      )
    });

    var taskList: JSX.Element[] = [];
    var listIndex = this.state.todos.findIndex((t => t.id == this.state.activeList));

    if(listIndex != -1) {
      var sortedTasks = this.state.todos[listIndex].tasks.sort((a,b) => b.id - a.id)
      taskList = sortedTasks.map((task, index) => {

        var pIcon;
        var cTaskComplete = (task.complete) ? "task-complete" : "";

        if(task.priority == 0){
          pIcon = <FcLowPriority size={20} />
        } else if (task.priority == 1) {
          pIcon = <FcMediumPriority size={20} />
        } else {
          pIcon = <FcHighPriority size={20} />
        }

        return (
          <div key={index} className="row m-3 pt-2 pb-2 task-list-row">
            <div className="col-1">
              {pIcon}
            </div>
            <div className={`col-6 ${cTaskComplete}`}>
              {task.description}
            </div>
            <div className={`col-3 ${cTaskComplete}`} style={{ textAlign: "right" }}>
              {moment(task.dueDate).format("M/D/YY")}
            </div>
            <div className="col-2" style={{ textAlign: "right" }}>
              <Link className="pe-2" to="/" onClick={() => this.toggleEditTask(task.id)}>
                <BsPencil color="#555" size={20} />
              </Link>
              <Link to="/" onClick={() => this.deleteTask(task.id, this.state.todos[listIndex].id)}>
                <IoTrashOutline  color="#555" size={20} />
              </Link>
            </div>
          </div>
        )
      });
    }
    
    return (
      <React.Fragment>
        {this.state.activeList == -1 ?
          <div className="container p-4">
            <h1 className="m-3">
              <span className="pe-4">To-do List</span>
              <Link to="/" onClick={(e) => this.toggleAddTodoForm(e)}>
                {!this.state.showAddTodoForm ?
                  <AiOutlinePlusCircle color="#555" size={25} />
                :
                  <AiOutlineMinusCircle color="#555" size={25} />
                }
              </Link>
            </h1>
            {this.state.showAddTodoForm &&
              <React.Fragment>
                <form onSubmit={this.addTodo} className="pt-1 ps-3 pe-3 pb-2 form-group">
                  <div className="row">
                    <div className="col-9">
                      <input className="form-control" type="text" id="name" placeholder="name" 
                        value={this.state.name} onChange={(e) => this.setState({ name: e.target.value }) }/>
                    </div>
                    <div className="col-3">
                      <button className="form-control btn btn-primary" disabled={isAddTodoDisabled}>
                        Add To-do
                      </button>
                    </div>
                  </div>
                </form>
              </React.Fragment>
            }
            <div className="todo-list">
              {todoList}
            </div>
          </div>
        :
          <div className="container p-4">
            <h1 className="m-3">
                <span className="pe-4">{listIndex != -1 ? this.state.todos[listIndex].name : ""}</span>
                <Link className="pe-2" to="/" onClick={(e) => this.toggleAddTaskForm(e)}>
                  {!this.state.showTaskForm ?
                    <AiOutlinePlusCircle color="#555" size={25} />
                  :
                    <AiOutlineMinusCircle color="#555" size={25} />
                  }
                </Link>
                <Link to="/" onClick={(e) => this.goBack(e)}>
                  <BsBackspace color="#555" size={25} />
                </Link>
            </h1>
            {this.state.showTaskForm &&
              <React.Fragment>
                <form onSubmit={this.state.activeTask != -1 ? this.editTask : this.addTask} 
                  className="pt-1 ps-3 pe-3 pb-2 form-group">
                  <div className="mb-2">
                    <input className="form-control" type="text" name="description" placeholder="description, required" 
                      value={this.state.description} onChange={(e) => this.setState({ description: e.target.value }) }/>
                  </div>
                  <div className="mb-2">
                    <input className="form-control" type="date" name="dueDate" 
                      min={moment().format("YYYY-MM-DD")}
                      value={this.state.dueDate} onChange={(e) => this.setState({ dueDate: e.target.value }) }/>
                  </div>
                  <div className="mb-2">
                    <input type="hidden" name="listId" value={this.state.activeList} />
                    <select className="form-control" name="priority"
                      value={this.state.priority} onChange={(e) => this.setState({ priority: parseInt(e.target.value) }) }>
                      <option value={0}>Low</option>
                      <option value={1}>Medium</option>
                      <option value={2}>High</option>
                    </select>
                  </div>
                  {this.state.activeTask != -1 &&
                    <div className="mb-2 form-check form-switch">
                      <input type="hidden" name="taskId" value={this.state.activeTask} />
                      <input className="form-check-input" type="checkbox" name="taskComplete" id="taskComplete"
                         checked={this.state.taskComplete} 
                         onChange={() => this.setState({ taskComplete: !this.state.taskComplete })} />
                      <label className="form-check-label" htmlFor="taskComplete">Complete?</label>
                  </div>
                  }
                  <div>
                    <button className="form-control btn btn-primary" disabled={isAddTaskDisabled}>
                      {this.state.activeTask != -1 ? "Save Task" : "Add Task" }
                    </button>
                  </div>
                </form>
              </React.Fragment>
            }
            <div className="task-list">
              {taskList}
            </div>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default TodoList
