import { Route, Routes } from "react-router-dom"; 
import { routes } from "./routes.const";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  return (
    <Routes>
        {routes.map((route, key) => 
        route.protected ? (
            <Route key={key} path="/" element={<PrivateRoute />}>
                <Route
                    {...route.args}
                    path={route.path}
                    element={<route.element/>}
                />
            </Route>
        ) : (
            <Route
            key={key}
            {...route.args}
            path={route.path}
            element={<route.element/>}
            />
        )
        )}
    </Routes>
  );
};

export default Router;
