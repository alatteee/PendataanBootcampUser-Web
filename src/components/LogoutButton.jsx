import useStore from "@/store";
import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LuLogOut } from "react-icons/lu";

const LogoutButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const store = useStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Buka modal sebelum logout
    setModalOpen(true);
    // // Lakukan logout setelah modal dibuka
    // await store.setUserToken(null);
    // navigate("/login");
  };

  const handleConfirmLogout = async () => {
    try {
      await store.setUserToken(null);
      setModalOpen(false);

      // Tampilkan toast berhasil logout
      toast.success("Logout successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      console.log("Toast shown successfully");

      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      width: "300px",
      height: "200px",
      margin: "auto",
      borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="btn-xs btn-outline btn-error  mt-2 font-semibold "
      >
        <LuLogOut />
        Logout
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Logout Confirmation"
        appElement={document.getElementById("root")}
        style={modalStyles}
      >
        <h2 className="font-semibold mb-4 text-left">
          Are you sure you want to logout?
        </h2>
        <div className="">
          <button
            onClick={handleConfirmLogout}
            className="btn btn-outline btn-error mr-2"
          >
            Logout
          </button>
          <button onClick={handleCloseModal} className="btn">
            Close
          </button>
        </div>
      </Modal>

      {/* Letakkan ToastContainer di tingkat tertinggi aplikasi */}
      <ToastContainer />
    </>
  );
};

export default LogoutButton;
