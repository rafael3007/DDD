import { beforeEach, describe, expect, it } from "vitest";
import { FetchRecentAnswerUseCase } from "./fetch-recent-answers";
import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answersRepository";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { UniqueEntityID } from "../../../core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswerRepository;
let sut: FetchRecentAnswerUseCase;

describe("Fetch Recent answers", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository();
    sut = new FetchRecentAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to fetch recent answers", async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1"),
      })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1"),
      })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1"),
      })
    );

    const { Answers } = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(Answers).toHaveLength(3);
  });

  it("should be able to fetch paginated recent questions ", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID("question-1"),
        })
      );
    }

    const { Answers } = await sut.execute({
      page: 2,
      questionId: "question-1",
    });

    expect(Answers).toHaveLength(2);
  });
});
