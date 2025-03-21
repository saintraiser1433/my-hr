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
  academicYearId: number;
  categoryId: number;
  questionId: number;
  employeesId?: number;
  templateDetailId: number;
  peerEvalId?: number;
}

export interface HeaderStatus {
  academicYearId: number;
  employeesId: number;
  commenterId: number;
  description: string;
  type: string;
}

export interface SubmissionModel {
  evaluate: SubmitResult[];
  headerStatus: HeaderStatus;
}

export interface EmployeeRating {
  employeeId: number;
  name: string;
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
