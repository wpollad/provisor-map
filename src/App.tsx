import { Full } from "./components/big/full/full";
import { StageFull } from "./components/big/stageFull/full";
import "../src/styles/globals.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Full />,
  },
  {
    path: "/stage",
    element: <StageFull />,
  },
  {
    path: "/tg",
    element: <Full />,
  },
  {
    path: "/fragment",
    element: <Full isFragment={true} />,
  },
  {
    path: "/stage/fragment",
    element: <StageFull isFragment={true} />,
  },
  {
    path: "/gooks",
    element: <Full isGooks={true} />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
