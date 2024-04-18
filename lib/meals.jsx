import slugify from "slugify";
import xss from "xss";
import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: "eu-west-3",
});
import { db } from "@vercel/postgres";

export async function getMeals() {
  try {
    const data = await db.query("SELECT * FROM meals");
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the meals.");
  }
}

export async function getMeal(slug) {
  try {
    const data = await db.query("SELECT * FROM meals WHERE slug = $1", [slug]);
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the meal.");
  }
}

export async function saveMeal(meal) {
  try {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);
    const extension = meal.image.name.split(".").pop();
    const fileName = `${meal.slug}.${extension}`;

    const bufferedImage = await meal.image.arrayBuffer();
    s3.putObject({
      Bucket: "samehmohamed-nextjs-demo-users-image",
      Key: fileName,
      Body: Buffer.from(bufferedImage),
      ContentType: meal.image.type,
    });

    meal.image = fileName;

    await db.query(
      `
      INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
      [
        meal.title,
        meal.summary,
        meal.instructions,
        meal.creator,
        meal.creator_email,
        meal.image,
        meal.slug,
      ]
    );
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to save the meal.");
  }
}
