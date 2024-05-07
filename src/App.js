import "./App.css";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";


function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <PageContent></PageContent>
      </div>
      
    </div>
  );
}
export default App;
