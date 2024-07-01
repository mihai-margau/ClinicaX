import { useContext, useEffect, useState } from "react";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUser, LoginResponse, UserCred } from "../../types/types";
import Captcha from "../common/Captcha";
import AuthContext from "../../context/AuthProvider";

import authAPI from "../../api/authAPI";
import { Link, useNavigate } from "react-router-dom";

import BackgroundIllustration from "../common/BackgroundIllustration";
import LogoClinica from "../../assets/images/logoClinica.png";
import LoginSvg from "../../assets/images/login7.svg";
import Error from "../common/Error";
import { BsArrowLeft } from "react-icons/bs";
// import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
// import { cn } from "@/lib/utils";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [initialCaptcha, setInitialCaptcha] = useState("");
  const [message, setMessage] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    setInitialCaptcha(generateString(8));
  }, []);

  const loginSchema: ZodType<UserCred> = z.object({
    username: z
      .string({ required_error: "Completează utilizatorul" })
      .trim()
      .min(1, { message: "Completează utilizatorul" })
      .max(255, { message: "Lungimea maximă permisă este 255 caractere" }),
    password: z
      .string({ required_error: "Completează parola" })
      .min(1, { message: "Completează parola" }),
    captcha: z
      .string({ required_error: "Introdu caracterele de mai sus" })
      .refine((data) => data === initialCaptcha, {
        message: "Caracterele nu corespund",
      }),
  });
  const {
    register,
    handleSubmit,
    //setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserCred>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<UserCred> = async (data) => {
    setLoggingIn(true);
    try {
      const response: LoginResponse = await authAPI.login(data);
      if (response.status === 0) {
        setMessage(response.message);
        reset();
        setLoggingIn(false);
        setInitialCaptcha(generateString(8));
      } else {
        setMessage("");
        const user: IUser = authAPI.setAuth(response.message);
        setTimeout(() => {
          setAuth(user);
          setLoggingIn(false);
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      setMessage("A apărut o eroare. Incercați mai tărziu.");
      setInitialCaptcha(generateString(8));
      setLoggingIn(false);
      reset();
    }
  };

  const generateString = (length) => {
    let result = "";
    const characters = "abcd1234";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen place-content-center overflow-hidden">
        <div className=" align-middle justify-center px-4 py-8 sm:px-6 flex lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96 z-10">
            <div className="text-center">
              <img
                className="h-15 w-auto mx-auto -mt-10"
                src={LogoClinica}
                alt="ClinicaX"
                data-aos="fade-down"
                data-aos-duration="700"
              />
              <h2
                className="mt-8 text-xl font-medium leading-9 tracking-tight text-gray-900"
                data-aos="zoom-in"
                data-aos-duration="700"
              >
                Autentificare
              </h2>
              <p
                className="mt-2 text-sm leading-6 text-gray-500"
                data-aos="zoom-in"
              >
                Porți deschise la Parcul Acvatic Pantelimon
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div
                    // data-aos="fade-right"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                    data-aos-duration="700"
                  >
                    {/* <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Utilizator
                    </label> */}
                    <div className="mt-2">
                      <input
                        type="text"
                        autoComplete="new-username"
                        placeholder="Utilizator"
                        className="border-slate-300 border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...register("username")}
                      />
                    </div>
                    {errors.username && (
                      <div className="text-red mt-2">
                        {errors.username.message}
                      </div>
                    )}
                  </div>

                  <div
                    // data-aos="fade-left"
                    data-aos="zoom-in"
                    data-aos-delay="300"
                    data-aos-duration="700"
                  >
                    {/* <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Parola
                    </label> */}
                    <div className="mt-2">
                      <input
                        type="password"
                        autoComplete="new-password"
                        {...register("password")}
                        placeholder="Parolă"
                        className="border-slate-300 border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      />
                    </div>
                    {errors.password && (
                      <div className="text-red mt-2">
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                  <div
                    className="mt-2"
                    // data-aos="fade-right"
                    data-aos="zoom-in"
                    data-aos-delay="400"
                    data-aos-duration="700"
                  >
                    <Captcha
                      captcha={initialCaptcha}
                      textColor="#757876"
                      className="bg-gray-200 border-slate-300 border shadow-sm rounded-md text-slate-800"
                    />
                  </div>
                  <div
                    // data-aos="fade-left"
                    data-aos="zoom-in"
                    data-aos-delay="500"
                    data-aos-duration="700"
                  >
                    <div className="mt-2">
                      <input
                        type="text"
                        className="border-slate-300 border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        placeholder="Introdu caracterele de mai sus"
                        {...register("captcha")}
                      />
                    </div>
                    {errors.captcha && (
                      <div className="text-red mt-2">
                        {errors.captcha.message}
                      </div>
                    )}
                  </div>

                  <div
                    // data-aos="fade-right"
                    data-aos="zoom-in"
                    data-aos-delay="600"
                    data-aos-duration="700"
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {!loggingIn && "Intră în cont"}
                      {loggingIn && <>Autentificare...</>}
                    </button>
                    {message && <Error message={message} />}
                  </div>
                </form>
              </div>

              <div className="mt-4">
                <div
                  className="relative"
                  //   data-aos="fade-left"
                  data-aos="zoom-in"
                  data-aos-duration="700"
                  data-aos-delay="700"
                >
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="bg-white px-6 text-gray-500">sau</span>
                  </div>
                </div>

                <div
                  className="mt-4 grid grid-cols-1 gap-4"
                  //   data-aos="fade-right"
                  data-aos="zoom-in"
                  data-aos-duration="700"
                  data-aos-delay="800"
                >
                  <Link
                    to="/"
                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                  >
                    <BsArrowLeft />{" "}
                    <span className="text-sm font-semibold leading-6">
                      Înapoi la prima pagină
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-down"
          className="relative hidden md:flex align-middle justify-center "
        >
          {/* <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.5}
            duration={3}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-30%] h-[150%] skew-y-12"
            )}
          /> */}
          <BackgroundIllustration className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2  lg:ml-12  xl:ml-0" />
          <img
            data-aos="fade-up-left"
            // data-aos="zoom-in"
            data-aos-delay="500"
            data-aos-duration="1000"
            className="inset-0 w-8/12 z-10"
            src={LoginSvg}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
