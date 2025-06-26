import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// We'll wrap our app with Ant Design's ConfigProvider to set the theme and App component to use the theme properly.
import { ConfigProvider, App as AntdApp } from "antd";
import {
  ThemedLayoutV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";

// import { dataProvider } from "./providers/data-provider";
import { amplifyDataProvider } from "./providers/amplify-data-provider";
import { authProvider } from "./providers/amplify-auth-provider";

// import { ShowProduct } from "./pages/products/show";
// import { EditProduct } from "./pages/products/edit";
// import { ListProducts } from "./pages/products/list";
// import { CreateProduct } from "./pages/products/create";
import { ListPosts } from "./pages/posts/list";
import { ShowPost } from "./pages/posts/show";
import { EditPost } from "./pages/posts/edit";
import { CreatePost } from "./pages/posts/create";

import { ShowUser } from "./pages/users/show";
import { EditUser } from "./pages/users/edit";
import { ListUsers } from "./pages/users/list";
import { CreateUser } from "./pages/users/create";

// import { Login } from "./pages/login";
import { LoginPage } from "./components/pages/auth/components/login";
import { RegisterPage } from "./components/pages/auth/components/register";
import { ForgotPasswordPage } from "./components/pages/auth/components/forgotPassword";
import { ChangePasswordPage } from "./pages/change-password";

// We're importing a reset.css file to reset the default styles of the browser.
import "antd/dist/reset.css";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={amplifyDataProvider}
              authProvider={authProvider}
              routerProvider={routerProvider}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "posts",
                  list: "/products",
                  show: "/products/:id",
                  edit: "/products/:id/edit",
                  create: "/products/create",
                  meta: { label: "Amplify Products" },
                },
                {
                  name: "users",
                  list: "/users",
                  create: "/users/create",
                  edit: "/users/edit/:id",
                  show: "/users/show/:id",
                  meta: { label: "Users" },
                },
              ]}
              options={{
                projectId: "7mWsBi-KvB4Jg-Ux5eAo"
              }}>
              <Routes>
                <Route
                  element={
                    // We're wrapping our routes with the `<Authenticated />` component
                    // We're omitting the `fallback` prop to redirect users to the login page if they are not authenticated.
                    // If the user is authenticated, we'll render the `<Header />` component and the `<Outlet />` component to render the inner routes.
                    <Authenticated
                      key="authenticated-routes"
                      redirectOnFail="/login"
                    >
                      <ThemedLayoutV2
                        Title={(props) => (
                          <ThemedTitleV2 {...props} text="My Project" />
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={
                      <NavigateToResource resource="posts" />
                    }
                  />
                  {/* <Route path="/products"> */}
                    {/* <Route index element={<ListProducts />} />
                    <Route path=":id" element={<ShowProduct />} />
                    <Route path=":id/edit" element={<EditProduct />} />
                    <Route path="create" element={<CreateProduct />} /> */}
                  {/* </Route> */}
                  <Route path="/posts">
                    <Route index element={<ListPosts />} />
                    <Route path=":id" element={<ShowPost />} />
                    <Route path=":id/edit" element={<EditPost />} />
                    <Route path="create" element={<CreatePost />} />
                  </Route>
                  <Route path="/users">
                    <Route index element={<ListUsers />} />
                    <Route path=":id" element={<ShowUser />} />
                    <Route path=":id/edit" element={<EditUser />} />
                    <Route path="create" element={<CreateUser />} />
                  </Route>
                </Route>
                <Route
                  element={
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                      {/* We're redirecting the user to `/` if they are authenticated and trying to access the `/login` route */}
                      <NavigateToResource resource="posts" />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/change-password" element={<ChangePasswordPage />} />
                </Route>
              </Routes>
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}
