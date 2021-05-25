import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import Login from './pages/Login'
import Events from './pages/Events'
import EventsForm from './pages/Events/Form'
import Schedules from './pages/Schedule'
import SchedulesForm from './pages/Schedule/Form'


const Routes = () => (
  <Router>
    <Route exact path="/login">
      <Login />
    </Route>

    <Route exact path="/home">
      <Events />
    </Route>

    <Route exact path="/events/new">
      <EventsForm />
    </Route>

    <Route exact path="/events/:id/schedule">
      <Schedules />
    </Route>

    <Route exact path="/events/:id/schedule/new">
      <SchedulesForm />
    </Route>


  </Router>
)

export default Routes;
