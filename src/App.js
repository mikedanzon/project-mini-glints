import { Route, Switch } from 'react-router';
import './assets/styles/style.scss';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Movie from './pages/Overview';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/movie/:id" component={Movie} />
      </Switch>
    </>
  );
}

export default App;
