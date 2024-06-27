import { Entity } from "../core/entities/entity";

interface InstructorProps {
  nome: string;
}

export class Instructor extends Entity<InstructorProps> {
}
