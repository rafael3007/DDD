import { QuestionCommentsRepository } from "../../src/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "../../src/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = [];

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment);
  }
}
