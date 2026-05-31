import { z } from 'zod';

export const createContactSchema2 = (lang) => {
  const ar = lang === "ar";
  return z.object({
    contactName: z.string().min(1, ar ? 'الاسم مطلوب' : 'Contact name is required'),
    contactPhone: z.string().min(1, ar ? 'رقم الهاتف مطلوب' : 'Contact phone is required'),
    contactMail: z.string().min(1, ar ? 'البريد الإلكتروني مطلوب' : 'Email is required').email(ar ? 'بريد إلكتروني غير صحيح' : 'Please enter a valid email'),
    isoStandard: z.array(z.string()).min(1, ar ? 'الرجاء اختيار معيار واحد على الأقل' : 'Please select at least one standard'),
  });
};