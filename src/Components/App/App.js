import Views from "../Views/Views"; 
import UserProvider from "../Contexts/AccountContext";

function App() {
  return (
    <UserProvider>
      <Views />
    </UserProvider>
  );
}

export default App;
