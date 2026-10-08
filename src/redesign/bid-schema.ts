export const scopeOptions = [
  "earthwork",
  "demolition",
  "utilities",
  "environmental",
] as const;
export const projectTypes = [
  "Commercial",
  "Infrastructure",
  "Residential development",
  "Industrial",
  "Other",
] as const;
export const bidSteps = [
  ["projectName", "projectType", "location", "scopes", "description"],
  ["bidDeadline", "schedule"],
  ["company", "contactName", "email", "phone"],
] as const;

export type BidDraft = {
  projectName: string;
  projectType: string;
  location: string;
  scopes: string[];
  description: string;
  bidDeadline: string;
  anticipatedStart: string;
  schedule: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  role: string;
  website: string;
};
export type BidErrors = Partial<Record<keyof BidDraft, string>>;
export const emptyBid: BidDraft = {
  projectName: "",
  projectType: "",
  location: "",
  scopes: [],
  description: "",
  bidDeadline: "",
  anticipatedStart: "",
  schedule: "",
  company: "",
  contactName: "",
  email: "",
  phone: "",
  role: "",
  website: "",
};
export function parseBid(value: unknown): BidDraft {
  const input =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  const result = { ...emptyBid };
  for (const key of Object.keys(emptyBid) as (keyof BidDraft)[]) {
    if (key === "scopes")
      result.scopes = Array.isArray(input.scopes)
        ? input.scopes.filter((s) => typeof s === "string").slice(0, 8)
        : [];
    else
      result[key] =
        typeof input[key] === "string"
          ? (input[key] as string).trim().slice(0, 5001)
          : "";
  }
  return result;
}

const validDate = (v: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(v) &&
  Number.isFinite(Date.parse(v)) &&
  new Date(v).toISOString().slice(0, 10) === v;
export function validateBid(bid: BidDraft): BidErrors {
  const errors: BidErrors = {};
  const required: (keyof BidDraft)[] = [
    "projectName",
    "projectType",
    "location",
    "description",
    "bidDeadline",
    "schedule",
    "company",
    "contactName",
    "email",
  ];
  const labels: Partial<Record<keyof BidDraft, string>> = {
    projectName: "a project name",
    projectType: "a project type",
    location: "the project location",
    description: "a brief description of the scope",
    bidDeadline: "the bid deadline",
    schedule: "the anticipated schedule",
    company: "your company",
    contactName: "your name",
    email: "your business email",
  };
  for (const key of required)
    if (!String(bid[key]).trim()) errors[key] = `Enter ${labels[key]}.`;
  if (
    bid.projectType &&
    !projectTypes.includes(bid.projectType as (typeof projectTypes)[number])
  )
    errors.projectType = "Choose a project type from the list.";
  if (
    !bid.scopes.length ||
    bid.scopes.some(
      (s) => !scopeOptions.includes(s as (typeof scopeOptions)[number]),
    )
  )
    errors.scopes = "Select at least one listed scope.";
  if (
    bid.description &&
    (bid.description.length < 15 || bid.description.length > 5000)
  )
    errors.description = "Use 15–5,000 characters to describe the work.";
  for (const key of [
    "projectName",
    "location",
    "company",
    "contactName",
    "role",
    "schedule",
  ] as const)
    if (bid[key].length > 200)
      errors[key] = "Keep this field under 200 characters.";
  if (
    bid.email &&
    (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(bid.email) ||
      bid.email.length > 254)
  )
    errors.email = "Enter a valid business email address.";
  if (
    bid.phone &&
    (bid.phone.replace(/\D/g, "").length < 10 ||
      bid.phone.replace(/\D/g, "").length > 15 ||
      /[^\d\s()+.\-]/.test(bid.phone))
  )
    errors.phone = "Enter a phone number with 10–15 digits.";
  if (bid.bidDeadline && !validDate(bid.bidDeadline))
    errors.bidDeadline = "Enter a valid bid deadline.";
  if (bid.anticipatedStart && !validDate(bid.anticipatedStart))
    errors.anticipatedStart = "Enter a valid anticipated start date.";
  if (
    bid.anticipatedStart &&
    bid.bidDeadline &&
    bid.anticipatedStart < bid.bidDeadline
  )
    errors.anticipatedStart =
      "The anticipated start should be on or after the bid deadline.";
  if (bid.website) errors.website = "This request could not be validated.";
  return errors;
}
