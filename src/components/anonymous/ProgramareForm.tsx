import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import {
  DatePickerValue,
  GenericResponse,
  Interval,
  Programare,
} from "../../types/types";
import Datepicker from "react-tailwindcss-datepicker";
import moment from "moment";
import "moment/locale/ro";
import FormSvg from "../../assets/images/form.svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { ScheduleIcon, TodayIcon } from "@mui/icons-material";
import Captcha from "../common/Captcha";
import stackSchedulerAPI from "../../api/stackSchedulerAPI";
import Success from "../common/Success";
import Error from "../common/Error";

moment.locale("ro");

const ProgramareForm = () => {
  // const getCurrentDay = () => {
  //   let date = moment();
  //   return {
  //     startDate: date.format("YYYY-MM-DD"),
  //     endDate: date.format("YYYY-MM-DD"),
  //   };
  // };
  const delay = async (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };
  const generateString = (length) => {
    let result = "";
    const characters = "abcdefg123456";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const [nume, setNume] = useState<string>("");
  const [prenume, setPrenume] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefon, setTelefon] = useState<string>("");
  const [dataProgramare, setDataProgramare] = useState<DatePickerValue>({
    startDate: null,
    endDate: null,
  });
  const [intervale, setIntervale] = useState<Interval[]>([]);
  const [isLoadingIntervale, setIsLoadingIntervale] = useState<boolean>(false);
  const [intervalSelectat, setIntervalSelectat] = useState<string>("");
  const [isIntervalDisabled, setIsIntervalDisabled] = useState<boolean>(true);
  const [intervalMessage, setIntervalMessage] = useState<string>("");
  const [nrPersoane, setNrPersoane] = useState<string>("1");
  const [captcha, setCaptcha] = useState<string>(generateString(8));
  const [captchaIntrodusa, setCaptchaIntrodusa] = useState<string>("");
  const [gdpr, setGdpr] = useState<boolean>(false);
  const [regulament, setRegulament] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    async function intervale() {
      if (dataProgramare.startDate !== null) {
        setIsLoadingIntervale(true);
        await delay(500);
        const intervale: Interval[] = await stackSchedulerAPI.intervale(
          dataProgramare.startDate
        );
        if (intervale.length > 0) {
          if (intervale[0].index === 0) {
            setIntervalMessage(intervale[0].mesaj);
            setIsIntervalDisabled(true);
            setIntervale([]);
          } else {
            setIntervale(intervale);
            setIsIntervalDisabled(false);
          }
        }
        setIntervalSelectat("");
        setIsLoadingIntervale(false);
      } else {
        setIntervale([]);
        setIntervalMessage("");
        setIsIntervalDisabled(true);
        setIntervalSelectat("");
        setIsLoadingIntervale(false);
      }
    }
    intervale();
  }, [dataProgramare]);

  //   const generateGUID = () => {
  //     return Date.now().toString(36) + Math.random().toString(36).substring(2);
  //   };

  //   const resetState = async () => {};
  // console.log(getCurrentDay());
  // console.log(dataRezervare);
  const resetState = () => {
    setNume("");
    setPrenume("");
    setEmail("");
    setTelefon("");
    setNrPersoane("1");
    setDataProgramare({
      startDate: null,
      endDate: null,
    });
    setIntervale([]);
    setIntervalSelectat("");
    setIntervalMessage("");
    setIsLoadingIntervale(false);
    setIsIntervalDisabled(true);
    setCaptcha(generateString(8));
    setIsSubmitting(false);
    setCaptchaIntrodusa("");
    setGdpr(false);
    setRegulament(false);
  };
  const programare = async () => {
    try {
      if (captchaIntrodusa !== captcha) {
        setError("Caracterele introduse nu corespund cu cele afișate");
        return;
      }
      setIsSubmitting(true);
      const interval = intervale.filter((i) => i.id === intervalSelectat);
      const programare: Programare = {
        nume,
        prenume,
        email,
        telefon,
        numarPersoane: parseInt(nrPersoane),
        dataProgramare: dataProgramare.startDate
          ? dataProgramare.startDate
          : "",
        ora: interval[0].ora,
        minut: interval[0].minut,
        gdpr,
        regulament,
        intervalOrar: "",
        captcha: captchaIntrodusa,
      };
      const response: GenericResponse = await stackSchedulerAPI.programare(
        programare
      );
      if (response.status === "1") {
        setSuccess(response.message);
        setError("");
        resetState();
      } else {
        setError(response.message);
        setSuccess("");
      }
      setIsSubmitting(false);
    } catch (err) {
      setSuccess("");
      setError("A apărut o eroare. Încearca mai tarziu.");
      setIsSubmitting(false);
    }
  };
  const spinner = (
    <div className="flex justify-center pt-3 align-middle">
      <svg
        className="animate-spin text-gray-300"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
      >
        <path
          d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-900"
        ></path>
      </svg>
      <span className="mx-2 text-xs text-slate-500">
        Se incarca intervalele disponibile
      </span>
    </div>
  );
  return (
    <section className=" bg-white" id="formRezervare">
      <div className="relative" data-aos="fade">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">
            Vrei o programare în ClinicaX? Completează formularul de mai jos
          </span>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
        <div className="space-y-10 divide-y divide-gray-900/10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="">
              <div
                className="rounded-xl border border-gray-200 p-8"
                data-aos="fade-right"
                data-aos-delay="250"
              >
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 43"
                  enableBackground="new 0 0 50 43"
                  fill="#000000"
                  className="h-12 w-12"
                >
                  <g id="pinpoint_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g id="Layer_2">
                      {" "}
                      <path
                        fill="none"
                        stroke="#ee4c34"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.844,35.034 c-2.212,0.75-3.594,1.801-3.594,2.966c0,2.278,5.261,4.125,11.75,4.125S36.75,40.278,36.75,38c0-1.202-1.474-2.28-3.811-3.034"
                      ></path>{" "}
                    </g>{" "}
                    <g id="Layer_1">
                      {" "}
                      <path
                        fill="none"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M39.5,15.5C39.5,7.492,33.008,1,25,1 S10.5,7.492,10.5,15.5c0,8.009,10.106,22.408,14.5,22.408C29.063,37.908,39.5,23.509,39.5,15.5z"
                      ></path>{" "}
                      <circle
                        fill="none"
                        stroke="#ee4c34"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        cx="25"
                        cy="17.901"
                        r="5.932"
                      ></circle>{" "}
                    </g>{" "}
                  </g>
                </svg>
                <h3 className="mt-6 font-semibold text-gray-900">Adresă</h3>
                <p className="mt-2 text-sm text-gray-700 ">
                  Strada Panseluțelor 3, Bucureşti, Sector 3, România
                </p>
              </div>
              {/* <p
                className="text-sm font-semibold leading-7 text-gray-900"
                data-aos="fade-down"
              >
                Șoseaua Gării Cătelu , nr 1 M - Vis à vis de Antilopa, lângă
                gura de metrou Pantelimon
              </p> */}

              <div className="mt-10 hidden p-10 text-center sm:block">
                <img src={FormSvg} data-aos="flip-right" />
              </div>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="sm:col-span-6">
                <p
                  className="mt-3 text-sm leading-6 text-gray-600"
                  data-aos="fade-right"
                >
                  Câmpurile marcate cu * sunt obligatorii.
                </p>
              </div>
              <div className="sm:col-span-3" data-aos="fade-right">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="nume">
                    Nume<span className="mx-1 text-slate-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="nume"
                    value={nume}
                    onChange={(e) => setNume(e.target.value)}
                    placeholder=""
                    autoComplete="fnume"
                    className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-3" data-aos="fade-left">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="nume">
                    Prenume<span className="mx-1 text-slate-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="prenume"
                    value={prenume}
                    onChange={(e) => setPrenume(e.target.value)}
                    placeholder=""
                    autoComplete="fprenume"
                    className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
              </div>
              <div
                className="sm:col-span-3"
                data-aos="fade-right"
                data-aos-delay="300"
              >
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="nume">
                    Adresa de email
                    <span className="mx-1 text-slate-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=""
                    autoComplete="femail"
                    className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
              </div>
              <div
                className="sm:col-span-3"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="nume">
                    Telefon<span className="mx-1 text-slate-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="telefon"
                    value={telefon}
                    onChange={(e) => setTelefon(e.target.value)}
                    placeholder=""
                    autoComplete="ftelefon"
                    className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
              </div>
              <div
                className="sm:col-span-3"
                data-aos="fade-right"
                data-aos-delay="350"
              >
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="nume">
                    Specializare
                    <span className="mx-1 text-slate-500">*</span>
                  </Label>
                  <Input
                    type="number"
                    max="4"
                    min="1"
                    id="nrpersoane"
                    placeholder=""
                    value={nrPersoane}
                    onChange={(e) => {
                      if (parseInt(e.target.value) > 4) setNrPersoane("4");
                      else if (parseInt(e.target.value) < 1) setNrPersoane("1");
                      else setNrPersoane(e.target.value);
                    }}
                    autoComplete="fnrpersoane"
                    className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
              </div>
              <div
                className="sm:col-span-3"
                data-aos="fade-left"
                data-aos-delay="350"
              ></div>
              <div
                className="sm:col-span-3"
                data-aos="fade-right"
                data-aos-delay="400"
              >
                <label
                  htmlFor="dataRezervarii"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Data programării<span className="mx-1 text-slate-500">*</span>
                </label>
                <div className="mt-2">
                  <Datepicker
                    i18n={"ro"}
                    displayFormat={"DD.MM.YYYY"}
                    // disabledDates={[
                    //   {
                    //     startDate: "1900-01-01",
                    //     endDate: "2024-05-31",
                    //   },
                    //   {
                    //     startDate: "2024-06-04",
                    //     endDate: "2050-01-1",
                    //   },
                    // ]}
                    value={dataProgramare}
                    onChange={(e) => setDataProgramare(e as DatePickerValue)}
                    popoverDirection="up"
                    useRange={false}
                    placeholder=" "
                    asSingle={true}
                    inputClassName="border relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-base placeholder-gray-400 bg-white disabled:opacity-40 disabled:cursor-not-allowed  h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 md:text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                {isLoadingIntervale && spinner}
              </div>
              <div
                className="sm:col-span-3"
                data-aos="fade-right"
                data-aos-delay="400"
              >
                <label
                  htmlFor="intervalOrar"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Interval orar<span className="mx-1 text-slate-500">*</span>
                </label>
                <div className="mt-2">
                  <Select
                    disabled={isIntervalDisabled}
                    value={intervalSelectat}
                    onValueChange={(e) => setIntervalSelectat(e)}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Selecteaza un interval orar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Intervale orare</SelectLabel>
                        {intervale.map((i: Interval) => {
                          return (
                            <SelectItem key={i.id} value={i.id}>
                              {i.intervalOrar}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {intervalMessage !== "" && (
                <div className="sm:col-span-6">
                  <Error message={intervalMessage} />
                </div>
              )}
              <div
                className="sm:col-span-6"
                data-aos="fade-left"
                data-aos-delay="500"
              >
                <Captcha
                  captcha={captcha}
                  // textColor="white"
                  // className="bg-[color:#ee4c34] p-2"
                  textColor="#757876"
                  className="bg-gray-200 border-slate-300 border shadow-sm rounded-md text-slate-800"
                />
              </div>
              <div
                className="sm:col-span-6"
                data-aos="fade-right"
                data-aos-delay="500"
              >
                <div className="grid w-full  items-center gap-1.5">
                  <label
                    htmlFor="captchaIntrodusa"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Introdu caracterele de mai sus
                    <span className="mx-1 text-slate-500">*</span>
                  </label>
                  <Input
                    type="text"
                    id="captchaIntrodusa"
                    placeholder=""
                    value={captchaIntrodusa}
                    onChange={(e) => setCaptchaIntrodusa(e.target.value)}
                    autoComplete="fcaptchaintrodusa"
                    className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
              </div>

              <div
                className="sm:col-span-6"
                data-aos="fade-right"
                data-aos-delay="600"
              >
                <div className="items-top flex space-x-2">
                  <Checkbox
                    id="bifaGdpr"
                    checked={gdpr}
                    onCheckedChange={(e) => {
                      setGdpr(e as boolean);
                    }}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="bifaGdpr"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Sunt de acord cu prelucrarea datelor conform GDPR
                      <span className="mx-1 text-slate-500">*</span>
                    </label>
                    {/* <a
                      href="https://www.primarie3.ro/index.php/informatii_publice/diverse/gdpr"
                      className="link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="text-sm text-indigo-600">
                        Vezi politica GDPR
                      </span>
                    </a> */}
                  </div>
                </div>
              </div>
              {/* <div
                className="sm:col-span-6"
                data-aos="fade-right"
                data-aos-delay="600"
              >
                <div className="items-top flex space-x-2">
                  <Checkbox
                    id="bifaRegulament"
                    checked={regulament}
                    onCheckedChange={(e) => setRegulament(e as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="bifaRegulament"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Am luat la cunostință regulamentul
                      <span className="mx-1 text-slate-500">*</span>
                    </label>
                    <a
                      href="/Regulament Porti deschise Parc Pantelimon.pdf"
                      className="link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="text-sm text-indigo-600">
                        Vezi regulamentul
                      </span>
                    </a>
                  </div>
                </div>
              </div> */}
              <div
                className="sm:col-span-6"
                data-aos="fade-right"
                data-aos-delay="700"
              >
                <Button
                  onClick={programare}
                  disabled={
                    isIntervalDisabled ||
                    intervalSelectat === "" ||
                    isSubmitting
                  }
                  className="w-full bg-indigo-600"
                >
                  {!isSubmitting && "Programează-te"}
                  {isSubmitting && "Se înregistrează programarea..."}
                </Button>
                {success && <Success message={success} />}
                {error && <Error message={error} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramareForm;
