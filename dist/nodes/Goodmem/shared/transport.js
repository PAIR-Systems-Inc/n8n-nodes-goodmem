"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goodmemApiRequest = goodmemApiRequest;
async function goodmemApiRequest(method, resource, qs = {}, body = undefined) {
    const credentials = await this.getCredentials('goodmemApi');
    const uri = `${credentials.server.replace(/\/$/, '')}/v1`;
    const options = {
        method: method,
        qs,
        body,
        url: uri + `/${resource}`,
        json: true,
    };
    const credentialType = 'goodmemApi';
    return this.helpers.httpRequestWithAuthentication.call(this, credentialType, options);
}
//# sourceMappingURL=transport.js.map