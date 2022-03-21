import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import Layout from './Components/Layout';
import {useState} from 'react'



function App() {
  const [notes, setNotes] = useState([])
  
  return (
    <Router>
      <Layout>
      <Switch>
        <Route exact path="/" element={<Notes notes={notes}  setNotes={setNotes} />} /> 
        <Route path="/create" element={<Create notes={notes} setNotes={setNotes} />} />
      </Switch>
      </Layout>
    </Router>
  );
}

export default App;
