import { Either, left, right } from "../../../core/either";
import { AnswerCommentsRepository } from "../repositories/answer-comment-repository";

interface DeleteAnswerCommentUseCaseRequest {
  answerCommentId: string;
  authorId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<string, {}>;

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
      return left("Answer comment not found.");
    }

    if (authorId !== AnswerComment.authorId.toString()) {
      return left("Not allowed!");
    }

    await this.answerCommentRepository.delete(AnswerComment);

    return right({});
  }
}
