"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Goodmem = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class Goodmem {
    constructor() {
        this.description = {
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
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
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
                        },
                    ],
                    default: 'memory',
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
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
                    ],
                    default: 'create',
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['memory'],
                        },
                    },
                    options: [
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
                            operation: ['create'],
                        },
                    },
                    placeholder: '',
                    description: '(Optional) Space ID',
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
                    description: '(Required) Space Name',
                },
                {
                    displayName: 'Embedder(s)',
                    name: 'requiredEmbedders',
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
                    description: '(Required) Embedder(s)',
                    options: [
                        {
                            displayName: 'Embedder',
                            name: 'embedder',
                            values: [
                                {
                                    displayName: 'Embedder ID',
                                    name: 'id',
                                    type: 'string',
                                    default: '',
                                    placeholder: '',
                                    description: 'Create an embedder and enter its ID',
                                },
                                {
                                    displayName: 'Embedder weight',
                                    name: 'weight',
                                    type: 'number',
                                    default: 1.0,
                                    placeholder: '',
                                    description: 'Embedder weight',
                                },
                            ]
                        },
                    ]
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
                            operation: ['create'],
                        },
                    },
                    placeholder: '',
                    description: '(Optional) Space Owner ID',
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
                    description: '(Optional) Space Labels',
                    options: [
                        {
                            displayName: 'Label',
                            name: 'labels',
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
                    ]
                },
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
                            name: 'Other',
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
                    description: '(Optional) Chunking Strategy',
                },
                {
                    displayName: 'Chunking Strategy (Other)',
                    name: 'chunkingStrategyOther',
                    type: 'string',
                    default: '',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['space', 'memory'],
                            operation: ['create'],
                            optionalChunkingStrategy: ['other'],
                        },
                    },
                    placeholder: 'Enter chunking strategy',
                    description: 'Enter desired chunking strategy',
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
                    required: true,
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
                    typeOptions: { multipleValues: true, multipleValueButtonText: "Add separator" },
                    default: [
                        '\\n\\n',
                        '\\n',
                        ' ',
                        ''
                    ],
                    required: false,
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
                            name: 'tokens',
                            value: 'tokens'
                        },
                    ],
                    displayOptions: {
                        show: {
                            resource: ['space', 'memory'],
                            operation: ['create'],
                            chunkingOptionToggle: ['custom'],
                        },
                    },
                    placeholder: 'Enter Length measurement unit',
                    description: 'Length measurement unit',
                },
                {
                    displayName: 'Space ID',
                    name: 'requiredSpaceIdForMemory',
                    type: 'string',
                    default: '',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['memory'],
                        },
                        hide: {
                            operation: ['retrieve'],
                        },
                    },
                    placeholder: '',
                    description: '(Required) Space ID',
                },
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
                {
                    displayName: 'Content type',
                    name: 'contentTypeForMemory',
                    type: 'string',
                    default: 'text/plain',
                    displayOptions: {
                        show: {
                            resource: ['memory'],
                            operation: ['create'],
                        },
                    },
                },
            ],
        };
    }
}
exports.Goodmem = Goodmem;
//# sourceMappingURL=Goodmem.node.js.map