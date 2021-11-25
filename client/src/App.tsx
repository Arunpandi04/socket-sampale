  
import { Fragment,useEffect,useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from './Component/LoginForm'
import './App.css';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3000";


function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT,{
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }});
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);
  console.log("res",response);
  
  return (
     
        <Router>
          <Fragment>
          <p>
      It's <time dateTime={response}>{response}</time>
        </p>
            <Switch>
              <Route exact path="/" component={LoginForm} />
             
            </Switch>
          </Fragment>
        </Router>
     
  );
}

export default App;
