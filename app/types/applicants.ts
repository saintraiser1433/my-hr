import type { ApplicationStatus, Timestamped } from ".";

export interface ApplicantModel extends Timestamped {
  id: number;
  jobId: number;
  status: ApplicationStatus;
  // Relationships
  jobApply: JobModel;
  information: ApplicantInformationModel;
  informationId: number;
}
export interface ApplicantInformationModel {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  resume_path: string;
  profile: string;
  gender?: string;
  age?: number;
  civil_status?: string;
  date_of_birth?: string;
  city_address?: string;
  provincial_address?: string;
  telephone_number?: number;
  religion?: string;
  citizenship?: string;
  fathers_name?: string;
  fathers_occupation?: string;
  mothers_name?: string;
  mothers_occupation?: string;
  parents_address?: string;
  person_to_be_contact?: string;

  elementary?: string;
  elementary_years_attended?: string;
  highschool?: string;
  highschool_years_attended?: string;
  college?: string;
  college_years_attended?: string;

  applicant?: ApplicantModel[]
}

export interface PendingApplicantModel {
  id: number,
  photo: string,
  jobId: number,
  jobTitle: string,
  status: string,
  applicantName: string,
  appliedDate: Date,
  resume: string,
  email: string,
  contactNumber: string

}

export interface RejectApplicantModel extends PendingApplicantModel {
  rejectedDate: Date
}




export interface OngoingApplicant extends PendingApplicantModel {
  countJobScreening: number,
  countApplicantScreening: number,
  progressList: Array<string>,

  remarks: string
}

export interface OngoingApplicantDetails extends PendingApplicantModel {
  countJobScreening?: number,
  countApplicantScreening?: number,
  progressList?: ScreeningProgressList[],
  currentStage: string | null,
  nextStep: string | null,
  nextSched: string | Date | null,
  remarks?: string
}

export interface PassedApplicant extends OngoingApplicant {
  passedDate: Date
}
export interface FailedApplicant extends OngoingApplicant {
  failedDate: Date
}



export interface ScreeningProgressList {
  id: number,
  screeningId: number,
  status: ApplicationStatus,
  dateInterview?: string | Date,
  screening: ScreeningModel
}





