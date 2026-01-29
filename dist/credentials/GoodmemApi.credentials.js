"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodmemApi = void 0;
class GoodmemApi {
    constructor() {
        this.name = 'goodmemApi';
        this.displayName = 'Goodmem API';
        this.icon = { light: 'file:../icons/goodmem.svg', dark: 'file:../icons/goodmem.dark.svg' };
        this.documentationUrl = 'https://docs.goodmem.ai/docs/reference/cli/goodmem_apikey/';
        this.properties = [
            {
                displayName: 'Goodmem Server',
                name: 'server',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Goodmem API Key',
                name: 'goodmemApiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'x-api-key': '{{$credentials?.goodmemApiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials.server.replace(new RegExp("/$"), "") + "/v1" }}',
                url: '/spaces',
                method: 'GET',
            },
        };
    }
}
exports.GoodmemApi = GoodmemApi;
//# sourceMappingURL=GoodmemApi.credentials.js.map