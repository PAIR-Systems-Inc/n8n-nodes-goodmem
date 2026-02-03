# n8n-nodes-goodmem

This is an n8n community node that integrates with [Goodmem](https://goodmem.ai), a semantic memory and knowledge storage platform. It enables n8n workflows to store, retrieve, and manage semantic memories with powerful embedding and search capabilities.

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

## Features

- **Spaces Management** - Create and delete memory spaces (containers for organizing memories)
- **Memory Operations** - Full CRUD operations for storing and retrieving memories
- **Semantic Search** - Retrieve memories using natural language queries with relevance scoring
- **Flexible Chunking** - Configure recursive, sentence-based, or custom chunking strategies
- **Advanced Retrieval** - Post-processing with reranking, LLM generation, and relevance filtering
- **Metadata Support** - Tag memories and spaces with custom labels and metadata for filtering

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Credentials](#credentials)
- [Operations](#operations)
- [Usage Examples](#usage-examples)
- [Chunking Strategies](#chunking-strategies)
- [Advanced Retrieval Options](#advanced-retrieval-options)
- [Development](#development)
- [Resources](#resources)
- [License](#license)

## Prerequisites

- [n8n](https://n8n.io/) version 1.60.0 or later
- A Goodmem account with API access
- Goodmem API key and server URL

## Installation

### Goodmem Installation

Configure a goodmem server to connect to before using the node.
Visit https://goodmem.ai/quick-start for more instructions. Consider using the Railway or Fly.io installation for quick access to the Goodmem API over the internet.

### Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** > **Community Nodes**
3. Select **Install**
4. Enter `n8n-nodes-goodmem` and click **Install**

### Manual Installation

```bash
cd ~/.n8n/nodes
npm install n8n-nodes-goodmem
```

Then restart your n8n instance.

## Credentials

Before using the node, configure your Goodmem credentials:

1. In n8n, go to **Credentials** > **New**
2. Search for **Goodmem API**
3. Enter the following:
   - **Goodmem Server**: Your Goodmem API server URL
   - **Goodmem API Key**: Your API key for authentication

## Operations

### Spaces

| Operation | Description |
|-----------|-------------|
| **Create** | Create a new semantic memory space with custom embedders and chunking configuration |
| **Delete** | Remove an existing space and all its memories |

### Memories

| Operation | Description |
|-----------|-------------|
| **Create** | Store new content as a memory with optional chunking and metadata |
| **Get** | Retrieve a memory's metadata and optionally its content and processing history |
| **Delete** | Remove a specific memory from a space |
| **Download Content** | Retrieve the original content of a stored memory |
| **Retrieve** | Perform semantic search across one or more spaces with natural language |

## Usage Examples

### Creating a Memory Space

Configure a space to store knowledge base documents:

1. Add the **Goodmem** node to your workflow
2. Select **Space** as the resource and **Create** as the operation
3. Enter a **Space Name** (e.g., "Product Documentation")
4. Configure an embedder with ID and retrieval weight
5. Optionally set labels for organization (e.g., `environment: production`)

### Storing a Memory

Add content to your space:

1. Select **Memory** as the resource and **Create** as the operation
2. Provide the **Space ID** where the memory will be stored
3. Enter the **Content** (text, markdown, etc.)
4. Optionally configure chunking strategy:
   - **Recursive**: Splits by separators with configurable chunk size and overlap
   - **Sentence**: Splits on sentence boundaries
   - **None**: Store content as a single chunk

### Semantic Search

Retrieve relevant memories using natural language:

1. Select **Memory** as the resource and **Retrieve** as the operation
2. Enter your **Message** (search query)
3. Optionally filter by:
   - Specific **Space IDs**
   - **Filter expressions** for metadata matching
   - **Relevance threshold** (0-1)
4. Configure post-processing:
   - **Reranker**: Improve result relevance ordering
   - **LLM Generation**: Generate responses based on retrieved context

## Chunking Strategies

The node supports flexible chunking for optimal embedding and retrieval:

### Recursive Chunking (Default)

Best for general-purpose document processing:

- **Chunk Size**: Target size for each chunk (default: 512)
- **Chunk Overlap**: Overlap between chunks for context continuity (default: 64)
- **Separators**: Custom separators for splitting (paragraphs, sentences, etc.)
- **Length Unit**: Characters or tokens

### Sentence-Based Chunking

Preserves sentence boundaries:

- **Max Chunk Size**: Maximum characters/tokens per chunk
- **Min Chunk Size**: Minimum chunk size threshold

### Custom JSON

For advanced configurations, provide a custom chunking strategy as JSON.

## Advanced Retrieval Options

Fine-tune search results with post-processing:

| Option | Description |
|--------|-------------|
| **Reranker ID** | UUID of a reranker model to improve result ordering |
| **LLM ID** | UUID of an LLM to generate contextual responses |
| **Relevance Threshold** | Minimum score (0-1) for including results |
| **LLM Temperature** | Creativity setting for LLM generation (0-2) |
| **Max Results** | Limit the number of returned memories |
| **Chronological Resort** | Reorder results by creation time |

## Example Workflow: AI-Powered Q&A System

```
[Webhook Trigger] --> [Goodmem: Retrieve] --> [OpenAI: Generate Response] --> [Respond to Webhook]
```

1. **Webhook Trigger**: Receives a user question
2. **Goodmem Retrieve**: Searches semantic memories for relevant context
3. **OpenAI**: Generates an answer using the retrieved context
4. **Response**: Returns the AI-generated answer

## Development

### Building

```bash
npm install
npm run build
```

### Linting

```bash
npm run lint
npm run lintfix
```

### Local Testing

Link the node to your local n8n installation:

```bash
npm link
cd ~/.n8n/nodes
npm link n8n-nodes-goodmem
```

## Compatibility

Compatible with n8n version 1.60.0 or later.

## Resources

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Goodmem Documentation](https://docs.goodmem.ai)

## License

[MIT](LICENSE.md)

## Author

Zaid Abdulrehman (zaid.abdulrehman@pairsys.ai)
