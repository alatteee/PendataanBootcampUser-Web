import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useRef } from "react";
import { currentUserDataFn, editUserFn } from "@/api/User";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { currenUserDataFn } from "@/api/Auth";
import Navbar from "@/components/Navbar";

const EditProfile = () => {
  const location = useLocation();
  const { userId } = location.state;

  const fileInputRef = useRef(null);

  const [imageUser, setImageUser] = useState();

  const {
    register,
    handleSubmit: submitEditUser,
    formState: { errors },
    reset: resetEditUser,
    setValue,
  } = useForm({
    defaultValues: {
      nama_peserta: "",
      jenis_kelamin: "",
      nomor_handphone: "",
      email: "",
      tanggal_lahir: "",
      alamat_rumah: "",
      link_github: "",
      image: "",
    },
  });

  const {
    data: dataIdCurrentUser,
    refetch: refetchCurrentUserData,
    isLoading: loadingUser,
    isError,
  } = useQuery(["dataIdCurrentUser", userId], () => currenUserDataFn(userId));

  useEffect(() => {
    if (!loadingUser && dataIdCurrentUser) {
      resetEditUser({
        nama_peserta: dataIdCurrentUser.nama_peserta,
        jenis_kelamin: dataIdCurrentUser.jenis_kelamin,
        nomor_handphone: dataIdCurrentUser.nomor_handphone,
        email: dataIdCurrentUser.email,
        tanggal_lahir: dataIdCurrentUser.tanggal_lahir,
        alamat_rumah: dataIdCurrentUser.alamat_rumah,
        link_github: dataIdCurrentUser.link_github,
        image: dataIdCurrentUser.image,
      });

      setValue("image", dataIdCurrentUser.image);
    }
  }, [loadingUser, dataIdCurrentUser, resetEditUser]);

  const handleUpdateUser = useMutation({
    mutationFn: (data) => editUserFn(userId, data),

    onSuccess: (res) => {
      refetchCurrentUserData();
      resetEditUser();
      alertSave();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateUser = (data) => {
    const userData = new FormData();

    userData.append("nama_peserta", data.nama_peserta);
    userData.append("jenis_kelamin", data.jenis_kelamin);
    userData.append("tanggal_lahir", data.tanggal_lahir);
    userData.append("email", data.email);
    userData.append("nomor_handphone", data.nomor_handphone);
    userData.append("alamat_rumah", data.alamat_rumah);
    userData.append("link_github", data.link_github);
    if (imageUser) {
      userData.append("image", imageUser);
    }

    handleUpdateUser.mutateAsync(userData);
  };

  const alertSave = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your profile has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleFileInputChange = (event) => {
    setValue("image", event.target.files[0]);
    setImageUser(event.target.files[0]);

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      document.getElementById("user-image").src = imageUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleCameraButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <Navbar id={dataIdCurrentUser?.peserta?.id} />
      <h1 className="font-bold text-5xl mt-7 ml-5">Edit Your Profile</h1>

      <FormProvider {...useForm}>
        <div className="card card-side bg-base-100 shadow-xl mt-6 ml-9 mr-9 mb-9">
          <div className="image-container h-fit relative px-4 py-9">
            <figure className="w-fit h-fit">
              <img
                id="user-image"
                src={`${import.meta.env?.VITE_IMAGE_HOST?.replace(/\/$/, "")}/${
                  dataIdCurrentUser?.url
                }`}
                alt="User"
                style={{ width: "300px", height: "350px" }}
                className="ml-6"
              />
            </figure>
            {/* <img
              id="user-image"
              src={`${import.meta.env?.VITE_IMAGE_HOST?.replace(/\/$/, "")}/${
                dataIdCurrentUser?.url
              }`}
              alt="User"
              className="w-64 h-auto ml-5"
            /> */}
            <div className="flex flex-col items-center absolute -bottom-3 left-3">
              <button
                className=" flex justify-center items-center bg-primary ml-4 shadow-xl rounded-3xl h-10 w-10 text-white mt-2"
                onClick={handleCameraButtonClick}
              >
                <FaCamera />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileInputChange}
              />
            </div>
            {/* <button
              className="add-image-button bg-primary ml-4 shadow-xl rounded-3xl h-10 w-10 text-white mt-2"
              onClick={handleCameraButtonClick}
            >
              <FaCamera />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileInputChange}
            /> */}
          </div>

          <div className="card-body px-4 py-6">
            <div>
              <label
                htmlFor="nama_peserta"
                className="font-semibold block mb-1"
              >
                Nama :
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs rounded mb-4"
                {...register("nama_peserta")}
              />
            </div>

            <div>
              <label
                htmlFor="jenis_kelamin"
                className="font-semibold block mb-1"
              >
                Jenis Kelamin :
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs rounded mb-4"
                {...register("jenis_kelamin")}
              />
            </div>

            <div>
              <label
                htmlFor="tanggal_lahir"
                className="font-semibold block mb-1"
              >
                Tanggal Lahir :
              </label>
              <input
                type="text"
                placeholder="yyyy-mm-dd"
                className="input input-bordered w-full max-w-xs rounded mb-4"
                {...register("tanggal_lahir")}
              />
            </div>

            <div>
              <label htmlFor="email" className="font-semibold block mb-1">
                Email :
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs rounded mb-4"
                {...register("email")}
              />
            </div>

            <div>
              <label
                htmlFor="nomor_handphone"
                className="font-semibold block mb-1"
              >
                Phone Number :
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs rounded mb-4"
                {...register("nomor_handphone")}
              />
            </div>

            <div>
              <label
                htmlFor="alamat_rumah"
                className="font-semibold block mb-1"
              >
                Address :
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs rounded mb-4"
                {...register("alamat_rumah")}
              />
            </div>

            <div>
              <label htmlFor="link_github" className="font-semibold block mb-1">
                Github :
              </label>
              <input
                type="text"
                placeholder="drop your link here"
                className="input input-bordered w-full max-w-xs rounded mb-4"
                {...register("link_github")}
              />
            </div>

            <div className="flex justify-start mt-4">
              <button
                className="btn btn-primary bg-primary text-white shadow-xl rounded-3xl mr-4"
                onClick={submitEditUser(updateUser)}
              >
                Save Changes
              </button>
              <Link to="/profile">
                <button className="btn btn-primary bg-primary text-white shadow-xl rounded-3xl">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default EditProfile;
