import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import LoggerSearchPage from "./page/LoggerSearchPage";
function App() {
  return (
    <div className="App">
      <NavigationBar />
      <LoggerSearchPage />
    </div>
  );
}

export default App;
