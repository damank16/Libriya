import logo from './logo.svg';
import './App.css';
import React from 'react';
import Filter from './components/filterMenu';

function App() {
  const [checked, setChecked] = React.useState(true);
  return (
    <div className="App">
      <Filter  setChecked={setChecked}
      checked= {checked} />
    </div>
  );
}

export default App;
