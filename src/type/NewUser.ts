import { DisplayUser } from "./user";

export type NewUser = Omit<DisplayUser, 'confirmPassword'>;