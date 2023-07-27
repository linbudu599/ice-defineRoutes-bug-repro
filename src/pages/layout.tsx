import {
  Outlet,
  useNavigate,
  useLocation,
} from "ice";
import { useEffect, useState } from "react";
import GeneratedRouterInfo from "../router";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeLink, setActiveLink] =
    useState<string>();

  const handleLinkClick = (link: string) => {
    navigate(link);
  };

  const RouterItemRender = (
    route: any[],
    parentPathPrefix: string = ""
  ) => {
    const completePath = `${
      parentPathPrefix === "/"
        ? ""
        : parentPathPrefix
    }${route.path}`;

    return (
      <div className="sidebar-link-container">
        <p
          className={
            activeLink === completePath
              ? "sidebar-link sidebar-link-active"
              : "sidebar-link"
          }
          onClick={() => {
            handleLinkClick(completePath);
          }}
        >
          {route.path.startsWith("/")
            ? route.path === "/"
              ? "Index"
              : route.path.slice(1)
            : route.path}
        </p>
        {route.children?.length ? (
          <div className="sidebar-link-container">
            {route.children.map((childRoute) =>
              RouterItemRender(
                childRoute,
                completePath
              )
            )}
          </div>
        ) : null}
      </div>
    );
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div className="layout-container">
      <div className="sidebar-container">
        {GeneratedRouterInfo.map((route) =>
          RouterItemRender(route)
        )}
      </div>
      <div className="content-container">
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
