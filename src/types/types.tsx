export type IUser = {
  userID: string;
  username?: string;
  role?: string;
  initials?: string;
  fullName?: string;
  expiresIn?: number;
};

export type GenericResponse = {
  status: string;
  message: string;
};

export type UserCred = {
  username: string;
  password: string;
  captcha: string;
};

export type LoginResponse = {
  status: number;
  message: string;
};

export type UserProfile = {
  id: string;
  nume: string;
  prenume: string;
  denumire: string;
};

export type Programare = {
  nume: string;
  prenume: string;
  email: string;
  telefon: string;
  numarPersoane: number;
  dataProgramare: string;
  ora: string;
  minut: string;
  intervalOrar: string;
  gdpr: boolean;
  regulament: boolean;
  captcha: string;
};

export type ProgramareTableRow = {
  programare: string;
  nume: string;
  contact: string;
  detalii: string;
  nrPersoane: string;
};

export type Interval = {
  id: string;
  index: number;
  mesaj: string;
  ora: string;
  minut: string;
  intervalOrar: string;
};

export type DatePickerValue = {
  startDate: string | null;
  endDate: string | null;
};

export type ErrorProps = {
  message: string;
};

export type SuccessProps = {
  message: string;
};

export type StatisticaZi = {
  ora: string;
  minut: string;
  nrPersoane: number;
};

export type Statistica = {
  zi: string;
  ore: StatisticaZi[];
};
