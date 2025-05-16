import z from "zod";

export const envSchema = z.object({
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  NODE_ENV: z.string().optional(),
  API_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;
const parsed = envSchema.safeParse(process.env);

if (typeof window === "undefined" && !parsed.success) {
  parsed.error.errors.forEach((err) => {
    console.error(err);
  });
  throw new Error("Erro na validação das variáveis de ambiente. Veja o log acima.");
}

interface PickerParams {
  development: any;
  production: any;
  test?: any;
}

export const ENV = {
  API_URL: process.env.API_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  picker: (params: PickerParams) => {
    const key = ENV.NODE_ENV || "development";
    return params[key as keyof typeof params] || params.development;
  },
} as Env & { picker: (params: PickerParams) => any };

export default ENV;