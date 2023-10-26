import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Workouts from "./components/workouts/Workouts";
import Navigation from "./components/navigation/Navigation";
import CustomProgram from "./pages/CustomProgram";

import "./App.css";
import { CreateCustomWorkoutPlanProvider } from "./contexts/CreateCustomWorkoutContext";
import { UtilityContext } from "./contexts/UtilityContext";
import { useContext } from "react";
import AuthenticationPage from "./pages/AuthenticationPage";

const queryClient = new QueryClient();

function App() {
  const { isAuthenticated } = useContext(UtilityContext);

  function render() {
    if (!isAuthenticated) {
      return <AuthenticationPage />
    }
    return (
      <QueryClientProvider client={queryClient}>
        <Navigation>
          <div className="h-[calc(100%-98px-50px)] mt-[96px] relative overflow-hidden ">
            <CreateCustomWorkoutPlanProvider>
              <Routes>
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/program/create" element={<CustomProgram />} />
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
