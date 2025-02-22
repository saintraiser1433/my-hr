import type { Timestamped } from ".";

export interface CourseModel extends Timestamped {
    course_id?: number;
    description?: string;
    score?: number; // Optional relationship
}