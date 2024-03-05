import React, { useState, useEffect } from "react";
import BarChart from "./BarChart"; // Ubah impor dari Chart ke BarChart
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useQuery } from "react-query";
import { currenUserDataFn, currentUserFn } from "@/api/Auth";

const Report = () => {
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false);
  const { data: dataCurrentUser, isLoading: loadingDataCurrentUser } = useQuery(
    "currentUser",
    currentUserFn
  );

  const {
    data: dataIdCurrentUser,
    refetch: refetchCurrentUserData,
    isLoading: loadingParticipant,
    isError,
  } = useQuery(["currentUserData", dataCurrentUser?.peserta?.id], () =>
    currenUserDataFn(dataCurrentUser?.peserta?.id)
  );

  useEffect(() => {
    if (dataIdCurrentUser && dataIdCurrentUser.default_password === true) {
      setShowPasswordChangeModal(true);
    }
  }, [dataIdCurrentUser]);

  const calculateTotalScore = () => {
    if (!dataIdCurrentUser || !dataIdCurrentUser?.penilaian) return 0;
    return dataIdCurrentUser?.penilaian.reduce(
      (total, nilai) => total + nilai.nilai,
      0
    );
  };

  const calculateAverageScore = () => {
    if (!dataIdCurrentUser || !dataIdCurrentUser?.penilaian) return 0;
    const totalScore = calculateTotalScore();
    const averageScore = totalScore / dataIdCurrentUser?.penilaian.length;
    return averageScore.toFixed(2);
  };

  const showReportContent = () => {
    return !(dataIdCurrentUser && dataIdCurrentUser.default_password === true);
  };

  console.log(dataIdCurrentUser);

  return (
    <>
      <Navbar id={dataIdCurrentUser?.id} />

      {showReportContent() ? (
        <>
          <h1 className="px-6 mt-5 text-5xl font-bold">Your Final Score</h1>
          <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 mt-6 px-6">
            <div className="flex-1">
              <div className="card w-190 bg-primary shadow-xl text-white p-4">
                <div className="card-body">
                  <h1 className="card-title text-5xl font-semibold">
                    {calculateTotalScore()}
                  </h1>
                  <p>
                    {`Your Overall Score is ${calculateTotalScore()} / ${
                      dataIdCurrentUser?.penilaian?.length * 10
                    }`}
                  </p>
                  <div className="card-actions justify-end"></div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="card w-190 bg-primary shadow-xl text-white p-4">
                <div className="card-body">
                  <h1 className="card-title text-5xl font-semibold">
                    {calculateAverageScore()}
                  </h1>
                  <p>Your Average Score</p>
                  <div className="card-actions justify-end"></div>
                </div>
              </div>
            </div>

            {dataIdCurrentUser?.hireBy && (
              <div className="flex-1">
                <div className="card w-190 bg-primary shadow-xl text-white p-4">
                  <div className="card-body">
                    <h1 className="card-title text-5xl font-semibold">Hired</h1>
                    <p>by {dataIdCurrentUser.hireBy}</p>
                    <div className="card-actions justify-end"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {dataIdCurrentUser && <BarChart chartData={dataIdCurrentUser.penilaian} />}
          {dataIdCurrentUser && (
            <div className="flex-1 px-6">
              <div className="card w-190 bg-primary shadow-xl text-white p-4 mt-6 mb-6">
                <div className="card-body">
                  <h1 className="card-title text-2xl">
                    A notes from your mentor
                  </h1>
                  <pre className="text-xl whitespace-pre-line font-normal font-sans">
                    {dataIdCurrentUser.notes || "No notes available"}
                  </pre>
                  <div className="card-actions justify-end"></div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="modal-box bg-warning">
          <h3 className="font-bold text-xl">Password Anda masih default!</h3>
          <p className="py-4">
            Silakan ganti password Anda terlebih dahulu untuk mengakses halaman
            ini.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <Link to="/profile">
                <button className="btn">Ganti Password</button>
              </Link>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Report;
