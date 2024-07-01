import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { AnswerRepository } from "../repositories/answers-repository";
import { QuestionRepository } from "../repositories/questions-repository";

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private answersRepository: AnswerRepository
  ) {}
  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toValue()
    );

    if (!question) {
      throw new Error("Question not found");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    question.bestAnswerId = answer.id;

    await this.questionRepository.save(question);

    return {
      question,
    };
  }
}
