export const error = (ctx, err) => {
    console.error(err);
    ctx.response.status = 400;
    ctx.response.body = { "message": err };
}

export const getReq = async (ctx, type) => {
    ctx.assert(ctx.request.headers.get("Content-Type"), 400);
    const reqBody = await ctx.request.body();
    const req = await reqBody.value;

    let reqType = "json";
    if (type) { reqType = type }
    ctx.assert(reqBody.type === reqType, 400);

    console.log(req);
    return req;
}