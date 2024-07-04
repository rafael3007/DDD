import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentsRepository {
  create(Answer: AnswerComment): Promise<void>;
  create(question: AnswerComment): Promise<void>;
  delete(question: AnswerComment): Promise<void>;
}
