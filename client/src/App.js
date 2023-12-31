import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Fib from './Fib';

function App () {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>FiboCalculator</h1>
        </header>
        <div>
          <Route exact path="/" component={Fib} />
        </div>
      </div>
    </Router>
  );
}

export default App;
