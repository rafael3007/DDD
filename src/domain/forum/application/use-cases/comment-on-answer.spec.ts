import { expect, beforeEach, describe, it } from "vitest";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { InMemoryAnswerCommentRepository } from "../../../../../test/repositories/in-memory-answer-comments-repositories";
import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answersRepository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: CommentOnAnswerUseCase;

describe("Comment on Answer", () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentRepository
    );
  });

  it("should be able to comment on Answer", async () => {
    const Answer = makeAnswer();

    await inMemoryAnswerRepository.create(Answer);

    await sut.execute({
      answerId: Answer.id.toString(),
      authorId: Answer.authorId.toString(),
      content: "comentário teste",
    });

    expect(inMemoryAnswerCommentRepository.items[0].content).toEqual(
      "comentário teste"
    );
  });
});
