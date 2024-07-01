import { QuestionRepository } from "../../src/domain/forum/application/repositories/questions-repository";
import { Question } from "../../src/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepository implements QuestionRepository {
  public items: Question[] = [];

  async findById(id: string) {
    const question = this.items.find((item) => id === item.id.toString());

    if (!question) {
      return null;
    }

    return question;
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => slug === item.slug.value);

    if (!question) {
      return null;
    }

    return question;
  }

  async create(question: Question) {
    this.items.push(question);
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id);

    this.items.splice(itemIndex, 1);
  }

  async save(question: Question){
    const itemIndex = this.items.findIndex((item) => item.id === question.id);
    
    this.items[itemIndex] = question

  }
}
