import LoadingScreen from "./assets/components/loadingScreen/LoadingScreen.tsx";
import {useEffect, useState} from "react";
import WelcomePage from "./assets/components/WelcomePage.tsx";
import MainPage from "./assets/components/MainPage.tsx";
import {Route, useLocation} from "wouter";
import TimeTravel from "./assets/components/TimeTravel.tsx"


function App() {
    const [location, setLocation] = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer); // Cleanup
  }, []);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited && location === "/mittweida-timetravel") {
        localStorage.setItem("hasVisited", "true");
        setLocation("/welcome")
    }
    }, [location, setLocation]);

  if (loading) return <LoadingScreen />;



  return (
      <>
        <Route path="/welcome" component={WelcomePage} />
        <Route path="/timetravel/:slug" component={TimeTravel}/>
        <Route path="/mittweida-timetravel" component={MainPage} />
      </>
  );
}

export default App;
