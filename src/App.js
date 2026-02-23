import LudoBoard from "./components/LudoBoard";
import { LudoContextProvider } from "./Context/LudoContext";

function App() {
  return (
    <LudoContextProvider>
      <div className="App">
        <div className="container m-auto h-screen w-screen flex justify-center items-center">
          <LudoBoard />
        </div>
      </div>
    </LudoContextProvider>
  );
}

export default App;
