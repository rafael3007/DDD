import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comment-repository";

interface FetchAnswerCommentsRequest {
  page: number;
  answerId: string;
}

interface FetchAnswerCommentsResponse {
  answerComments: AnswerComment[];
}

export class FetchAnswerComments {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}
  async execute({
    page,
    answerId,
  }: FetchAnswerCommentsRequest): Promise<FetchAnswerCommentsResponse> {
    const answerComments =
      await this.answerCommentRepository.findManyByAnswerId(answerId, { page });

    return { answerComments };
  }
}
