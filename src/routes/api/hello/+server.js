import { json } from "@sveltejs/kit";

export async function POST(event) {
    const body = await event.request.formData();

    return json({
        greeting: `Hello ${body.get('name')}!`
    });
}