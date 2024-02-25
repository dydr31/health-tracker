import './App.css';
import { Wellcome } from './components/Wellcome';
import { Header } from './components/Header';

function App() {
  return (
    <>
    <Header/>
    <div>
      <Wellcome/>
    </div>
    <footer>
      by dydr31@github
    </footer>
    </>
  );
}

export default App;
