import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentsRepository {
  create(Answer: AnswerComment): Promise<void>;
  findById(id: string): Promise<AnswerComment | null>;
  delete(question: AnswerComment): Promise<void>;
}
