import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Workouts from "./components/workouts/Workouts";
import Navigation from "./components/navigation/Navigation";
import CustomProgram from "./pages/CustomProgram";
import Logout from "./components/authentication/Logout";

import "./App.css";
import { CreateCustomWorkoutPlanProvider } from "./contexts/CreateCustomWorkoutContext";
import { useContext } from "react";
import AuthenticationPage from "./pages/AuthenticationPage";
import { AuthContext } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const routes = {
  nonAuth: [
    { path: "/register", element: <AuthenticationPage page='register' /> },
    { path: "/login", element: <AuthenticationPage page='login'/> },
  ],
  auth: [
    { path: "/logout", element: <Logout /> },
    { path: "/workouts", element: <Workouts /> },
    { path: "/program/create", element: <CustomProgram /> },
  ],
};

function App() {
  const { isAuth } = useContext(AuthContext);

  function render() {
    if (!isAuth) {
      return (
        <Routes>
          {routes.nonAuth.map((route, index) => (
            <Route path={route.path} element={route.element} key={index}/>
          ))}
        </Routes>
      );
    }
    return (
      <QueryClientProvider client={queryClient}>
        <Navigation>
          <div className="h-[calc(100%-98px-50px)] mt-[96px] relative overflow-hidden ">
            <CreateCustomWorkoutPlanProvider>
              <Routes>
                {routes.auth.map((route, index) => (
                  <Route path={route.path} element={route.element} key={index} />
                ))}
              </Routes>
            </CreateCustomWorkoutPlanProvider>
          </div>
        </Navigation>
      </QueryClientProvider>
    );
  }

  return render();
}

export default App;
