import {connectToDb} from "@utils/database";
import Prompt from "@models/prompt";

export async function GET() {
    try {
        await connectToDb();
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (err) {
        return new Response("failed to fetch all prompts", {status: 500});
    }
}