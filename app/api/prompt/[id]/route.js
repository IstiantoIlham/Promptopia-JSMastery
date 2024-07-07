//GET(read)
import {connectToDb} from "@utils/database";
import Prompt from "@models/prompt";

export async function GET(request, {params}) {
    try {
        await connectToDb();
        const prompts = await Prompt.findById(params.id).populate('creator');
        if (!prompts) return new Response("Prompt not found", {status: 404});
        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (err) {
        return new Response("failed to fetch all prompts", {status: 500});
    }
}

//PATCH(update)
export async function PATCH(request, {params}) {
    const {prompt, tag} = await request.json();
    try {
        await connectToDb();
        const existingPrompts = await Prompt.findById(params.id);
        if (!existingPrompts) return new Response("Prompt not found", {status: 404});

        existingPrompts.prompt = prompt;
        existingPrompts.tag = tag;

        await existingPrompts.save()

        return new Response(JSON.stringify(existingPrompts), {status: 200});
    } catch (e) {
        return new Response(e, {status: 500});

    }
}

//DELETE(delete)

export async function DELETE(request, {params}) {
    try {
        await connectToDb()
        await Prompt.findByIdAndDelete(params.id);
    } catch (e) {
        return new Response('Failed to delete a prompt', {status: 500});
    }
}