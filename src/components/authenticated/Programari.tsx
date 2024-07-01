import { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  //   GridRenderCellParams,
  GridToolbar,
  //   GridValueFormatterParams,
} from "@mui/x-data-grid";
import { roRO } from "@mui/x-data-grid/locales";
import { DatePickerValue, ProgramareTableRow } from "../../types/types";

import stackSchedulerAPI from "../../api/stackSchedulerAPI";
import { Button } from "../ui/button";
import Datepicker from "react-tailwindcss-datepicker";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import LoadingProgramari from "./LoadingProgramari";
import EmptyProgramari from "./EmptyProgramari";
import { createTheme, ThemeProvider } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import moment from "moment";

const columns: GridColDef[] = [
  {
    field: "programare",
    headerName: "Nr./Dată Programare",
    minWidth: 150,
    flex: 1,
    headerClassName: "tableHeader",
    sortable: false,
  },
  {
    field: "nume",
    headerName: "Nume",
    minWidth: 170,
    flex: 1,
    headerClassName: "tableHeader",
  },
  {
    field: "contact",
    headerName: "Contact",
    minWidth: 170,
    flex: 1,
    headerClassName: "tableHeader",
  },
  {
    field: "detalii",
    headerName: "Dată vizită",
    minWidth: 170,
    flex: 1,
    headerClassName: "tableHeader",
    sortable: false,
  },
  {
    field: "nrPersoane",
    headerName: "Număr persoane",
    minWidth: 100,
    flex: 1,
    headerClassName: "tableHeader",
  },
];

const Programari = () => {
  const [programari, setProgramari] = useState<ProgramareTableRow[]>([]);
  const [loading, setLoading] = useState(true);
  // const [firstDelay, setFirstDelay] = useState(1);
  const [data, setData] = useState<DatePickerValue>({
    startDate: null,
    endDate: null,
  });
  useEffect(() => {
    const loadProgramari = async () => {
      try {
        const programari: ProgramareTableRow[] =
          await stackSchedulerAPI.getProgramari(data.startDate);
        setTimeout(() => {
          setProgramari(programari);
          setLoading(false);
          // setFirstDelay(0);
        }, 2000);
      } catch (e) {
        setLoading(false);
      }
    };
    loadProgramari();
  }, []);

  const loadProgramari = async () => {
    try {
      setLoading(true);
      const programari: ProgramareTableRow[] =
        await stackSchedulerAPI.getProgramari(data.startDate);
      setTimeout(() => {
        setProgramari(programari);
        setLoading(false);
      }, 2000);
    } catch (e) {
      console.log(e);
      setLoading(true);
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: "Inter var",
    },
  });

  return (
    <>
      <motion.div
        key={0}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 1 },
        }}
        exit={{
          opacity: 0,

          transition: { ease: "linear", duration: 0.5 },
        }}
        // transition={{ duration: 1 }}
      >
        <div
          className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2 mx-auto"
          // data-aos="fade-down"
          // data-aos-delay="200"
          // data-aos-duration="700"
        >
          <div className="sm:col-span-3">
            <Datepicker
              // density="compact"
              i18n={"ro"}
              displayFormat={"DD.MM.YYYY"}
              disabledDates={[
                {
                  startDate: "1900-01-01",
                  endDate: "2024-05-31",
                },
                {
                  startDate: "2024-06-03",
                  endDate: "2050-01-1",
                },
              ]}
              value={data}
              onChange={(e) => setData(e as DatePickerValue)}
              popoverDirection="up"
              useRange={false}
              placeholder="Selectează data"
              asSingle={true}
              inputClassName="border min-w-[300px] relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-base placeholder-gray-400 bg-white disabled:opacity-40 disabled:cursor-not-allowed  h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 md:text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="sm:col-span-3">
            <Button
              onClick={loadProgramari}
              className="flex w-full items-center justify-center gap-3 rounded-md  bg-indigo-600 hover:bg-indigo-900 transition duration-300"
            >
              Încarcă programările
              <MagnifyingGlassIcon className="h-5" />
            </Button>
          </div>
        </div>
      </motion.div>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key={1}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 1 },
              // transition: { ease: "linear", duration: 0.5, delay: firstDelay },
            }}
            exit={{
              opacity: 0,
            }}
            // transition={{ duration: 1 }}
            // transition={{ duration: 0.5 }}
          >
            <div
              // data-aos="fade-down"
              //   data-aos-duration="700"
              // data-aos-delay={firstDelay}
              className="mt-8 block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <LoadingProgramari
              // data-aos="fade-in"
              //   data-aos-duration="700"
              // data-aos-delay={firstDelay}
              />
            </div>
          </motion.div>
        )}

        {programari.length < 1 && !loading && (
          <motion.div
            key={2}
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
            // transition={{ duration: 1 }}
            // transition={{ duration: 0.5 }}
          >
            <div
              // data-aos="fade-in"
              //   data-aos-duration="700"

              className="mt-8 block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <EmptyProgramari
              // data-aos="fade-in"
              //   data-aos-duration="1200"
              //   data-aos-delay="400"
              />
            </div>
          </motion.div>
        )}
        {programari.length > 0 && !loading && (
          <motion.div
            key={3}
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
            // transition={{ duration: 1 }}
            // transition={{ duration: 0.5 }}
          >
            <div
              className="mt-8 flow-root"
              // data-aos="fade-in"
              //   data-aos-duration="700"
              //   data-aos-delay="800"
            >
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle">
                  <div style={{ height: "calc(100vh - 300px)", width: "100%" }}>
                    <ThemeProvider theme={theme}>
                      <DataGrid
                        getRowClassName={(params) =>
                          params.indexRelativeToCurrentPage % 2 === 0
                            ? "even"
                            : "odd"
                        }
                        localeText={
                          roRO.components.MuiDataGrid.defaultProps.localeText
                        }
                        rows={programari}
                        columns={columns}
                        pageSizeOptions={[25, 50, 100]}
                        initialState={{
                          pagination: {
                            paginationModel: { pageSize: 25, page: 0 },
                          },
                        }}
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                          toolbar: {
                            showQuickFilter: true,
                            printOptions: { disableToolbarButton: true },
                          },
                        }}
                        disableColumnSelector
                        //   density="comfortable"
                        disableDensitySelector
                      ></DataGrid>
                    </ThemeProvider>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Programari;
