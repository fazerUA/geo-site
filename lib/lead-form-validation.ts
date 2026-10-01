export const LEAD_FORM_FIELD_NAMES = [
  "name",
  "email",
  "site",
  "budget",
  "goal",
  "timeline",
  "details",
] as const;

export type LeadFormFieldName = (typeof LEAD_FORM_FIELD_NAMES)[number];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getInvalidLeadFormFields(form: HTMLFormElement): LeadFormFieldName[] {
  const invalid: LeadFormFieldName[] = [];

  for (const name of LEAD_FORM_FIELD_NAMES) {
    const field = form.elements.namedItem(name);

    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) {
      invalid.push(name);
      continue;
    }

    const value = field.value.trim();

    if (!value) {
      invalid.push(name);
      continue;
    }

    if (name === "email" && !EMAIL_PATTERN.test(value)) {
      invalid.push(name);
    }
  }

  return invalid;
}
