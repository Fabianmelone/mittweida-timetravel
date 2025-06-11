import LoadingScreen from "./assets/LoadingScreen.tsx";
import {useEffect, useState} from "react";
import WelcomePage from "./assets/WelcomePage.tsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
      <>
        {loading ? <LoadingScreen /> :
            <div>
              <WelcomePage />
            </div>}
      </>

  )
}

export default App;
