export interface EvaluationModel extends Timestamped {
  id?: number;
  school_year?: string;
  semester?: number;
  status?: statusesEvaluation;
  peerTemplateId?: number;
  teamLeadTemplateId?: number;
  teamLeadTemplate?: TemplateModel
  peerTemplate?: TemplateModel
}
export interface CombinedPeerQuestionWithLegend {
  questions: QuestionModel[];
  legends: TemplateDetail[];
}

export interface QuestionModel {
  id?: number;
  question?: string;
  peerId?: number;
  peer?: PeerModel;
  teamLeadCriteriaId?: number;
  criteria?: TeamLeadCriteria;
}

export interface AssignPeerEvaluations {
  academicYearId: number;
  departmentId: number;
  peersToEvaluate: number;
}

export interface CommentsModel {
  id: number;
  description: string;
}

export interface PeerModel {
  id?: number;
  name?: string;
  academicYearId?: number;
  template?: string;
  templateHeaderId?: number;
  question?: QuestionModel[];
  percentage?: number;
}

export interface TeamLeadModel extends PeerModel {
  forTeamLead?: boolean;
}

export interface TeamLeadCriteria {
  id?: number;
  name: string;
  teamLeadEvaluationId?: number;
  question?: QuestionModel[];
}

export interface CriteriaColleague extends TeamLeadCriteria {
  employeesId?: number;
}

export interface SubmitResult {
  categoryId: number;
  questionId: number;
  templateDetailId: number;
  evaluationId?: number;
}

export interface HeaderStatus {
  academicYearId: number;
  evaluateeId: number;
  evaluatorId: number;
  description: string;
  departmentsId: number;
  type: string;
}

export interface SubmissionModel {
  evaluate: SubmitResult[];
  headerStatus: HeaderStatus;
}

export interface SubmissionPeerModel {
  result: SubmitResult[];
  comment: string;
}

export interface EmployeeRating {
  peerEvalId?: number;
  employeeId: number;
  name: string;
  departmentName:string;
  photo_path:string;
  comment: string; // Add comment
  evaluatedBy: string; // Add evaluatedBy
  rating: RatingModel[];
  summaryRating?: {
    rating: number;
    adjectiveRating: string;
  };
  categoryCounts: CategoryCountModel[]
}

export interface CategoryCountModel {
  Category: string; // Explicitly allow `Category` to be a string
  [key: string]: number | string;
}

export interface EvaluationResult {
  evaluator: string;
  [key: string]: string; // Dynamic fields for evaluate1, evaluate2, etc.
}

export interface RatingModel {
  categoryName: string;
  percentage: number;
  ratingPercentage: number | null;
  totalScore: number;
  totalPossibleScore: number;
  averageRating?: number;
}

export interface GetEvaluateQuestion {
  transformData: SubmitResult[]
  commentsDetail: {
    comment: string,
    evaluatedBy: string;
  }
}

export type statusesEvaluation = "NOT_SET" | "ONGOING" | "FINISHED";

export type Mode = "Peer" | "TeamLead"
