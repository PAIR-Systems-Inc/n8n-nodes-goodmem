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
			baseURL: '={{$credentials.server.replace(/\\/$/, "") + "/v1"}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			/*
			 * ============================================
			 *            AUTHENTICATION
			 * ============================================
			 */
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'API Key',
						value: 'goodmemApi',
					},
				],
				default: 'goodmemApi',
			},

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
						action: 'Create a space',
						routing: {
							request: {
								method: 'POST',
								url: '/spaces',
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an existing space in Goodmem',
						action: 'Delete a space',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/spaces/{{$parameter.requiredSpaceId}}',
							},
						},
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
						action: 'Create a memory',
						routing: {
							request: {
								method: 'POST',
								url: '/memories',
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an existing memory in Goodmem',
						action: 'Delete a memory',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/memories/{{$parameter.memoryIdRequired}}',
							},
						},
					},
					{
						name: 'Download Content',
						value: 'downloadContent',
						description: 'Download the original content of a memory',
						action: 'Download memory content',
						routing: {
							request: {
								method: 'GET',
								url: '=/memories/{{$parameter.memoryIdRequired}}/content',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a memory by its ID in Goodmem',
						action: 'Get a memory',
						routing: {
							request: {
								method: 'GET',
								url: '=/memories/{{$parameter.memoryIdRequired}}',
							},
						},
					},
					{
						name: 'Retrieve',
						value: 'retrieve',
						description: 'Search memories semantically in Goodmem',
						action: 'Retrieve memories',
						routing: {
							request: {
								method: 'GET',
								url: '/memories:retrieve',
							},
						},
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
						resource: ['space'],
					},
					hide: {
						operation: ['create'],
					},
				},
				placeholder: '',
				description: 'The Space ID to operate on',
			},
			{
				displayName: 'Space ID',
				name: 'optionalSpaceId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['space'],
						operation: ['create'],
					},
				},
				placeholder: '',
				description: 'Client-provided UUID for idempotent creation',
				routing: {
					send: {
						type: 'body',
						property: 'spaceId',
					},
				},
			},
			{
				displayName: 'Space Name',
				name: 'requiredSpaceName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['space'],
						operation: ['create'],
					},
				},
				placeholder: '',
				description: 'Name for the new space',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},
			{
				displayName: 'Embedder(s)',
				name: 'spaceEmbedders',
				type: 'fixedCollection',
				typeOptions: { multipleValues: true },
				placeholder: 'Add Embedder',
				default: {},
				displayOptions: {
					show: {
						resource: ['space'],
						operation: ['create'],
					},
				},
				description: 'Embedder configurations for the space',
				options: [
				{
					displayName: 'Embedder',
					name: 'embedders',
					values: [
						{
							displayName: 'Embedder ID',
							name: 'embedderId',
							type: 'string',
							default: '',
							placeholder: '',
							description: 'The identifier for the embedder',
						},
						{
							displayName: 'Default Retrieval Weight',
							name: 'defaultRetrievalWeight',
							type: 'number',
							default: 1.0,
							placeholder: '',
							description: 'Relative priority when retrieving memories',
						},
					]
				},
			],
			routing: {
				send: {
					type: 'body',
					property: 'spaceEmbedders',
					value: '={{$value.embedders}}',
				},
			},
			},
			{
				displayName: 'Space Owner',
				name: 'optionalSpaceOwner',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['space'],
						operation: ['create'],
					},
				},
				placeholder: '',
				description: 'Owner identifier. Requires CREATE_SPACE_ANY permission if specified.',
				routing: {
					send: {
						type: 'body',
						property: 'ownerId',
					},
				},
			},
			{
				displayName: 'Labels',
				name: 'optionalSpaceLabels',
				type: 'fixedCollection',
				typeOptions: { multipleValues: true },
				placeholder: 'Add Label',
				default: {},
				displayOptions: {
					show: {
						resource: ['space'],
						operation: ['create'],
					},
				},
				description: 'Key-value pairs for categorizing the space (max 20)',
				options: [
				{
					displayName: 'Label',
					name: 'labelItems',
					values: [
						{
							displayName: 'Key',
							name: 'key',
							type: 'string',
							default: '',
							placeholder: 'e.g. environment',
							description: 'Label key',
						},
						{
							displayName: 'Value',
							name: 'value',
							type: 'string',
							default: '',
							placeholder: 'e.g. production',
							description: 'Label value',
						}
					]
				},
			],
			routing: {
				send: {
					type: 'body',
					property: 'labels',
					value: '={{Object.fromEntries(($value.labelItems || []).map(item => [item.key, item.value]))}}',
				},
			},
			},
			/*
			 * ============================================
			 *            MEMORY FIELDS
			 * ============================================
			 */
			{
				displayName: 'Space ID',
				name: 'requiredSpaceIdForMemory',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['memory'],
						operation: ['create'],
					},
				},
				placeholder: '',
				description: 'Space ID where the memory will be stored (UUID format)',
				routing: {
					send: {
						type: 'body',
						property: 'spaceId',
					},
				},
			},
			{
				displayName: 'Memory ID',
				name: 'memoryIdRequired',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['memory'],
						operation: ['delete', 'get', 'downloadContent'],
					},
				},
				placeholder: '',
				description: 'The Memory ID to operate on (UUID format)',
			},
			{
				displayName: 'Include Content',
				name: 'includeContent',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						resource: ['memory'],
						operation: ['get'],
					},
				},
				description: 'Whether to include the original content in the response',
				routing: {
					send: {
						type: 'query',
						property: 'includeContent',
					},
				},
			},
			{
				displayName: 'Include Processing History',
				name: 'includeProcessingHistory',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['memory'],
						operation: ['get'],
					},
				},
				description: 'Whether to include background job processing history in the response',
				routing: {
					send: {
						type: 'query',
						property: 'includeProcessingHistory',
					},
				},
			},
			{
				displayName: 'Memory ID',
				name: 'memoryIdOptional',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['memory'],
						operation: ['create'],
					},
				},
				placeholder: '',
				description: 'Client-provided UUID for idempotent creation',
				routing: {
					send: {
						type: 'body',
						property: 'memoryId',
					},
				},
			},
			{
				displayName: 'Content Type',
				name: 'contentTypeForMemory',
				type: 'string',
				default: 'text/plain',
				displayOptions: {
					show: {
						resource: ['memory'],
						operation: ['create'],
					},
				},
				description: 'MIME type of the content (e.g., text/plain, text/markdown)',
				routing: {
					send: {
						type: 'body',
						property: 'contentType',
					},
				},
			},
			{
				displayName: 'Content',
				name: 'originalContent',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['memory'],
						operation: ['create'],
					},
				},
				placeholder: 'Enter the text content for this memory',
				description: 'The text content to store as a memory',
				routing: {
					send: {
						type: 'body',
						property: 'originalContent',
					},
				},
			},
			/*
			 * ============================================
			 *            CHUNKING FIELDS (shared)
			 * ============================================
			 */
			{
				displayName: 'Chunking Strategy',
				name: 'optionalChunkingStrategy',
				type: 'options',
				default: 'recursive',
				options: [
					{
						name: 'Recursive',
						value: 'recursive'
					},
					{
						name: 'Sentence',
						value: 'sentence'
					},
					{
						name: 'None',
						value: 'none'
					},
					{
						name: 'Other (JSON)',
						value: 'other'
					}
				],
				displayOptions: {
					show: {
						resource: ['space', 'memory'],
						operation: ['create'],
					},
				},
				placeholder: '',
				description: 'Strategy for splitting content into chunks',
				routing: {
					send: {
						type: 'body',
						property: '={{$parameter.resource === "space" ? "defaultChunkingConfig" : "chunkingConfig"}}',
						value: `={{
							(() => {
								const strategy = $parameter.optionalChunkingStrategy;

								// "other" is handled by the JSON field
								if (strategy === 'other') {
									return undefined;
								}

								// "none" has no config options
								if (strategy === 'none') {
									return { none: {} };
								}

								// Check if using default or custom options
							// Use defaults if toggle is undefined, null, empty, or explicitly 'default'
								const toggle = $parameter.chunkingOptionToggle;
								if (!toggle || toggle === 'default') {
									// Don't send any config - let server use its defaults
									return undefined;
								}

								// Map UI values to API enum values
								const lengthMap = { chars: 'CHARACTER_COUNT', tokens: 'TOKEN_COUNT' };
								const keepMap = { end: 'KEEP_END', start: 'KEEP_START', none: 'NONE' };

								// Build custom config based on strategy
								if (strategy === 'recursive') {
									const config = {
										chunkSize: $parameter.chunkSize,
										chunkOverlap: $parameter.chunkOverlap,
										lengthMeasurement: lengthMap[$parameter.lengthUnit] || 'CHARACTER_COUNT',
									};

									// Add separator config if custom separators selected
									if ($parameter.chunkingSeparatorOptionToggle === 'custom') {
										config.separators = $parameter.chunkingSeparators;
										config.separatorIsRegex = $parameter.chunkingRegexOrString === 'regex';
										config.keepStrategy = keepMap[$parameter.chunkSeparator] || 'KEEP_END';
									}

									return { recursive: config };
								}

								if (strategy === 'sentence') {
									return {
										sentence: {
											maxChunkSize: $parameter.maxChunkSize,
											minChunkSize: $parameter.minChunkSize,
											lengthMeasurement: lengthMap[$parameter.lengthUnit] || 'CHARACTER_COUNT',
										}
									};
								}

								return undefined;
							})()
						}}`,
					},
				},
			},
			{
				displayName: 'Chunking Config (JSON)',
				name: 'chunkingConfigJson',
				type: 'json',
				default: '{}',
				displayOptions: {
					show: {
						resource: ['space', 'memory'],
						operation: ['create'],
						optionalChunkingStrategy: ['other'],
					},
				},
				placeholder: '{"myStrategy": {"option1": "value1"}}',
				description: 'Custom chunking config as JSON',
				routing: {
					send: {
						type: 'body',
						property: '={{$parameter.resource === "space" ? "defaultChunkingConfig" : "chunkingConfig"}}',
						value: '={{$value ? JSON.parse($value) : undefined}}',
					},
				},
			},
			{
				displayName: 'Chunking Options',
				name: 'chunkingOptionToggle',
				type: 'options',
				default: 'default',
				options: [
					{
						name: 'Default',
						value: 'default',
					},
					{
						name: 'Custom',
						value: 'custom',
					},
				],
				displayOptions: {
					show: {
						resource: ['space', 'memory'],
						operation: ['create'],
						optionalChunkingStrategy: ['recursive', 'sentence']
					},
				},
			},
			{
				displayName: 'Chunk Size',
				name: 'chunkSize',
				type: 'number',
				typeOptions: {
					minValue: 1,
					numberStep: 1,
				},
				default: 512,
				required: true,
				displayOptions: {
					show: {
						resource: ['space', 'memory'],
						operation: ['create'],
						chunkingOptionToggle: ['custom'],
						optionalChunkingStrategy: ['recursive']
					},
				},
				placeholder: 'Enter chunk size',
				description: 'Chunk size (characters or tokens) (default 512)',
			},
			{
				displayName: 'Max Chunk Size',
				name: 'maxChunkSize',
				type: 'number',
				typeOptions: {
					minValue: 2,
					numberStep: 1,
				},
				default: 4000,
				required: true,
				displayOptions: {
					show: {
						resource: ['space', 'memory'],
						operation: ['create'],
						chunkingOptionToggle: ['custom'],
						optionalChunkingStrategy: ['sentence']
					},
				},
				placeholder: 'Enter max chunk size',
				description: 'Maximum chunk size (characters or tokens) (default 512)',
			},
			{
				displayName: 'Min Chunk Size',
				name: 'minChunkSize',
				type: 'number',
				typeOptions: {
					minValue: 1,
					numberStep: 1,
				},
				default: 100,
				required: true,
				displayOptions: {
					show: {
						resource: ['space', 'memory'],
						operation: ['create'],
						chunkingOptionToggle: ['custom'],
						optionalChunkingStrategy: ['sentence']
					},
				},
				placeholder: 'Enter minimum chunk size',
				description: 'Minimum chunk size (characters or tokens) (default 512)',
			},
			{
				displayName: 'Chunk Overlap',
				name: 'chunkOverlap',
				type: 'number',
				typeOptions: {
					minValue: 0,
					numberStep: 1,
				},
				default: 64,
				displayOptions: {
					show: {
						resource: ['space', 'memory'],
						operation: ['create'],
						chunkingOptionToggle: ['custom'],
						optionalChunkingStrategy: ['recursive']
					},
				},
				placeholder: 'Enter chunk overlap',
				description: 'Overlap between chunks (characters or tokens)',
			},
			{
				displayName: 'Chunking Separator Options',
				name: 'chunkingSeparatorOptionToggle',
				type: 'options',
				default: 'default',
				options: [
					{
						name: 'Default',
						value: 'default',
					},
					{
						name: 'Custom',
						value: 'custom',
					},
				],
				displayOptions: {
					show: {
						resource: ['space', 'memory'],
						operation: ['create'],
						chunkingOptionToggle: ['custom'],
						optionalChunkingStrategy: ['recursive']
					},
				},
			},
			{
				displayName: 'Chunking Definition Options',
				name: 'chunkingRegexOrString',
				type: 'options',
				default: 'string',
				options: [
					{
						name: 'String',
						value: 'string',
					},
					{
						name: 'Regex',
						value: 'regex',
					},
				],
				displayOptions: {
					show: {
						resource: ['space', 'memory'],
						operation: ['create'],
						chunkingOptionToggle: ['custom'],
						optionalChunkingStrategy: ['recursive']
					},
				},
			},
			{
				displayName: 'Chunking Separators',
				name: 'chunkingSeparators',
				type: 'string',
				typeOptions: {multipleValues: true,multipleValueButtonText: "Add separator"},
				default: [
					'\\n\\n',
					'\\n',
					' ',
					''
				],
				displayOptions: {
					show: {
						resource: ['space', 'memory'],
						operation: ['create'],
						optionalChunkingStrategy: ['recursive'],
						chunkingOptionToggle: ['custom'],
						chunkingSeparatorOptionToggle: ['custom']
					},
				},
				placeholder: 'Enter chunking separator',
				description: 'Custom separators',
			},
			{
				displayName: 'Keep Separator',
				name: 'chunkSeparator',
				type: 'options',
				default: 'end',
				required: true,
				options: [
					{
						name: 'End',
						value: 'end'
					},
					{
						name: 'Start',
						value: 'start'
					},
					{
						name: 'None',
						value: 'none'
					},
				],
				displayOptions: {
					show: {
						resource: ['space', 'memory'],
						operation: ['create'],
						chunkingOptionToggle: ['custom'],
						optionalChunkingStrategy: ['recursive'],
						chunkingSeparatorOptionToggle: ['custom']
					},
				},
				placeholder: 'Enter desired separator retention option',
				description: 'Separator retention',
			},
			
			{
				displayName: 'Length Unit',
				name: 'lengthUnit',
				type: 'options',
				default: 'chars',
				required: true,
				options: [
					{
						name: 'Chars',
						value: 'chars'
					},
					{
						name: 'Tokens',
						value: 'tokens'
					},
				],
				displayOptions: {
					show: {
						resource: ['space', 'memory'],
						operation: ['create'],
						chunkingOptionToggle: ['custom'],
						optionalChunkingStrategy: ['recursive', 'sentence'],
					},
				},
				placeholder: 'Enter Length measurement unit',
				description: 'Length measurement unit',
			},
			{
				displayName: 'Metadata',
				name: 'optionalMetadata',
				type: 'fixedCollection',
				typeOptions: { multipleValues: true },
				placeholder: 'Add Metadata',
				default: {},
				displayOptions: {
					show: {
						resource: ['memory'],
						operation: ['create'],
					},
				},
				description: 'Key-value pairs for memory metadata',
				options: [
				{
					displayName: 'Metadata',
					name: 'metadata',
					values: [
						{
							displayName: 'Key',
							name: 'key',
							type: 'string',
							default: '',
							placeholder: 'e.g. source',
							description: 'Metadata key',
						},
						{
							displayName: 'Value',
							name: 'value',
							type: 'string',
							default: '',
							placeholder: 'e.g. email',
							description: 'Metadata value',
						}
					]
				},
			],
			routing: {
				send: {
					type: 'body',
					property: 'metadata',
					value: '={{Object.fromEntries(($value.metadata || []).map(item => [item.key, item.value]))}}',
				},
			},
		},
			/*
			 * ============================================
			 *            RETRIEVE FIELDS
			 * ============================================
			 */
			{
				displayName: 'Message',
				name: 'retrieveMessage',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['memory'],
						operation: ['retrieve'],
					},
				},
				placeholder: 'Enter your search query',
				description: 'Primary query/message for semantic search',
				routing: {
					send: {
						type: 'query',
						property: 'message',
					},
				},
			},
			{
				displayName: 'Space IDs',
				name: 'retrieveSpaceIds',
				type: 'string',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Space ID',
				},
				default: [],
				displayOptions: {
					show: {
						resource: ['memory'],
						operation: ['retrieve'],
					},
				},
				placeholder: 'Enter Space UUID',
				description: 'Space UUIDs to search within',
				routing: {
					send: {
						type: 'query',
						property: 'spaceIds',
						value: '={{$value.join(",")}}',
					},
				},
			},
			{
				displayName: 'Filter',
				name: 'retrieveFilter',
				type: 'string',
				typeOptions: {
					rows: 2,
				},
				default: '',
				displayOptions: {
					show: {
						resource: ['memory'],
						operation: ['retrieve'],
					},
				},
				placeholder: "e.g. val('$.key1') = 'value1'",
				description: 'Filter expression applied to every space ID supplied',
				routing: {
					send: {
						type: 'query',
						property: 'filter',
						value: '={{$value || undefined}}',
					},
				},
			},
			{
				displayName: 'Requested Size',
				name: 'retrieveRequestedSize',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 10,
				displayOptions: {
					show: {
						resource: ['memory'],
						operation: ['retrieve'],
					},
				},
				description: 'Maximum number of memories to retrieve',
				routing: {
					send: {
						type: 'query',
						property: 'requestedSize',
					},
				},
			},
			{
				displayName: 'Fetch Memory',
				name: 'retrieveFetchMemory',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						resource: ['memory'],
						operation: ['retrieve'],
					},
				},
				description: 'Whether to fetch memory definitions',
				routing: {
					send: {
						type: 'query',
						property: 'fetchMemory',
					},
				},
			},
			{
				displayName: 'Fetch Memory Content',
				name: 'retrieveFetchMemoryContent',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['memory'],
						operation: ['retrieve'],
					},
				},
				description: 'Whether to fetch original content for memories',
				routing: {
					send: {
						type: 'query',
						property: 'fetchMemoryContent',
					},
				},
			},
			{
				displayName: 'Post-Processor Options',
				name: 'postProcessorOptions',
				type: 'collection',
				placeholder: 'Add Post-Processor Option',
				default: {},
				displayOptions: {
					show: {
						resource: ['memory'],
						operation: ['retrieve'],
					},
				},
				description: 'Configure ChatPostProcessor for reranking and LLM generation',
				options: [
					{
						displayName: 'Chronological Resort',
						name: 'postProcessorChronologicalResort',
						type: 'boolean',
						default: true,
						description: 'Whether to resort results by creation time (default: true)',
						routing: {
							send: {
								type: 'query',
								property: 'postProcessorChronologicalResort',
							},
						},
					},
					{
						displayName: 'LLM ID',
						name: 'postProcessorLlmId',
						type: 'string',
						default: '',
						placeholder: 'UUID of LLM',
						description: 'UUID of LLM for ChatPostProcessor generation',
						routing: {
							send: {
								type: 'query',
								property: 'postProcessorLlmId',
							},
						},
					},
					{
						displayName: 'LLM Temperature',
						name: 'postProcessorLlmTemp',
						type: 'number',
						typeOptions: {
							minValue: 0,
							maxValue: 2,
							numberPrecision: 2,
						},
						default: 0.3,
						description: 'LLM temperature for ChatPostProcessor (default: 0.3)',
						routing: {
							send: {
								type: 'query',
								property: 'postProcessorLlmTemp',
							},
						},
					},
					{
						displayName: 'Max Results',
						name: 'postProcessorMaxResults',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 10,
						description: 'Maximum results for ChatPostProcessor (default: 10)',
						routing: {
							send: {
								type: 'query',
								property: 'postProcessorMaxResults',
							},
						},
					},
					{
						displayName: 'Relevance Threshold',
						name: 'postProcessorRelevanceThreshold',
						type: 'number',
						typeOptions: {
							minValue: 0,
							maxValue: 1,
							numberPrecision: 2,
						},
						default: 0.5,
						description: 'Minimum relevance score for ChatPostProcessor (default: 0.5)',
						routing: {
							send: {
								type: 'query',
								property: 'postProcessorRelevanceThreshold',
							},
						},
					},
					{
						displayName: 'Reranker ID',
						name: 'postProcessorRerankerId',
						type: 'string',
						default: '',
						placeholder: 'UUID of reranker',
						description: 'UUID of reranker for ChatPostProcessor (enables post-processing)',
						routing: {
							send: {
								type: 'query',
								property: 'postProcessorRerankerId',
							},
						},
					},
				],
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
