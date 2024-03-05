import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { PasswordInput } from "@/components/PasswordInput";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useStore from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { currenUserDataFn, currentUserFn, loginUserFn } from "@/api/Auth";
import { Button } from "@/components/Button";

import LoginBG from "@/assets/login-bg.png";
import WgsLogo from "@/assets/logo_wgs_fullBlack.svg";

export default function Login() {
  const loginSchema = zod.object({
    email: zod.string().email().min(1, "Email is required"),
    password: zod.string().min(1, "Password is required"),
  });
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.prevLocation || "/";
  // console.log("Navigating to:", from);
  // navigate(from);
  

  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });

  const store = useStore();

  const {
    data: dataCurrentUser,
    refetch: refetchCurentUser
  } = useQuery("currentUser", currentUserFn);

  const { refetch: refetchCurrentUserData } = 
  // useQuery("currentUser", currentUserFn);
  useQuery(["currentUserData", dataCurrentUser?.peserta?.id], () => currenUserDataFn(dataCurrentUser?.peserta?.id));

  const { mutate: loginUser } = useMutation(
    (userData) => loginUserFn(userData),
    {
      onMutate() {
        store.setRequestLoading(true);
      },
      onSuccess: async (res) => {
        // console.log("Response:", res.accessToken);
        console.log(store);
        // console.log('Response Data:', res.data);
        store.setAuthUser(res);
        store.setUserToken(res.accessToken);
        console.log("userToken after login:", store.userToken);
        store.setRequestLoading(false);
        toast.success("You successfully logged in");
        await refetchCurentUser()
        await refetchCurrentUserData()
        navigate("/");
      },
      onError: (error) => {
        store.setRequestLoading(false);
        let errorMessage = "Login failed";
        if (Array.isArray(error)) {
          errorMessage = error.map((el) => el.message).join(", ");
        } else if (error.message) {
          errorMessage = error.message;
        }
        toast.error(errorMessage);
      },
    }
  );

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (store.userToken) {
      navigate(from);
    }
  }, [store.userToken, navigate, from]);

  const onSubmitHandler = (user) => {
    loginUser(user);
  };

  return (
    <div className="flex h-screen h-full">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex items-center justify-center">
              <img className="h-24 w-60" src={WgsLogo} alt="Logo WGS" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Login
            </h2>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <FormProvider {...methods}>
                <form
                  className="space-y-6"
                  onSubmit={handleSubmit(onSubmitHandler)}
                >
                  <Input
                    id="email"
                    label="Email"
                    className="text-base font-normal py-2"
                  />
                  <PasswordInput
                    id="password"
                    label="Password"
                    className="text-base font-normal py-2"
                  />
                  <div>
                    <Button
                      className="w-full px-5 py-3 rounded-lg border border-blue-500 bg-primary text-white"
                      type="submit"
                      variant="solid"
                      color="blue"
                    >
                      Masuk
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full hidden w-0 flex-1 lg:block">
        {/* <img
					className='absolute inset-0 h-full w-full object-center'
					src={LoginBG}
					alt=''
				/> */}
        <div className="!h-screen carousel rounded-box">
          <div id="item1" className="carousel-item w-full">
            <img
              src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
              className="w-full"
              alt="Tailwind CSS Carousel component"
            />
          </div>
          <div id="item2" className="carousel-item w-full">
            <img
              src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
              className="w-full"
              alt="Tailwind CSS Carousel component"
            />
          </div>
          <div id="item3" className="carousel-item w-full">
            <img
              src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
              className="w-full"
              alt="Tailwind CSS Carousel component"
            />
          </div>
          <div id="item4" className="carousel-item w-full">
            <img
              src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
              className="w-full"
              alt="Tailwind CSS Carousel component"
            />
          </div>
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
          <a href="#item1" className="btn btn-xs">
            1
          </a>
          <a href="#item2" className="btn btn-xs">
            2
          </a>
          <a href="#item3" className="btn btn-xs">
            3
          </a>
          <a href="#item4" className="btn btn-xs">
            4
          </a>
        </div>
      </div>
    </div>
  );
}
