import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import CurrentApp from './components/CurrentApp/CurrentApp';
import WeatherApp from './components/WeatherApp/WeatherApp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route exact path='/weather' element={<WeatherApp/>}/>
        <Route exact path='/current' element={<CurrentApp/>}/>
      </Routes>
    </div>
  );
}

export default App;
