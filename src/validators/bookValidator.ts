import z from "zod";

// export const BookSchema = z.object({
//   title: z.string().min(3, "Title must be at least 3 characters "),
//   slug: z.string().optional(),
//   author: z.object({
//     name: z.string().min(3, "Author name required "),
//     bio: z.string().optional(),
//     nationality: z.string().optional(),
//   }),
//   publishedDate: z.preprocess(
//     (arg) =>
//       typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg,
//     z.date({ required_error: "Published date is required" })
//   ),
//   genres: z.array(z.string()).min(1, "At least one genre is required"),
//   copiesAvailable: z
//     .number()
//     .int()
//     .min(0, "copies available cannot be negative "),
//   rating: z.object({
//     average: z.number().min(0).max(5).default(0),
//     reviews: z.number().default(0),
//   }),

//   meta: z.object({
//     createdAt: z.date().default(() => new Date()),
//     updatedAt: z.date().default(() => new Date()),
//   }),
// });

// // Auto-generate a TypeScript type from the Schema
// export type BookType = z.infer<typeof BookSchema>;

const tagArray = z
  .array(z.string())
  .min(2, "must have at least 2 items.")
  .max(2, "can have at most 10 items.");
