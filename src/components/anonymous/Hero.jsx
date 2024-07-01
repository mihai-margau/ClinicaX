import { Link } from "react-router-dom";

import LogoClinica from "../../assets/images/logoClinica.png";
import FirstWave from "../../assets/images/first-wave.png";
import SecondWave from "../../assets/images/second-wave.png";
import ThirdWave from "../../assets/images/third-wave.png";
import { BsFillPinMapFill } from "react-icons/bs";
import { Button } from "../ui/button";
// import GradualSpacing from "@/components/magicui/gradual-spacing";

const Hero = () => {
  return (
    <>
      <div className="hero-large-home9 h-screen">
        <div className="absolute w-fit z-10 bottom-0 left-0 right-0 top-0 grid place-items-center mx-auto my-5">
          <div className="container">
            <div className="animate__animated animate__slideInDown my-5">
              <div className="grid grid-cols-1 place-items-center">
                <div className="w-fit d-flex logos">
                  <Link className="header-logo logo1" to="/">
                    <img
                      src={LogoClinica}
                      alt="ClinicaX"
                      className="img-fluid header-logo"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="mb20-md text-center">
                {/* <GradualSpacing
                  className="font-light text-center text-2xl md:text-5xl tracking-[-0.1em] text-slate-300 dark:text-white pb-3"
                  text="Porți deschise la Parcul Acvatic Pantelimon"
                /> */}
                <h5 className="font-thin tracking-wide text-white text-2xl md:text-5xl animate__animated animate__slideInRight animate__slow pb-3">
                  Asistență medicală pentru o viață mai sănătoasă
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-1 place-content-evenly sm:py-5">
                  {/* <a
                    href="/Regulament Porti deschise Parc Pantelimon.pdf"
                    target="_blank"
                    className=" mx-auto flex items-center justify-center min-w-48 animate__animated animate__fadeInLeft animate__slow my-2 rounded-full sm:min-w-48 bg-black/25 px-4 py-3 text-sm font-semibold text-[color:white] hover:text-[color:black] shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 "
                  >
                    <span>Vezi regulamentul</span>
                    <BsClipboardCheck className="mx-2" />
                  </a> */}
                  <a
                    href="https://www.google.com/maps/place/44%C2%B026'22.4%22N+26%C2%B011'39.5%22E/@44.4392934,26.1946799,18z/data=!4m4!3m3!8m2!3d44.43955!4d26.194291?entry=ttu"
                    target="_blank"
                    className="mx-auto flex items-center justify-center min-w-48 animate__animated animate__fadeInRight animate__slow my-2 rounded-full sm:min-w-48 bg-black/25 px-8 py-3 text-sm font-semibold text-[color:white] hover:text-[color:black] shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 "
                  >
                    <span className="">Vezi locatia ClinicaX</span>
                    <BsFillPinMapFill className="mx-2" />
                  </a>
                </div>
                <div className="container px-2 sm:py-10 font-thin">
                  <p className=" text-base sm:text-xl text-white animate__animated animate__fadeInLeft pb-3">
                    Medici de elită, tehnologie de înaltă performanță
                  </p>
                  {/* <p className="text-base sm:text-xl text-white animate__animated animate__fadeInLeft pb-3">
                    Perioada pentru școli și licee: 3-7 iunie interval orar
                    09:00 - 16:00 cu 45 de min/grup maxim 50 de elevi cu
                    însoțitori, cu pauză între 12:00-13:00
                  </p> */}
                </div>

                <Button
                  onClick={() => {
                    document.getElementById("formRezervare")?.scrollIntoView();
                  }}
                  className="duration-300 cursor-pointer mx-auto w-fit flex items-center justify-center min-w-48 animate__animated animate__fadeInRight animate__slow my-2 rounded-full sm:min-w-52 bg-[color:#ee4c34] px-5 py-6 text-sm font-semibold text-[color:white] hover:text-[color:black] shadow-sm  hover:bg-gray-50 "
                >
                  Fă o programare la ClinicaX
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="waveDiv animation-wave">
          <div className="wave-content-wrapper first-wave">
            <div
              className="wave-image first-image"
              style={{
                backgroundImage: `url(${FirstWave})`,
              }}
            ></div>
          </div>
          <div className="wave-content-wrapper second-wave">
            <div
              className="wave-image second-image"
              style={{
                backgroundImage: `url(${SecondWave}`,
              }}
            ></div>
          </div>
          <div className="wave-content-wrapper third-wave">
            <div
              className="wave-image third-image"
              style={{
                backgroundImage: `url(${ThirdWave})`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
