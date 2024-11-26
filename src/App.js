
import Login from "./components/AuthLogin";
import Register from "./components/AuthRegister";
import GetAllWebsites from "./components/WebsiteList";
import UpdateUserForm from "./components/UpdateUser";
import DELETE_FOREVER from "./components/DELETEFOREVER";
import CreateCommerce from "./components/CommerceCreate";
import ComerciosDashboard from "./components/AdminDashboard"

import AuthToken from "./components/AuthCommerce";
import UpdateWebsite from "./components/PageUpdate";
import CommerceDashboard from "./components/CommerceDashboard";
import DeletePage from "./components/PageDelete"
import UploadImage from "./components/PageUploadImage"
import InterestedEmails from "./components/InterestedUsers"
import CreateWebsite from "./components/PageCreate"

const App = () => {
  return (
    <div>
      <h1>Sitios Web</h1>
      <Register/>
      <Login />
      <CreateCommerce/>
      <AuthToken />
      <CommerceDashboard/>
      <InterestedEmails/>
      <UploadImage/>
      <DeletePage />
    </div>
  );
};

export default App;
