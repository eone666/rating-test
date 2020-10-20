import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Container>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/report/:id" exact component={Report} />
            </Switch>
          </Container>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
