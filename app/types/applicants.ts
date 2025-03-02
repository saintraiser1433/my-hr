import type { ApplicationStatus, Timestamped } from ".";

export interface ApplicantModel extends Timestamped {
  id: number;
  jobId: number;
  status: ApplicationStatus;
  // Relationships
  jobApply: JobModel;
  information: ApplicantInformationModel[];
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

  Applicant?: ApplicantModel;
  applicantId?: number;
}

export interface ApplicantTransformModel {
  id: number;
  job?: string;
  status?: string;
  applicant?: string;
  contact_number?: string;
  email?: string;
  applied_date?: Date;
  avatar?: string;
}
