export interface userCreateType  {
  email: string;
  password: string;
  name: string;
  profession?: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
  projeto: {
    id: number;
  };
};
