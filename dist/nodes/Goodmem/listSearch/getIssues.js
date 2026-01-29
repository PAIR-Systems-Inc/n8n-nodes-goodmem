"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIssues = getIssues;
const transport_1 = require("../shared/transport");
async function getIssues(filter, paginationToken) {
    const page = paginationToken ? +paginationToken : 1;
    const per_page = 100;
    let responseData = {
        items: [],
        total_count: 0,
    };
    responseData = await transport_1.goodmemApiRequest.call(this, 'GET', '/space', {
        page,
    });
    const results = responseData.items.map((item) => ({
        name: item.title,
        value: item.number,
    }));
    const nextPaginationToken = page * per_page < responseData.total_count ? page + 1 : undefined;
    return { results, paginationToken: nextPaginationToken };
}
//# sourceMappingURL=getIssues.js.map