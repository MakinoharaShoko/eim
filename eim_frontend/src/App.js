import './App.css';
import {Login} from "./components/login/Login";
import {Main} from "./components/main/Main";
import {Register} from "./components/register/Register";
import '@icon-park/react/styles/index.css';

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
