import LoadingScreen from "./assets/components/loadingScreen/LoadingScreen.tsx";
import {useEffect, useState} from "react";
import WelcomePage from "./assets/components/WelcomePage.tsx";
import MainPage from "./assets/components/MainPage.tsx";
import {Route, useLocation, Router} from "wouter";
import TimeTravel from "./assets/components/TimeTravel.tsx"


function RoutedApp() {
    const [location, setLocation] = useLocation();
    const [loading, setLoading] = useState(true);
    const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer); // Cleanup
  }, []);

  useEffect(() => {
      if (!loading && !ready) {
          const hasVisited = localStorage.getItem("hasVisited");
          if (!hasVisited && (location === "/" || location === "")) {
              localStorage.setItem("hasVisited", "true");
              setLocation("/welcome")
          }
          setReady(true);
      }
    }, [location, setLocation, ready, loading]);

  if (loading || !ready) {
      return <LoadingScreen />;
  }



  return (
      <>
        <Route path="/welcome" component={WelcomePage} />
        <Route path="/timetravel/:slug" component={TimeTravel}/>
        <Route path="/" component={MainPage} />
      </>
  );
}

function App() {
    return (
        <Router base="/mittweida-timetravel">
            <RoutedApp />
        </Router>
    )
}


export default App;
