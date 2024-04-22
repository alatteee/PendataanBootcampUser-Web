import { useEffect, useState } from "react";
import {
  NavLink as Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { navigation } from "./NavigationItem";
import { LiaTimesSolid } from "react-icons/lia";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { currenUserDataFn, currentUserContent } from "@/api/Auth";

export default function Sidebar({ children }) {
  const location = useLocation();

  const {
    data: userContent,
    isLoading: loadingUserContent,
    isError: errorUserContent,
  } = useQuery("currentUserContent", currentUserContent);

  const updatedNavigation = navigation.map((item) => {
    return {
      ...item,
      current: item.href === location.pathname,
    };
  });

  return (
    <div className="drawer !h-[100vh] lg:drawer-open bg-white">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content overflow-y-auto flex flex-col">
        {children}
      </div>
      <div className="drawer-side !h-[100vh] z-50">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex flex-col p-4 w-full sm:w-80 h-[100%] bg-[#06476F] text-base-content">
          <div className="h-32 mb-2 mt-4 flex items-center justify-between lg:justify-center">
            <div>
              <div className="flex w-36 h-auto">
                <img
                  src={`${import.meta.env?.VITE_IMAGE_HOST?.replace(
                    /\/$/,
                    ""
                  )}/${userContent?.contents?.image_logo_user}`}
                  className="w-full"
                  alt=""
                />
              </div>
              {/* <div>
								<img src={WgsBootcamp} className='w-10' alt='' />
							</div> */}
            </div>
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost drawer-button lg:hidden"
            >
              <LiaTimesSolid size={30} color="#fff" />
            </label>
          </div>

          <ul className="!block text-base font-medium menu h-[70%] overflow-y-auto gap-1 bg-[#06476F] w-full">
            {updatedNavigation.map((item, index) => (
              <li key={index} className="mb-2">
                <Link
                  className={
                    item.current
                      ? "active !bg-white !text-[#06476F]"
                      : "!bg-transparent !text-white hover:!bg-white hover:!text-[#06476F]"
                  }
                  to={item.href}
                  onClick={() =>
                    (document.getElementById("my-drawer-2").checked = false)
                  }
                >
                  {item.icon && <item.icon className="inline-block mr-2" />}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
