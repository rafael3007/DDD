import { QuestionRepository } from "../../src/domain/forum/application/repositories/questions-repository";
import { Question } from "../../src/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepository implements QuestionRepository {
  public items: Question[] = [];

  async create(question: Question) {
    this.items.push(question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => slug === item.slug.value);

    if (!question) {
      return null;
    }

    return question;
  }
}
