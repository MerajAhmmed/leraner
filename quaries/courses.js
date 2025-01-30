import { Category } from "@/modal/category-modal";
import { Course } from "@/modal/course-modal";
import { Module } from "@/modal/module-modal";
import { Testimonial } from "@/modal/testimonial-modal";
import { User } from "@/modal/user-modal";

import { replaceMongoIdInArray } from "@/lib/convertData";

export async function getCourseList() {
  const courses = await Course.find({})
    .select([
      "title",
      "subtitle",
      "thumbnail",
      "modules",
      "price",
      "category",
      "instructor",
    ])
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .lean();
  return replaceMongoIdInArray(courses);
}
