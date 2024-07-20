export interface TypeQueryResult {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
}

export interface TypeDocumentType {
  iddocumenttype?: number;
  documenttypename: string;
}

export interface TypePerson {
  documentnumber: string;
  personname: string;
  personlastname: string;
  iddocumenttype: number;
  address?: string;
  phonenumber?: string;
  birthdate?: Date | string;
  idparent?: string;
  username?: string;
  userpass?: string;
}

export interface TypeWorkshop {
  idworkshop?: number;
  workshopname: string;
  workdescription?: string;
  idinstructor: string;
  costfirst: number;
  costsecond: number;
  costthird: number;
  workshopschedule: string;
  startsin: Date | string;
  endsin: Date | string;
  capacity: string;
  state: string;
}

export interface TypeInscription {
  idinscription?: number;
  idworkshop: number;
  idstudent: number;
  inscripciondate: Date;
  cost: number;
  state: string;
  isrequiredfirstdoc?: string;
  namefirstdoc: string;
  filefirstdoc: string;
  isrequiredseconddoc: string;
  nameseconddoc: string;
  fileseconddoc: string;
  isrequiredthirddoc: string;
  namethirddoc: string;
  filethirddoc: string;
  person?: TypePerson;
}

export interface TypePayments {
  idpayment?: number;
  idinscription: number;
  payment: number;
  filepaymentlocation?: string;
  state: string;
}

export interface HttpResult {
  success: boolean;
  data?: any; //TypeDocumentType | TypeDocumentType[]
  message?: string;
}
export interface HttpAuthResult {
  success: boolean;
  token: string;
  message?: string;
  user: User;
}

interface User {
  documentnumber: string;
  name: string;
  lastname: string;
}
