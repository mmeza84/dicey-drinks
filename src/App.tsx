import "./App.scss";
import RouterView from "./RouterView";

function App() {
  return (
    <div className="app">
      <h1>
        <a href="/">Dicey Drinks</a>
      </h1>
      <div className="app-content">
        <RouterView />
      </div>
    </div>
  );
}

export default App;
