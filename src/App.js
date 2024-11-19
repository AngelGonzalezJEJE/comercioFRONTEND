
import Login from "./components/Login";
import Register from "./components/Register";
import GetAllWebsites from "./components/WebsiteList";
import UpdateUserForm from "./components/UpdateUser";
import DELETE_FOREVER from "./components/DELETEFOREVER";

const App = () => {
  return (
    <div>
      <h1>Sitios Web</h1>
      <Login />
      <Register />
      <UpdateUserForm/>
      <DELETE_FOREVER />
      <GetAllWebsites />
    </div>
  );
};

export default App;
