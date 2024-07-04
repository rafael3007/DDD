import { PaginationParams } from "../../../core/repositories/pagination-params";
import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentsRepository {
  findById(id: string): Promise<QuestionComment | null>;
  create(question: QuestionComment): Promise<void>;
  delete(question: QuestionComment): Promise<void>;
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams
  ): Promise<QuestionComment[]>;
}
