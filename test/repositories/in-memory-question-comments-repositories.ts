import { QuestionCommentsRepository } from "../../src/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "../../src/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = [];

  async findById(id: string) {
    const questionComment = this.items.find(
      (item) => id === item.id.toString()
    );

    if (!questionComment) {
      return null;
    }

    return questionComment;
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment);
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComment.id
    );

    this.items.splice(itemIndex, 1);
  }
}
