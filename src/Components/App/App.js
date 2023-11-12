import Views from "../Views/Views";
import HostProvider from "../Contexts/AccountContext";
import PlayerProvider from "../Contexts/PlayerContext";

function App() {
  return (
    <HostProvider>
      <PlayerProvider>
        <Views />
      </PlayerProvider>
    </HostProvider>
  );
}

export default App;
