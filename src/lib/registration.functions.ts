import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { registrationConfigs, type RegistrationCategory } from "./registration-config";

// NOTE: submissions are validated but not stored yet. Storage is intentionally
// disabled until the project's backend is enabled.
const baseSchema = z.object({
  category: z.enum(["startup", "mentor", "investor", "business"]),
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().regex(/^[+\d][\d\s()-]{7,19}$/),
  consent: z.literal("on"),
});

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((data) => {
    if (!(data instanceof FormData)) throw new Error("Invalid registration form.");
    return data;
  })
  .handler(async ({ data }) => {
    const category = String(data.get("category") ?? "") as RegistrationCategory;
    const parsed = baseSchema.safeParse({
      category,
      fullName: String(data.get("fullName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      consent: String(data.get("consent") ?? ""),
    });
    if (!parsed.success) throw new Error("Please check all required contact details and consent.");

    const config = registrationConfigs[parsed.data.category];
    for (const section of config.sections) {
      for (const field of section.fields) {
        if (field.type === "file" || ["fullName", "email", "phone"].includes(field.name)) continue;
        const values = data
          .getAll(field.name)
          .map(String)
          .map((value) => value.trim())
          .filter(Boolean);
        if (field.required && values.length === 0) throw new Error(`Please complete ${field.label}.`);
        if (values.some((value) => value.length > (field.maxLength ?? 2000)))
          throw new Error(`${field.label} is too long.`);
      }
    }

    const document = data.get("document");
    if (document instanceof File && document.size > 0) {
      const allowed = [
        "application/pdf",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const maxSize = parsed.data.category === "mentor" ? 5_000_000 : 10_000_000;
      if (!allowed.includes(document.type) || document.size > maxSize)
        throw new Error("Please upload an allowed document within the stated size limit.");
    }

    const applicationCode = `RIL-${new Date().getUTCFullYear().toString().slice(-2)}-${crypto
      .randomUUID()
      .replaceAll("-", "")
      .slice(0, 8)
      .toUpperCase()}`;

    return { ok: true, duplicate: false, applicationCode };
  });
