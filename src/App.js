import './App.scss';

// Components
import { Datenomal, Daterange } from './components/date';

function App() {
  return (
    <div className="App">
      <div className='row'>
        <Datenomal 
          limitMinDate = "2023/10/5"
          local        = "zh"
          defaultValue = "2023/10/10"
          handleChange = {console.log}
        />
      </div>
      <div className='row'>
        <Daterange 
          limitMinDate = "2023/10/5"
          startDate    = "2023/10/9"
          endDate      = "2023/11/8"
          handleChange = {console.log}
        />
      </div>
    </div>
  );
}

export default App;
