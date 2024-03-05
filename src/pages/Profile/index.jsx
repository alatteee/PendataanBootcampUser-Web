import React, { useState } from "react";
import TabContent1 from "./TabContent1";
import TabContent2 from "./TabContent2";
import { useQuery } from "react-query";
import { currentUserFn } from "@/api/Auth";
import Navbar from "../../components/Navbar";

const Profile = () => {
  const { data: dataCurrentUser, isLoading: loadingDataCurrentUser } = useQuery("currentUser", currentUserFn);

  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  console.log(dataCurrentUser);

  return (
    <div>
      <Navbar id={dataCurrentUser?.peserta?.id} />
      <h1 className="font-bold text-5xl mt-7 ml-5">Your Profile</h1>

      <div role="tablist" className="tabs tabs-bordered mt-5 ml-5">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Profile"
          checked={activeTab === "tab1"}
          onChange={() => handleTabChange("tab1")}
        />
        <div role="tabpanel" className="tab-content p-10">
          {activeTab === "tab1" && !loadingDataCurrentUser && <TabContent1 id={dataCurrentUser.peserta.id} />}
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Password"
          checked={activeTab === "tab2"}
          onChange={() => handleTabChange("tab2")}
        />
        <div role="tabpanel" className="tab-content p-10">
          {activeTab === "tab2" && <TabContent2 id={dataCurrentUser.peserta.id} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
