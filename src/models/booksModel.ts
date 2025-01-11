import mongoose, { Schema, model } from "mongoose";

type BooksType = {
  title: string;
  slug: string;
  author: {
    name: string;
    bio?: string;
    nationality?: string;
  };
  publishedDate: Date;
  genres: string[];
  copiesAvailable: number;
  ratings: {
    average: number;
    reviews: number;
  };
  meta: {
    createdAt: Date;
    updatedAt: Date;
  };
};

const BookSchema: Schema = new Schema<BooksType>({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    unique: true,
  },
  slug: String,
  author: {
    name: {
      type: String,
      required: [true, "Author name is required"],
    },
    bio: {
      type: String,
      default: "",
    },
    nationality: {
      type: String,
      default: "",
    },
  },
  publishedDate: {
    type: Date,
    required: [true, "Published date is required"],
  },
  genres: {
    type: [String], // Array of strings
    required: [true, "At least one genre is required"],
  },
  copiesAvailable: {
    type: Number,
    required: [true, "Number of copies available is required"],
    min: [0, "Copies available cannot be negative"],
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be below 0"],
      max: [5, "Rating cannot exceed 5"],
    },
    reviews: {
      type: Number,
      default: 0,
    },
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
});

const Book = mongoose.model<BooksType>("Book", BookSchema);
export default Book;
