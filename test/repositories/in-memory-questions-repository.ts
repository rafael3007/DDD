import { QuestionRepository } from "../../src/domain/forum/application/repositories/questions-repository";
import { Question } from "../../src/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepository implements QuestionRepository {
  public items: Question[] = [];

  async create(question: Question) {
    this.items.push(question);
  }
}
