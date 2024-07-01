import { UniqueEntityID } from "../../src/domain/core/entities/unique-entity-id";
import {
  Question,
  QuestionProps,
} from "../../src/domain/forum/enterprise/entities/question";
import { Slug } from "../../src/domain/forum/enterprise/entities/value-objects/slug";
import { faker } from "@faker-js/faker";

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      slug: Slug.create("test-question"),
      content: faker.lorem.text(),
      ...override,
    },
    id
  );

  return question;
}
