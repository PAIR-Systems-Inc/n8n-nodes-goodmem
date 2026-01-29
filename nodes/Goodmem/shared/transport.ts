import type {
	IHookFunctions,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';

export async function goodmemApiRequest(
	this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,
	qs: IDataObject = {},
	body: IDataObject | undefined = undefined,
) {

	const credentials = await this.getCredentials('goodmemApi');
	const uri = `${(credentials.server as string).replace(/\/$/, '')}/v1`;

	const options: IHttpRequestOptions = {
		method: method,
		qs,
		body,
		url: uri + `/${resource}`,
		json: true,
	};

	const credentialType = 'goodmemApi';

	return this.helpers.httpRequestWithAuthentication.call(this, credentialType, options);
}
