import { Entity } from "../core/entities/entity";
import { Optional } from "../core/entities/types/optional";
import { UniqueEntityID } from "../core/entities/unique-entity-id";

interface AnswerProps {
  content: string;
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
  createdAt: Date;
  updateAt?: Date;
}
export class Answer extends Entity<AnswerProps> {
  static create(
    props: Optional<AnswerProps, "createdAt">,
    id?: UniqueEntityID
  ) {
    const answer = new Answer(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    return answer;
  }
  get content() {
    return this.props.content;
  }
}
