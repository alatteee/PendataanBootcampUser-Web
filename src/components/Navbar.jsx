// Navbar.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { currentUserFn } from "@/api/Auth";
import { CgProfile } from "react-icons/cg";

import { useQuery } from "react-query";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";

const Navbar = ({ id }) => {
  const { data: dataCurrentUser } =
    // useQuery("currentUser", currentUserFn);
    useQuery("currentUser", () => currentUserFn());

  return (
    <div className="navbar bg-base-100 w-full sticky top-0 bg-white/80 backdrop-blur-xl z-40 mt-2">
      <div className="flex justify-between lg:justify-end w-full">
        <div className="flex-none lg:hidden">
          <label
            htmlFor="my-drawer-2"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost drawer-button lg:hidden"
          >
            <HiOutlineBars3CenterLeft size={24} />
          </label>
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col">
            <h5 className="mr-3 font-semibold">{dataCurrentUser?.nama}</h5>
            <h5 className="mr-3 text-right">
              {dataCurrentUser?.batch?.kategori_batch}
            </h5>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-30 rounded-full">
                <img
                  alt="Navbar Photo User"
                  src={`${import.meta.env?.VITE_IMAGE_HOST?.replace(
                    /\/$/,
                    ""
                  )}/${dataCurrentUser?.peserta?.url}`}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="flex items-center font-semibold">
                  <CgProfile className="" />
                  <span>Profile</span>
                </Link>
              </li>

              <li>
                <LogoutButton />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
