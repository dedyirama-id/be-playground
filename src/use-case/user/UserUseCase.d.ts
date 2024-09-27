import type { UserUseCase } from '.';

declare global {
  interface UserUseCaseInterface extends UserUseCase {}
}
