import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Redir from "./Redir";

function App() {
  return (
    <Router>
      <div className="h-screen w-full">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:id" component={Redir} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
