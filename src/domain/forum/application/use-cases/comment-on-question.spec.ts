import { expect, beforeEach, describe, it } from "vitest";
import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { InMemoryQuestionCommentRepository } from "../../../../../test/repositories/in-memory-question-comments-repositories";

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository;
let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: CommentOnQuestionUseCase;

describe("Comment on question", () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository
    );
  });

  it("should be able to comment on question", async () => {
    const question = makeQuestion();

    await inMemoryQuestionRepository.create(question);

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: "comentário teste",
    });

    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual(
      "comentário teste"
    );
  });

});
