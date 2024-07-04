import { UniqueEntityID } from "../../src/domain/core/entities/unique-entity-id";
import { faker } from "@faker-js/faker";
import {
  AnswerComment,
  AnswerCommentProps,
} from "../../src/domain/forum/enterprise/entities/answer-comment";

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityID
) {
  const answerComment = AnswerComment.create(
    {
      answerId: new UniqueEntityID(),
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  );

  return answerComment;
}
