import { replaceMongoIdInArray } from "@/lib/convertData";
import { Category } from "@/modal/category-modal";

export async function getCategories() {
  const categories = await Category.find({}).lean();
  return replaceMongoIdInArray(categories);
}
