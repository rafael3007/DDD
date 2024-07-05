import { UseCaseError } from "../../../../core/errors/use-case-error";

export class ResourceNorFoundError extends Error implements UseCaseError {
  constructor() {
    super("Resource not found");
  }
}
