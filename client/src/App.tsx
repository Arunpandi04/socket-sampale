
import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LoginForm from './Component/LoginForm'
import NotFound from './Component/NotFound'
import './App.css';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3000";


function App() {
  const [response, setResponse] = useState(true);

  const MINUTE_MS = 60000*60;
  

// useEffect(() => {
//   const interval = setInterval(() => {
//     console.log('Logs every minute');
//   }, MINUTE_MS);

//   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
// }, [])

  useEffect(() => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNjM3ODQ1Njk1LCJleHAiOjE2Mzc4NDU3NTV9.OKn3t-Hh_EQ8w8Lm7lKORVtnYUveYwmGrZap8NLjiqk'
    const socket = socketIOClient(ENDPOINT, {
      withCredentials: true,
      auth: {
        token: token
      },
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });
    socket.on("FromAPI", data => {
      setResponse(data);
    })
  }, []);
  console.log("res", response);

  if (!response) {
    return (
      <Router>
        <Redirect to='/notFound' />
      </Router>
    )
  }

  return (

    <Router>
      <Fragment>
        <p>
          It's {response}
        </p>
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/notFound" component={NotFound} />
        </Switch>
      </Fragment>
    </Router>

  );
}

export default App;
