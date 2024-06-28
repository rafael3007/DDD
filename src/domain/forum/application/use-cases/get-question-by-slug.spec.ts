import { expect } from "vitest";
import { CreateQuestionUseCase } from "./create-question";

import { beforeEach, describe, it } from "vitest";

import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { Question } from "../../enterprise/entities/question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-questions-repository";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository);
  });

  it("should be able to get a question by slug", async () => {
    const newQuestion = Question.create({
      title: "Example question",
      slug: Slug.create("example-question"),
      authorId: new UniqueEntityID("1"),
      content: "Example content",
    });

    inMemoryQuestionRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: "example-question",
    });

    expect(question.id).toBeTruthy();
  });
});
