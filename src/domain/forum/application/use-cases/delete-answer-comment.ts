import { Either, left, right } from "../../../core/either";
import { AnswerCommentsRepository } from "../repositories/answer-comment-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNorFoundError } from "./errors/resource-not-found-error";

interface DeleteAnswerCommentUseCaseRequest {
  answerCommentId: string;
  authorId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNorFoundError | NotAllowedError,
  {}
>;

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const AnswerComment = await this.answerCommentRepository.findById(
      answerCommentId
    );

    if (!AnswerComment) {
      return left(new ResourceNorFoundError());
    }

    if (authorId !== AnswerComment.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.answerCommentRepository.delete(AnswerComment);

    return right({});
  }
}
