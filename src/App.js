import './App.css';
import {  Nav, Navbar } from "react-bootstrap"
import {Link,Route,Routes,BrowserRouter} from 'react-router-dom'
import Home from './Home';
import About from './About';
import Users from './Users';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Navbar bg="primary" data-bs-theme="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link><Link to="/"> Home </Link></Nav.Link>
            <Nav.Link> <Link to="/about"> About </Link> </Nav.Link>
            <Nav.Link ><Link to="/users"> Users </Link></Nav.Link>
          </Nav>
      </Navbar>
      <Routes>
      <Route Component={About} path='/about'/>
      <Route Component={Users} path='/users'/>
        <Route Component={Home} path='/'/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
