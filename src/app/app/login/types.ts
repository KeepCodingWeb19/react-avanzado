export type LoginState = {
  success: boolean;
  message: string;
  errors: Record<string, string[]>;
  values: {
    email: string;
  };
};

export const initialLoginState: LoginState = {
  success: false,
  message: "",
  errors: {},
  values: {
    email: "",
  },
};
