import { Full } from "./components/big/full/full";
import "../src/styles/globals.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Full />,
    },
    {
        path: "/fragment",
        element: <Full isFragment={true} />,
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
