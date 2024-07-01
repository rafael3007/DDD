import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepository } from "../repositories/answers-repository";

interface FetchRecentAnswerUseCaseRequest {
  page: number;
  questionId: string;
}

interface FetchRecentAnswerUseCaseResponse {
  Answers: Answer[];
}

export class FetchRecentAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}
  async execute({
    page,
    questionId,
  }: FetchRecentAnswerUseCaseRequest): Promise<FetchRecentAnswerUseCaseResponse> {
    const Answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page }
    );

    return { Answers };
  }
}
