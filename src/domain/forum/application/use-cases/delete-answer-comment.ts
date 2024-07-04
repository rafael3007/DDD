import { AnswerCommentsRepository } from "../repositories/answer-comment-repository";
import { AnswerRepository } from "../repositories/answers-repository";

interface DeleteAnswerCommentUseCaseRequest {
  answerCommentId: string;
  authorId: string;
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentRepository: AnswerCommentsRepository
  ) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const AnswerComment = await this.answerCommentRepository.findById(
      answerCommentId
    );

    if (!AnswerComment) {
      throw new Error("AnswerComment not found.");
    }

    if (authorId !== AnswerComment.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    await this.answerCommentRepository.delete(AnswerComment);

    return {};
  }
}
