import { Header } from "./components/Header";
import LogInContextProvider from "./store/login-context";
import { MainContent } from "./components/MainContent";
import { DatesContextProvider } from "./store/date-context";
import { Footer } from "./components/Footer";
import { DataContextProvider } from "./store/data-context";

function App() {
  return (
    <>
      <DataContextProvider>
        <LogInContextProvider>
          <Header />
          <MainContent />
          <Footer />
        </LogInContextProvider>
      </DataContextProvider>
    </>
  );
}

export default App;
