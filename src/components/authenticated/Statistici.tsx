import { Statistica } from "@/types/types";
import { useEffect, useState } from "react";
import stackSchedulerAPI from "../../api/stackSchedulerAPI";
import LoadingStatistici from "./LoadingStatistici";
import { AnimatePresence, motion } from "framer-motion";

export default function Statistici() {
  const [statistici, setStatistici] = useState<Statistica[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const loadStatistici = async () => {
      try {
        const statistici: Statistica[] = await stackSchedulerAPI.statistici();
        setTimeout(() => {
          setStatistici(statistici);
          setLoading(false);
        }, 1000);
      } catch (e) {
        setLoading(false);
      }
    };
    loadStatistici();
  }, []);
  return (
    <div className="contentShiftTransition md:h-[350px] mb-8">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            className="h-full"
            key={0}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 1 },
              // transition: { ease: "linear", duration: 0.5 },
            }}
            exit={{
              opacity: 0,

              // transition: { ease: "linear", duration: 0.2 },
            }}

            // transition={{ duration: 0.5 }}
          >
            <LoadingStatistici key={0} />
          </motion.div>
        )}
        {!loading && (
          <motion.div
            key={1}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 1 },
              // transition: { times: [0, 0.5, 1], ease: "linear", duration: 0.5 },
            }}
            exit={{
              opacity: 0,
              y: "20px",
              transition: { ease: "linear", duration: 0.5 },
            }}
            // transition={{ duration: 1 }}
            // transition={{ duration: 0.5 }}
          >
            <div className="pb-8">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                  <div
                    role="list"
                    className="flex flex-wrap gap-x-6 gap-y-8  xl:gap-x-8 align-middle justify-evenly flex-wrap: wrap"
                  >
                    {statistici.map((statistica) => (
                      <div
                        key={statistica.zi}
                        className="overflow-hidden rounded-xl border border-gray-200"
                      >
                        <div className="flex min-w-72 items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-4 justify-between">
                          <div className="">
                            <svg
                              version="1.1"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 128 128"
                              enableBackground="new 0 0 128 128"
                              fill="#000000"
                              className="w-10 h-10"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path
                                      fill="#546E7A"
                                      d="M108,8h-8V4c0-2.211-1.789-4-4-4s-4,1.789-4,4v4h-8V4c0-2.211-1.789-4-4-4s-4,1.789-4,4v4h-8V4 c0-2.211-1.789-4-4-4s-4,1.789-4,4v4h-8V4c0-2.211-1.789-4-4-4s-4,1.789-4,4v4h-8V4c0-2.211-1.789-4-4-4s-4,1.789-4,4v4h-8 C11.164,8,4,15.164,4,24v88c0,8.836,7.164,16,16,16h88c8.836,0,16-7.164,16-16V24C124,15.164,116.836,8,108,8z M116,112 c0,4.414-3.59,8-8,8H20c-4.412,0-8-3.586-8-8V24c0-4.416,3.588-8,8-8h8v4c0,2.211,1.789,4,4,4s4-1.789,4-4v-4h8v4 c0,2.211,1.789,4,4,4s4-1.789,4-4v-4h8v4c0,2.211,1.789,4,4,4s4-1.789,4-4v-4h8v4c0,2.211,1.789,4,4,4s4-1.789,4-4v-4h8v4 c0,2.211,1.789,4,4,4s4-1.789,4-4v-4h8c4.41,0,8,3.584,8,8V112z"
                                    ></path>{" "}
                                  </g>{" "}
                                </g>{" "}
                                <path
                                  fill="#B0BEC5"
                                  d="M20,40v72h88V40H20z M84,48v8h-8v-8H84z M52,72h-8v-8h8V72z M60,64h8v8h-8V64z M52,80v8h-8v-8H52z M60,80h8 v8h-8V80z M76,80h8v8h-8V80z M76,72v-8h8v8H76z M68,48v8h-8v-8H68z M52,48v8h-8v-8H52z M28,48h8v8h-8V48z M28,64h8v8h-8V64z M28,80 h8v8h-8V80z M28,104v-8h8v8H28z M44,104v-8h8v8H44z M60,104v-8h8v8H60z M76,104v-8h8v8H76z M100,104h-8v-8h8V104z M100,88h-8v-8h8 V88z M100,72h-8v-8h8V72z M100,56h-8v-8h8V56z"
                                ></path>{" "}
                              </g>
                            </svg>
                          </div>
                          {/* <CalendarDaysIcon className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" /> */}
                          <div className="text-sm font-medium leading-6 text-gray-900">
                            {statistica.zi}
                          </div>
                        </div>
                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                          {statistica.ore.map((o) => (
                            <div
                              key={o.ora}
                              className="flex justify-between gap-x-4 py-3"
                            >
                              <dt className="text-gray-500">
                                Ora {o.ora}:{o.minut}
                              </dt>
                              <dd className="flex items-start gap-x-2">
                                <div
                                  className={
                                    o.nrPersoane > 0
                                      ? "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20"
                                      : "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-red-700 bg-red-50 ring-red-600/10"
                                  }
                                >
                                  {o.nrPersoane} persoane
                                </div>
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence></AnimatePresence>
    </div>
  );
}
