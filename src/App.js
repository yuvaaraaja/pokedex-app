import './App.css';
import Pokemon from './pokemon/Pokemon';

function App() {
  return (
    <div className='app'>      
      <img 
        src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
        alt = "nothing"
        className = "titleImg">  
      </img>
      <center className = 'title'>
        Generation One
      </center>
      <br></br>      
      <div>
        <Pokemon/>
      </div>
    </div>
  );
}

export default App;
