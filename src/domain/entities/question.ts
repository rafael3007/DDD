import { Slug } from "./value-objects/slug";
import { Entity } from "../core/entities/entity";
import { UniqueEntityID } from "../core/entities/unique-entity-id";
import { Optional } from "../core/entities/types/optional";

interface QuestionProps {
  title: string;
  content: string;
  authorId: UniqueEntityID;
  slug: Slug;
  bestAnswerId?: UniqueEntityID;
  createdAt: Date;
  updateAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  static create(
    props: Optional<QuestionProps, "createdAt">,
    id?: UniqueEntityID
  ) {
    const question = new Question(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    return question;
  }
}
