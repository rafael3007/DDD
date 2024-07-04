import { AnswerCommentsRepository } from "../../src/domain/forum/application/repositories/answer-comment-repository";
import { AnswerComment } from "../../src/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = [];

  async create(AnswerComment: AnswerComment) {
    this.items.push(AnswerComment);
  }

  async findById(id: string) {
    const answerComment = this.items.find(
      (item) => id === item.id.toString()
    );

    if (!answerComment) {
      return null;
    }

    return answerComment;
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComment.id
    );

    this.items.splice(itemIndex, 1);
  }
}
