import "./App.css";
import { Header } from "./components/Header";
import LogInContextProvider from "./store/login-context";
import { MainContent } from "./components/MainContent";
import { DatesContextProvider } from "./store/date-context";
import { DataContextProvider } from "./store/data-context";

function App() {
  return (
    <>
      <DataContextProvider>
        <DatesContextProvider>
          <LogInContextProvider>
            <Header />
            <MainContent />
            <footer>
              by dydr31@github
              <p>
                <a
                  href="https://www.flaticon.com/free-icons/close"
                  title="close icons"
                >
                  Close icons created by joalfa - Flaticon
                </a>
              </p>
              <p>
                <a
                  href="https://www.flaticon.com/free-icons/down-arrow"
                  title="down arrow icons"
                >
                  Down arrow icons created by th studio - Flaticon
                </a>
              </p>
              <p>
                <a
                  href="https://www.flaticon.com/free-icons/pencil"
                  title="pencil icons"
                >
                  Pencil icons created by Pixel perfect - Flaticon
                </a>
              </p>
              <p>
                <a
                  href="https://www.flaticon.com/free-icons/open-menu"
                  title="open menu icons"
                >
                  Open menu icons created by Pixel perfect - Flaticon
                </a>
              </p>
            </footer>
          </LogInContextProvider>
        </DatesContextProvider>
      </DataContextProvider>
    </>
  );
}

export default App;
