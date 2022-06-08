// Models
import { Doctor } from "../models/doctor.model";

export interface LoadDoctors {
  total: number;
  doctors: Doctor[];
}

export interface LoadDoctor {
  doctor: Doctor;
}
