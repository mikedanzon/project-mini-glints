import { Route, Switch } from 'react-router';
import './assets/styles/style.scss';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
