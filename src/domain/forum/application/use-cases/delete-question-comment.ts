import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { QuestionRepository } from "../repositories/questions-repository";

interface DeleteQuestionCommentUseCaseRequest {
  questionCommentId: string;
  authorId: string;
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentRepository: QuestionCommentsRepository
  ) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentRepository.findById(
      questionCommentId
    );

    if (!questionComment) {
      throw new Error("QuestionComment not found.");
    }

    if (authorId !== questionComment.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    await this.questionCommentRepository.delete(questionComment);

    return {};
  }
}
