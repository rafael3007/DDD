import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface FetchQuestionCommentsRequest {
  page: number;
  questionId: string;
}

interface FetchQuestionCommentsResponse {
  questionComments: QuestionComment[];
}

export class FetchQuestionComments {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}
  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsResponse> {
    const questionComments = await this.questionCommentRepository.findManyByQuestionId(
      questionId,
      { page }
    );

    return { questionComments };
  }
}
