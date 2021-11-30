import './App.css';
import {Login} from "./components/login/Login";
import {Main} from "./components/main/Main";
import {Register} from "./components/register/Register";

function App() {
  return (
      <div>
          <Register/>
          <Login/>
          <Main/>
      </div>
  )
}

export default App;
