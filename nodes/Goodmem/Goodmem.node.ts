import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

export class Goodmem implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Goodmem',
		name: 'goodmem',
		icon: { light: 'file:../../icons/goodmem.svg', dark: 'file:../../icons/goodmem.dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Goodmem API',
		defaults: {
			name: 'Goodmem',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'goodmemApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['goodmemApi'],
					},
				},
			},
		],
		requestDefaults: {
			baseURL: 'https://api.github.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			/*
			 * ============================================
			 *            RESOURCE SELECTOR
			 * ============================================
			 */
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options', 
				noDataExpression: true,
				options: [
					{
						name: 'Space',
						value: 'space',
					},
					{
						name: 'Memory',
						value: 'memory',
					},
					{
						name: 'Embedder',
						value: 'embedder',
					},
					{
						name: 'Llm',
						value: 'llm',
					},
					{
						name: 'Reranker',
						value: 'reranker',
					},
					{
						name: 'Api Key',
						value: 'apikey',
					}, // We can add ocr, system init, users, post processors, space update, in a future update
				],
				default: 'memory',
			},

			/*
			 * ============================================
			 *            SPACE OPERATIONS
			 * ============================================
			 */
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',  // TODO: add update action
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['space'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a space for use in Goodmem',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an existing space in Goodmem'
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get details about an existing space in Goodmem'
					},
					{
						name: 'List',
						value: 'list',
						description: 'List available spaces in Goodmem'
					},
					{
						name: 'List Memories',
						value: 'listMemories',
						description: 'List memories in a space in Goodmem'
					},
				],
				default: 'create',
			},

			/*
			 * ============================================
			 *            MEMORY OPERATIONS
			 * ============================================
			 */
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',  // TODO: change this accordingly
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['memory'],
					},
				},
				options: [ //todo: add delete multiple, create multiple, advanced retrieval with json, download
					{
						name: 'Create',
						value: 'create',
						description: 'Create a memory for use in Goodmem',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an existing memory in Goodmem'
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a memory by its id in Goodmem'
					},
					{
						name: 'Retrieve',
						value: 'retrieve',
						description: 'Search memories in Goodmem'
					},
				],
				default: 'create',
			},

			/*
			 * ============================================
			 *            LLM OPERATIONS
			 * ============================================
			 */
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['llm'],
					},
				},
				options: [ //todo: add llm update
					{
						name: 'Create',
						value: 'create',
						description: 'Create a llm for use in Goodmem',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an existing llm in Goodmem'
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a llm by its id in Goodmem'
					},
					{
						name: 'List',
						value: 'list',
						description: 'List a llm by its id in Goodmem'
					},
				],
				default: 'create',
			},
			/*
			 * ============================================
			 *            EMBEDDER OPERATIONS
			 * ============================================
			 */
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['embedder'],
					},
				},
				options: [ //todo: add embedder update
					{
						name: 'Create',
						value: 'create',
						description: 'Create an embedder for use in Goodmem',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an existing embedder in Goodmem'
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get an embedder by its id in Goodmem'
					},
					{
						name: 'List',
						value: 'list',
						description: 'List an embedder by its id in Goodmem'
					},
				],
				default: 'create',
			},
			/*
			 * ============================================
			 *            RERANKER OPERATIONS
			 * ============================================
			 */
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['reranker'],
					},
				},
				options: [ //todo: add reranker update
					{
						name: 'Create',
						value: 'create',
						description: 'Create a reranker for use in Goodmem',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an existing reranker in Goodmem'
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a reranker by its id in Goodmem'
					},
					{
						name: 'List',
						value: 'list',
						description: 'List a reranker by its id in Goodmem'
					},
				],
				default: 'create',
			},

			/*
			 * ============================================
			 *            API KEY OPERATIONS
			 * ============================================
			 */
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['apikey'],
					},
				},
				options: [ //todo: add apikey update
					{
						name: 'Create',
						value: 'create',
						description: 'Create an apikey for use in Goodmem',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an existing apikey in Goodmem'
					},
					{
						name: 'List',
						value: 'list',
						description: 'List an apikey by its id in Goodmem'
					},
				],
				default: 'create',
			},

			/*
			 * ============================================
			 *            SPACE FIELDS
			 * ============================================
			 */
			{
				displayName: 'Space ID',
				name: 'requiredSpaceId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['space', 'memory'],
					},
					hide: {
						operation: ['create', 'list', 'retrieve'],
					},
				},
				placeholder: '',
				description: '(Required) Space ID',
			},
			{
				displayName: 'Space ID',
				name: 'optionalSpaceId',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: ['space'],
						operation: ['create', 'retrieve'],
					},
				},
				placeholder: '',
				description: '(Optional) Space ID',
			},
			{
				displayName: 'Space Name',
				name: 'optionalSpaceName',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: ['space'],
						operation: ['create', 'list'],
					},
				},
				placeholder: '',
				description: '(Optional) Space Name',
			},
			{
				displayName: 'Space Owner',
				name: 'optionalSpaceOwner',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: ['space'],
						operation: ['list'],
					},
				},
				placeholder: '',
				description: '(Optional) Space Owner ID',
			},
			{
				displayName: 'Space Labels',
				name: 'optionalSpaceLabels',
				type: 'collection',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: ['space'],
						operation: ['create', 'list'],
					},
				},
				placeholder: '',
				description: '(Optional) Space Labels',
			},
			/*
			 * ============================================
			 *            MEMORY FIELDS
			 * ============================================
			 */
			{
				displayName: 'Memory Id',
				name: 'memoryIdRequired',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['memory'],
						operation: ['delete', 'get'],
					},
				},
				placeholder: '',
				description: '(Required) Memory ID',
			},
			{
				displayName: 'Memory Id',
				name: 'memoryIdOptional',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: ['memory'],
						operation: ['create'],
					},
				},
				placeholder: '',
				description: '(Optional) Memory ID',
			},

			/*
			 * ============================================
			 *            RERANKER FIELDS
			 * ============================================
			 */
			{
				displayName: 'Reranker Id',
				name: 'rerankerIdRequired',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['reranker'],
						operation: ['delete', 'get'],
					},
				},
				placeholder: '',
				description: '(Required) Reranker ID',
			},
			{
				displayName: 'Reranker Id',
				name: 'rerankerIdOptional',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: ['reranker'],
						operation: ['create'],
					},
				},
				placeholder: '',
				description: '(Optional) Reranker ID',
			},

			/*
			 * ============================================
			 *            LLM FIELDS
			 * ============================================
			 */
			{
				displayName: 'Llm Id',
				name: 'llmIdRequired',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['llm'],
						operation: ['delete', 'get'],
					},
				},
				placeholder: '',
				description: '(Required) Llm ID',
			},
			{
				displayName: 'Memory Id',
				name: 'llmIdOptional',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: ['llm'],
						operation: ['create'],
					},
				},
				placeholder: '',
				description: '(Optional) Llm ID',
			},

			/*
			 * ============================================
			 *            EMBEDDER FIELDS
			 * ============================================
			 */
			{
				displayName: 'Embedder Id',
				name: 'embedderIdRequired',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['embedder'],
						operation: ['delete', 'get'],
					},
				},
				placeholder: '',
				description: '(Required) Embedder ID',
			},
			{
				displayName: 'Embedder Id',
				name: 'embedderIdOptional',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: ['embedder'],
						operation: ['create'],
					},
				},
				placeholder: '',
				description: '(Optional) Embedder ID',
			},

			/*
			 * ============================================
			 *            API KEY FIELDS
			 * ============================================
			 */
			{
				displayName: 'Api Key Id',
				name: 'apiKeyIdRequired',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['apikey'],
						operation: ['delete'],
					},
				},
				placeholder: '',
				description: '(Required) Api Key ID',
			},
			{
				displayName: 'Api Key Id',
				name: 'apiKeyIdOptional',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: ['apikey'],
						operation: ['create'],
					},
				},
				placeholder: '',
				description: '(Optional) Api Key ID',
			},
			// ...issueDescription,
			// ...issueCommentDescription,
		],
	};

	// methods = {
	// 	listSearch: {
	// 		getRepositories,
	// 		getUsers,
	// 		getIssues,
	// 	},
	// };
}
