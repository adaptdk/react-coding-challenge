import { lazy } from "react";
import { v4 as uuidv4 } from "uuid";

const SelectBook = lazy(() => import("../books/select/SelectBook.jsx"));
const Book = lazy(() => import("../books/edit/EditBook.jsx"));

export const routes = [
  { path: "/", component: SelectBook, key: uuidv4() },
  { path: "/:id", component: SelectBook, key: uuidv4() },
];
