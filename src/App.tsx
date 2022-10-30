import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import { SocketProvider } from "./services/SocketProvider";
import { CreateGame } from "./pages/CreateGame";
import { Lobby } from "./pages/Lobby";
import { Game } from "./pages/Game";
import { Question } from "./pages/Question";

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <ChakraProvider>
          <Routes>
            <Route path="/" element={<CreateGame />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/game" element={<Game />} />
            <Route path="/question/:id" element={<Question />} />
          </Routes>
        </ChakraProvider>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
