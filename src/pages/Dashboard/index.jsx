import React, { useEffect, useState } from "react";
import hello from "../../images/peoplehello.png";
import Navbar from "../../components/Navbar";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import {
  currentUserContent,
  currentUserFn,
  currenUserDataFn,
} from "@/api/Auth";

const DashboardContent = () => {
  const [showPasswordChangeAlert, setShowPasswordChangeAlert] = useState(false);

  // Gunakan useQuery untuk mendapatkan data pengguna
  const {
    data: userData,
    isLoading: loadingUserData,
    isError: errorUserData,
  } = useQuery("currentUser", currentUserFn);

  // Gunakan useQuery untuk mendapatkan data konten pengguna
  const {
    data: userContent,
    isLoading: loadingUserContent,
    isError: errorUserContent,
  } = useQuery("currentUserContent", currentUserContent);

  // Gunakan useQuery untuk mendapatkan data pengguna terkait
  const { data: userRelatedData } = useQuery(
    ["currentUserData", userData?.peserta?.id],
    () => currenUserDataFn(userData?.peserta?.id)
  );

  // const {
  //   data: dataIdCurrentUser,
  //   refetch: refetchCurrentUserData,
  //   isLoading: loadingParticipant,
  //   isError,
  // } = useQuery(["currentUserData", dataIdCurrentUser?.peserta?.id], () =>
  //   currenUserDataFn(dataCurrentUser?.peserta?.id)
  // );

  console.log("user", userRelatedData);
  console.log("content", userContent);

  useEffect(() => {
    if (userRelatedData && userRelatedData?.default_password === true) {
      setShowPasswordChangeAlert(true);
    }
  }, [userRelatedData]);

  // Tampilkan pesan error jika gagal memuat data
  if (errorUserData) return <div>Error fetching user data...</div>;

  // Tampilkan elemen kosong sementara data dimuat
  if (loadingUserData || !userData || !userRelatedData) return null;

  // Check apakah password telah diubah, jika belum tampilkan alert

  return (
    <div>
      <Navbar id={userData?.peserta?.id} />

      {showPasswordChangeAlert && (
        <div role="alert" className="alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Warning: Segera ubah password anda!</span>
          <div>
            <Link to="/profile">
              <button className="btn btn-sm">Ganti Password</button>
            </Link>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 lg:mt-40">
        <div className="grid flex-col lg:grid-cols-2 gap-4 items-center justify-center">
          <div className="max-w-80 h-auto lg:max-w-80 lg:w-80 ml-auto mt-6 lg:mt-0">
            <img
              src={`${import.meta.env?.VITE_IMAGE_HOST?.replace(
                /\/$/,
                ""
              )}/${userContent?.contents?.image_home_user}`}
              className="w-full h-auto"
              alt="Hello"
            />
          </div>
          <div className="lg:max-w-20">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold">{`Hello ${
                userData?.nama || "there"
              }`}</h1>
              <p className="py-4 lg:py-6 text-xl lg:text-3xl font-semibold">
                Welcome to {userRelatedData?.Batch?.kategori_batch}
              </p>
              <p className="py-0 lg:py-0 text-xl lg:text-2xl">
                {userRelatedData?.Batch?.materi_batch}
              </p>
              <p className="text-lg lg:text-xl mt-3">
                {userRelatedData?.Batch?.deskripsi_batch_user}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
