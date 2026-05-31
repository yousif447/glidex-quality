import { z } from 'zod';

export const createContactSchema = (lang = "en") => {
  const ar = lang === "ar";
  
  return z.object({
    fullName: z.string().min(1, ar ? "الاسم بالكامل مطلوب!" : "Full Name is required!"),
    email: z.string().email(ar ? "بريد إلكتروني غير صحيح!" : "Invalid Email!"),
    mobile: z.string()
      .min(1, ar ? "رقم الموبايل مطلوب!" : "Mobile Number is required!")
      .regex(/^\+\d+$/, ar ? "يجب أن يبدأ الرقم بـ '+' متبوعاً بكود الدولة" : "Must start with '+' followed by country code"),
    certificate_number: z.string().optional(),
    message: z.string().optional()
  });
};