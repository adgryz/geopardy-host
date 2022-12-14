import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import { SocketProvider } from "./services/SocketProvider";
import { CreateTournament } from "./pages/CreateTournament";
import { Lobby } from "./pages/Lobby";
import { Geopardy } from "./geopardy/Geopardy";
import { Question } from "./geopardy/Question";
import { FinalQuestion } from "./geopardy/FinalQuestion";
import { TournamentSummary } from "./pages/TournamentSummary";
import { Winner } from "./pages/Winner";
import theme from "./theme";

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <ChakraProvider theme={theme}>
          <Routes>
            <Route path="/" element={<CreateTournament />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/tournament" element={<TournamentSummary />} />
            <Route path="/game" element={<Geopardy />} />
            <Route path="/question/:id" element={<Question />} />
            <Route path="/finalQuestion" element={<FinalQuestion />} />
            <Route path="/winner" element={<Winner />} />
          </Routes>
        </ChakraProvider>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
