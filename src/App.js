import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import Filter from "./components/Filter/Filter";
import SidebarCategorises from "./components/SidebarCategories/SidebarCategories";
import Filters from "./components/Filters/Filters";
import Sidebar from "./components/Sidebar/Sidebar";
import Layout from "./components/Layout/Layout";
import MainContent from "./components/MainContent/MainContent";

function App() {
  return (
    <div className="App">
      <Header />
      <Layout>
        <Categories />
        <div className="side__main-container">
          <div className="row">
            <Sidebar />
            <MainContent />
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default App;
