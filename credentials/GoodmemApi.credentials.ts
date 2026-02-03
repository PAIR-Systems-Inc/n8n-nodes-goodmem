import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GoodmemApi implements ICredentialType {
	name = 'goodmemApi';

	displayName = 'Goodmem API';

	icon: Icon = { light: 'file:../icons/goodmem.svg', dark: 'file:../icons/goodmem.dark.svg' };

	documentationUrl =
		'https://docs.goodmem.ai/docs/reference/cli/goodmem_apikey/';

	properties: INodeProperties[] = [
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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials?.goodmemApiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.server.replace(new RegExp("/$"), "") + "/v1" }}',
			url: '/spaces',
			method: 'GET',
			headers: {
				'x-api-key': '={{$credentials?.goodmemApiKey}}',
			},
		},
	};
}
