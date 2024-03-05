import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { currenUserDataFn, currentUserFn } from "@/api/Auth";
import { useMutation, useQuery } from "react-query";
import { submitCvFn } from "@/api/Cv";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";

const TabContent1 = ({ id }) => {
  const {
    register,
    handleSubmit: handleSubmitUpdateCv,
    formState: { errors },
    reset: resetEditCv,
    setValue,
  } = useForm({
    defaultValues: {
      cv: "",
    },
  });

  const {
    data: dataIdCurrentUser,
    refetch: refetchCurrentUserData,
    isLoading: loadingParticipant,
    isError,
    // isLoading,
  } = useQuery(["currentUserData", id], () => currenUserDataFn(id));

  console.log("currentUserData", dataIdCurrentUser);

  useEffect(() => {
    if (!loadingParticipant && dataIdCurrentUser) {
      resetEditCv({
        cv: dataIdCurrentUser.cv,
      });
    }
  }, [loadingParticipant, dataIdCurrentUser, resetEditCv]);

  const handleUpdateCv = useMutation({
    mutationFn: (data) => submitCvFn(id, data),
    onMutate() {},
    onSuccess: (res) => {
      console.log(res);
      refetchCurrentUserData();
      resetEditCv();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Data Has Been Saved',
      }
      );
    },
    onError: (error) => {
      console.log(error);
      let errorMessage

      if (error.response && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      } else {
        errorMessage = error.response.data.error
      }

      Toast.fire({
        icon: 'error',
        title: 'Ooops',
        text: errorMessage,
      }
      );
    },
  });

  const updateCv = (data) => {
    const dataCv = new FormData();
    console.log("data", dataCv);

    dataCv.append("cv", data.cv);

    handleUpdateCv.mutateAsync(dataCv);
  };

  // const showAlert = () => {
  //   Swal.fire({
  //     title: "Are You sure want to save the changes?",
  //     showDenyButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: "Save",
  //     denyButtonText: `Don't save`,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire("Saved!", "", "success");
  //     } else if (result.isDenied) {
  //       Swal.fire("Changes are not saved", "", "info");
  //     }
  //   });
  // };

  console.log("id", id);

  return (
    <div>
      {/* {isError && <div>Error fetching data</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : ( */}
      <div className="card lg:card-side bg-base-100 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <figure className=" ">
          <img
            src={`${import.meta.env?.VITE_IMAGE_HOST?.replace(/\/$/, "")}/${
              dataIdCurrentUser?.url
            }`}
            alt="foto peserta"
            style={{ width: "300px", height: "auto" }}
          />
        </figure>
        <div className="card-body">
          <h4 className="font-semibold">Name :</h4>
          <p>{dataIdCurrentUser?.nama_peserta}</p>
          <h4 className="font-semibold">Jenis Kelamin :</h4>
          <p>{dataIdCurrentUser?.jenis_kelamin}</p>
          <h4 className="font-semibold">Tanggal Lahir :</h4>
          <p>{dataIdCurrentUser?.tanggal_lahir}</p>
          <h3 className="font-semibold">Email :</h3>
          <p>{dataIdCurrentUser?.email}</p>
          <h4 className="font-semibold">Phone Number :</h4>
          <p>{dataIdCurrentUser?.nomor_handphone}</p>
          <h4 className="font-semibold">Address :</h4>
          <p className="max-w-[300px] overflow-hidden overflow-ellipsis">{dataIdCurrentUser?.alamat_rumah}</p>
          <h4 className="font-semibold">Github :</h4>
          <p className="max-w-[300px] overflow-hidden overflow-ellipsis">{dataIdCurrentUser?.link_github}</p>
          <h4 className="font-semibold">Drop your cv link here</h4>

          <FormProvider {...useForm()}>
            <form
              onSubmit={handleSubmitUpdateCv(updateCv)}
            >
              <div className="justify-start">
                <label htmlFor="cv"></label>
                <input
                  {...register("cv", { required: true })}
                  type="text"
                  placeholder="link cv anda"
                  className="input input-bordered w-full max-w-xs rounded mb-4"
                />
              </div>
              <div className="card-actions justify-start mt-4">
                <button
                  type="submit"
                  className="btn bg-primary text-white shadow-xl rounded-3xl"
                >
                  Save
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
      {/* )} */}
      <div className="card-actions justify-start mt-4">
        <Link
          to="/edit-profile"
          state={{
            userId: id,
          }}
        >
          <button className="btn bg-primary text-white shadow-xl rounded-3xl">
            Edit Profile <FaEdit className="mr-2" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TabContent1;
