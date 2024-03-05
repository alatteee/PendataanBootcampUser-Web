import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
import { submitEditPassword } from "@/api/Password";
import { currenUserDataFn } from "@/api/Auth";
import { HiEye, HiEyeOff } from "react-icons/hi";

const TabContent2 = ({ id }) => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePassword1 = () => setShowPassword1((prev) => !prev);
  const togglePassword2 = () => setShowPassword2((prev) => !prev);

  const { refetch: refetchCurrentUserData } = useQuery(
    ["currentUserData", id],
    () => currenUserDataFn(id)
  );

  const methods = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = methods;

  const handleUpdatePassword = useMutation({
    mutationFn: (data) => submitEditPassword(id, data),
    onSuccess: async (res) => {
      console.log(res);
      methods.reset();
      // Menampilkan Sweet Alert dengan ikon setelah password berhasil disimpan
      await Swal.fire("Saved!", "", "success");
      await refetchCurrentUserData();
    },
    onError: (error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to reset password. Please try again.",
      });
    },
  });

  const updateUserPassword = (data) => {
    Swal.fire({
      title: "Are you sure want to reset this password?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: "Saving...",
          didOpen: () => {
            // Handle saving logic here
            handleUpdatePassword.mutate(data);
          },
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const toggleCurrentPassword = () => setShowPassword1((prev) => !prev);
  const toggleNewPassword = () => setShowPassword2((prev) => !prev);

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <div>
        <h1 className="font-semibold text-lg">Change Your Password</h1>
        <p className="text-sm">
          Your new password may be different from previously used password
        </p>
      </div>
      <div className="mt-6">
        <div className=" p-4 sm:p-6 md:p-8 lg:p-10 rounded-md shadow-2xl">
          <FormProvider {...methods}>
            <div>
              <h4 className="font-semibold text-base">Current Password</h4>
              <label className="text-xs text-gray-500">
                Must be at your current password
              </label>
              <div className="relative">
                <input
                  id="currentPassword"
                  type={showPassword1 ? "text" : "password"}
                  placeholder="Enter your current password"
                  className={`py-2 px-4 w-full rounded border ${
                    errors.currentPassword && "border-red-500"
                  }`}
                  {...register("currentPassword", {
                    required: true,
                    minLength: {
                      value: 8,
                      message: "Current password must contain min 8 characters!",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={toggleCurrentPassword}
                  className="absolute top-1/2 -translate-y-1/2 right-3"
                >
                  {showPassword1 ? (
                    <HiEyeOff className="text-xl text-gray-500 hover:text-gray-600" />
                  ) : (
                    <HiEye className="text-xl text-gray-500 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <span className="text-red-500 text-xs">
                  {errors.currentPassword.message}
                </span>
              )}
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-base">New Password</h4>
              <label className="text-xs text-gray-500">
                Must be at least 8 characters
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showPassword2 ? "text" : "password"}
                  placeholder="Input your new password"
                  className={`py-2 px-4 w-full rounded border ${
                    errors.newPassword && "border-red-500"
                  }`}
                  {...register("newPassword", {
                    required: true,
                    minLength: {
                      value: 8,
                      message: "A new password must contain min 8 characters!",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={togglePassword2}
                  className="absolute top-1/2 -translate-y-1/2 right-3"
                >
                  {showPassword2 ? (
                    <HiEyeOff className="text-xl text-gray-500 hover:text-gray-600" />
                  ) : (
                    <HiEye className="text-xl text-gray-500 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <span className="text-red-500 text-xs">
                  {errors.newPassword.message}
                </span>
              )}
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-base">Confirm New Password</h4>
              <label className="text-xs text-gray-500">
                Must be at least 8 characters and match with new password
              </label>
              <div className="relative">
                <input
                  id="confPassword"
                  type={showPassword2 ? "text" : "password"}
                  placeholder="Confirm your new password"
                  className={`py-2 px-4 w-full rounded border ${
                    errors.confPassword && "border-red-500"
                  }`}
                  {...register("confPassword", {
                    required: true,
                    minLength: {
                      value: 8,
                      message:
                        "Confirm password must contain min 8 characters!",
                    },
                    validate: {
                      matchesPreviousPassword: (value) => {
                        const { newPassword } = getValues();
                        return (
                          newPassword === value || "Passwords should match!"
                        );
                      },
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={togglePassword2}
                  className="absolute top-1/2 -translate-y-1/2 right-3"
                >
                  {showPassword2 ? (
                    <HiEyeOff className="text-xl text-gray-500 hover:text-gray-600" />
                  ) : (
                    <HiEye className="text-xl text-gray-500 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confPassword && (
                <span className="text-red-500 text-xs">
                  {errors.confPassword.message}
                </span>
              )}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmit(updateUserPassword)}
                className="py-2 px-6 bg-primary text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Change Password
              </button>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default TabContent2;
