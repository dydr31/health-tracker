import "./App.css";
import { Wellcome } from "./components/Wellcome";
import { Header } from "./components/Header";
import LogInContextProvider from "./store/login-context";

function App() {
  return (
    <>
      <LogInContextProvider>
        <Header />
        <div>
          <Wellcome />
        </div>
        <footer>by dydr31@github</footer>
      </LogInContextProvider>
    </>
  );
}

export default App;
