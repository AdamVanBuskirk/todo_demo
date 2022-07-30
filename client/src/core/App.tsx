import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './Layout'
import Layout from './Layout';
import TodoList from '../../src/pages/TodoList';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'bootstrap/dist/css/bootstrap.min.css'

interface ComponentProps {
  children ?: React.ReactNode;
}

type Props = ComponentProps;

class App extends React.PureComponent<Props> {

  render() {
    return (
       <Layout>
         <ReactNotifications />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TodoList />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    )
  }
}

export default App