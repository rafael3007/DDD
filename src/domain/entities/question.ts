import { randomUUID } from "node:crypto";
import { Slug } from "./value-objects/slug";

interface QuestionProps {
  title: string;
  content: string;
  authorId: string;
  slug: Slug;
}

export class Question {

  public title: string;
  public content: string;
  public id: string;
  public authorId: string;
  public slug: Slug;

  constructor({ title, content, authorId, slug }: QuestionProps, id?: string) {
    this.title = title;
    this.content = content;
    this.id = id ?? randomUUID();
    this.authorId = authorId;
    this.slug = slug
  }
}
