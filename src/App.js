import { Route, Switch } from 'react-router';
import './assets/styles/style.scss';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Movie from './pages/Overview';
import Profile from './pages/Profile';
import Notfound from './pages/Notfound';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/movie/:id" component={Movie} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route path="*" component={Notfound} />
      </Switch>
    </>
  );
}

export default App;
