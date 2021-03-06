import { State } from "./state";
import { Diagnosis, ExtendedPatient, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_INDIVIDUAL_PATIENT";
      payload: ExtendedPatient;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    };

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const addIndividualPatient = (patient: ExtendedPatient): Action => {
  return {
    type: "ADD_INDIVIDUAL_PATIENT",
    payload: patient,
  };
};

export const setDiagnosesList = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnoses,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_INDIVIDUAL_PATIENT":
      return {
        ...state,
        extendedPatients: {
          ...state.extendedPatients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: action.payload,
      };
    default:
      return state;
  }
};
