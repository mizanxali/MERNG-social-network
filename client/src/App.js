import { BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import MenuBar from './components/MenuBar'
import Post from './pages/Post'

import { AuthProvider } from './context/auth'

import 'semantic-ui-css/semantic.min.css'
import './App.css'
import AuthRoute from './util/AuthRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className='ui container'>
          <MenuBar />
          <Route path='/' exact component={Home} />
          <AuthRoute path='/login' exact component={Login} />
          <AuthRoute path='/register' exact component={Register} />
          <Route exact path='/posts/:postId' component={Post} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
