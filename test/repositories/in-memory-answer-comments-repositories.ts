import { AnswerCommentsRepository } from "../../src/domain/forum/application/repositories/answer-comment-repository";
import { AnswerComment } from "../../src/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = [];

  async create(AnswerComment: AnswerComment) {
    this.items.push(AnswerComment);
  }
}
