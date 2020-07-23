import * as React from "react";
import { Suspense } from "react";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";

import { CSSTransition, TransitionGroup } from "react-transition-group";

// import AdminPage from "./AdminPage";
import ProductsPage from "./ProductsPage";
import ProductPage from "./ProductPage";
import Header from "./Header";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./LoginPage";

const AdminPage = React.lazy(() => import("./AdminPage"));

const Routes: React.FC<RouteComponentProps> = (props) => {
  // const [loggedIn, setLoggedIn] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(true);
  return (
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition
          key={props.location.key}
          timeout={500}
          classNames="animate"
        >
          <Switch>
            <Redirect exact={true} from="/" to="/products" />
            <Route exact={true} path="/products" component={ProductsPage} />
            <Route path="/products/:id" component={ProductPage} />
            <Route path="/admin" component={AdminPage}>
              {loggedIn ? (
                <Suspense
                  fallback={<div className="page-container"> Loading...</div>}
                >
                  <AdminPage />
                </Suspense>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/login" component={LoginPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

const RoutesWrap: React.FC = () => {
  return (
    <Router>
      <Route component={Routes} />
    </Router>
  );
};

export default RoutesWrap;
