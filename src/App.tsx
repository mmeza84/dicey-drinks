import "./App.scss";
import Header from "@/components/header/Header";
import RouterView from "./RouterView";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-content">
        <RouterView />
      </div>
    </div>
  );
}

export default App;
