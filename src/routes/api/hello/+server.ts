import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST = (async (event: any) => {
  const body = await event.request.formData();

  const name = body.get("name");

  if (!name) {
    throw error(400, "You need to enter a name!");
  }

  if (name.toString().length < 3) {
    throw error(400, "Name must be at least 3 characters long!");
  }

  return json({
    greeting: `Hello ${name.toString()}!`,
  });
}) satisfies RequestHandler;
