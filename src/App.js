import React from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Banner from './Components/Banner/Banner';
import RowPost from './Components/RowPost/RowPost';
import {action,originals,romance,horror,comedy} from './urls'
function App() {
  return (
    <div className="App">
      {/* <h1>appjs</h1> */}
      <NavBar/>
      <Banner/>
      <RowPost url={originals} title='Netflix Originals' />
      <RowPost url={action} title='Action' isSmall />
      <RowPost url={comedy} title='Comedy' isSmall/>
      <RowPost url={romance} title='Romance' isSmall/>
      <RowPost url={horror} title='Horror' isSmall/>
      
    </div>
  );
}

export default App;
