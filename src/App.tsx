import LoadingScreen from "./assets/components/loadingScreen/LoadingScreen.tsx";
import {useEffect, useState} from "react";
import WelcomePage from "./assets/components/WelcomePage.tsx";
import MainPage from "./assets/components/MainPage.tsx";
import {Route, useLocation, Router} from "wouter";
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

    if (!hasVisited && location === "/") {
        localStorage.setItem("hasVisited", "true");
        setLocation("/welcome")
    }
    }, [location, setLocation]);

  if (loading) return <LoadingScreen />;



  return (
      <Router base="/mittweida-timetravel">
        <Route path="/welcome" component={WelcomePage} />
        <Route path="/timetravel/:slug" component={TimeTravel}/>
        <Route path="/" component={MainPage} />
      </Router>
  );
}

export default App;
