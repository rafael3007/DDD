import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comment-repository";
import { AnswerRepository } from "../repositories/answers-repository";

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment;
}

export class CommentOnAnswerUseCase {
  constructor(
    private AnswerRepository: AnswerRepository,
    private AnswerCommentsRepository: AnswerCommentsRepository
  ) {}
  async execute({
    authorId,
    content,
    answerId,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const Answer = await this.AnswerRepository.findById(answerId);

    if (!Answer) {
      throw new Error("Answer not found");
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content: content,
    });

    await this.AnswerCommentsRepository.create(answerComment);

    return { answerComment };
  }
}
