import { AnswerRepository } from "../../src/domain/forum/application/repositories/answers-repository";
import { Answer } from "../../src/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepository implements AnswerRepository {
  async findById(id: string) {
    const answer = this.items.find((item) => id === item.id.toString());

    if (!answer) {
      return null;
    }

    return answer;
  }

  public items: Answer[] = [];

  async create(answer: Answer) {
    this.items.push(answer);
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);

    this.items.splice(itemIndex, 1);
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);

    this.items[itemIndex] = answer;
  }
}
