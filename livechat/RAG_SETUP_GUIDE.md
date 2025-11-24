# RAG (Retrieval Augmented Generation) Setup Guide

This guide explains how to set up and use the RAG system integrated with your DigiMax livechat application.

## Overview

RAG is a technique that combines:
1. **Retrieval**: Finding relevant documents from a knowledge base
2. **Augmentation**: Adding context to user queries
3. **Generation**: Creating accurate responses based on the context

This ensures your chatbot responses are grounded in factual knowledge from your database.

## Architecture

```
┌─────────────────┐
│  User Message   │
└────────┬────────┘
         │
    ┌────▼────────────────┐
    │ Generate Embedding   │
    │ (Ollama)             │
    └────┬────────────────┘
         │
    ┌────▼──────────────────────┐
    │ Semantic Search in KB       │
    │ (Cosine Similarity)        │
    └────┬──────────────────────┘
         │
    ┌────▼──────────────────────┐
    │ Build RAG Prompt            │
    │ (Question + Context)        │
    └────┬──────────────────────┘
         │
    ┌────▼──────────────────────┐
    │ Generate Response (Ollama)  │
    │ (LLM)                       │
    └────┬──────────────────────┘
         │
    ┌────▼─────────────┐
    │ Return Answer     │
    └───────────────────┘
```

## Prerequisites

### 1. Install Ollama

Ollama is a free, open-source tool that lets you run large language models locally.

**Download**: https://ollama.ai

After installation, verify it's working:
```bash
ollama -v
```

### 2. Start Ollama Service

Open a terminal and run:
```bash
ollama serve
```

You should see: `Listening on 127.0.0.1:11434`

### 3. Pull Required Models

In another terminal, pull the models:

```bash
# For embeddings (required)
ollama pull mistral-embed

# For LLM response generation (choose one)
ollama pull mistral      # Recommended: Fast and good quality
# OR
ollama pull neural-chat  # Lighter and faster
# OR
ollama pull dolphin-mixtral  # More advanced but slower
```

**Model comparison**:

| Model | Speed | Quality | Size | Best For |
|-------|-------|---------|------|----------|
| mistral | Fast | High | 4GB | General purpose ✅ |
| neural-chat | Very Fast | Good | 3GB | Real-time responses |
| dolphin-mixtral | Slow | Very High | 26GB | Complex reasoning |
| mistral-embed | N/A | High | 1GB | Embeddings only |

## Installation

### 1. Install Dependencies

```bash
cd livechat
npm install
```

This installs `axios` needed for Ollama communication.

### 2. Database Setup

The knowledge base table is created automatically when the server starts. It includes:
- Document content
- Vector embeddings
- Metadata
- Category/Source information
- Timestamps

## Usage

### 1. Seed Sample Knowledge Base

```bash
node scripts/seedKnowledgeBase.js
```

This adds 10 sample documents about DigiMax to your knowledge base.

**Output example**:
```
🌱 Starting Knowledge Base Seeder...

🔍 Checking Ollama service...
✅ Ollama service is running
📦 Available models: mistral-embed, mistral

📚 Seeding 10 documents...
✅ Successfully added 10 documents to knowledge base!

📊 Knowledge Base Statistics:
   Total documents: 10
   By category: { company: 1, services: 4, pricing: 1, portfolio: 1, contact: 1, faq: 1, insights: 1 }
   By source: { manual: 10 }
```

### 2. Start the Application

```bash
npm start
```

The server will start on `http://localhost:3000`

### 3. Test RAG Endpoints

#### Health Check
```bash
curl http://localhost:3000/api/rag/health
```

#### Query the RAG System
```bash
curl -X POST http://localhost:3000/api/rag/query \
  -H "Content-Type: application/json" \
  -d '{"query":"What services does DigiMax offer?"}'
```

**Response example**:
```json
{
  "response": "DigiMax offers a comprehensive range of digital marketing services including...",
  "relevantDocuments": [
    {
      "id": 2,
      "content": "Our social media management services include...",
      "category": "services",
      "similarity": 0.92
    }
  ],
  "usedRAG": true
}
```

#### Add Knowledge (Admin Only)
```bash
# First login to admin dashboard and get session
curl -X POST http://localhost:3000/api/rag/knowledge \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Our team has 15+ years of digital marketing experience",
    "category": "company",
    "source": "manual",
    "metadata": {"department": "about"}
  }'
```

#### Get All Knowledge Documents
```bash
curl http://localhost:3000/api/rag/knowledge
```

#### Delete Knowledge
```bash
curl -X DELETE http://localhost:3000/api/rag/knowledge/1
```

#### Knowledge Base Statistics
```bash
curl http://localhost:3000/api/rag/stats
```

### 4. Retrieve Relevant Documents (Debug)
```bash
curl -X POST http://localhost:3000/api/rag/retrieve \
  -H "Content-Type: application/json" \
  -d '{"query":"contact information", "topK": 3}'
```

## API Endpoints

### RAG Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/rag/query` | No | Process query with RAG |
| POST | `/api/rag/knowledge` | Admin | Add document to KB |
| POST | `/api/rag/knowledge/bulk` | Admin | Bulk add documents |
| GET | `/api/rag/knowledge` | Admin | Get all documents |
| GET | `/api/rag/knowledge/:id` | Admin | Get specific document |
| GET | `/api/rag/knowledge/category/:category` | Admin | Get by category |
| PUT | `/api/rag/knowledge/:id` | Admin | Update document |
| DELETE | `/api/rag/knowledge/:id` | Admin | Delete document |
| GET | `/api/rag/stats` | Admin | Get KB statistics |
| POST | `/api/rag/retrieve` | No | Retrieve relevant docs |
| GET | `/api/rag/health` | No | Health check |

## Configuration

You can customize RAG behavior in your code:

### Change LLM Model
```javascript
const RAGModule = require('./server/utils/ragModule');
const rag = new RAGModule(db);

rag.setGenerationModel('neural-chat');  // Change LLM
rag.setEmbeddingModel('mistral-embed');  // Change embeddings
rag.setTopK(10);  // Get top 10 relevant documents
```

### Adjust Parameters
```javascript
// In ragModule.js
const result = await rag.processQuery(query, useRAG = true);

// Generate response with custom params
await rag.ollama.generateResponse(
    prompt,
    model = 'mistral',
    temperature = 0.7,      // 0=deterministic, 1=creative
    maxTokens = 500
);
```

## Knowledge Base Structure

### Categories
- `company`: Company information
- `services`: Service descriptions
- `pricing`: Pricing information
- `portfolio`: Portfolio/case studies
- `contact`: Contact information
- `faq`: Frequently asked questions
- `insights`: Market trends and insights
- `general`: General information

### Metadata
Store additional context:
```json
{
  "service": "social_media_management",
  "department": "marketing",
  "language": "en",
  "version": "2024-01-01"
}
```

## Best Practices

### 1. Knowledge Base Content
- **Clear and concise**: Write documents with clear language
- **Self-contained**: Each document should be understandable independently
- **Structured**: Organize information logically with sections
- **Up-to-date**: Keep information current and accurate
- **Categorized**: Use appropriate categories for easy filtering

### 2. Query Optimization
- **Natural language**: Users can ask in conversational language
- **Context matters**: The system searches for semantically similar content
- **Quality embeddings**: Better KB content = better matching

### 3. Maintenance
- **Regular updates**: Add new information as your business evolves
- **Remove outdated**: Delete or update obsolete documents
- **Monitor stats**: Check knowledge base health regularly

## Troubleshooting

### Ollama not running
```
Error: Ollama server not accessible
```
**Solution**: Start Ollama with `ollama serve`

### Model not found
```
Error: "mistral-embed" not found
```
**Solution**: Pull the model with `ollama pull mistral-embed`

### Slow responses
- **Solution 1**: Use faster model (`neural-chat`)
- **Solution 2**: Reduce `topK` value
- **Solution 3**: Reduce `maxTokens` parameter

### Memory issues
- **Solution 1**: Use smaller models
- **Solution 2**: Close other applications
- **Solution 3**: Reduce batch processing

## Testing RAG System

### Using Postman
1. Import the RAG endpoints
2. Test with various queries
3. Monitor response times
4. Validate relevance

### Using cURL Scripts
See the API endpoints section above for examples.

### In Your Frontend
Add a chat interface that calls:
```javascript
const response = await fetch('http://localhost:3000/api/rag/query', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: userMessage })
});
const result = await response.json();
console.log(result.response);
```

## Performance Optimization

### Embedding Generation Time
- First time: 1-3 seconds (model loads)
- Subsequent: 100-300ms per document

### Query Processing Time
- Embedding query: 100-300ms
- Semantic search: 10-50ms
- LLM generation: 1-5 seconds

### Total Response Time: 1-6 seconds

### Optimization Tips
1. **Batch embeddings**: Pre-generate embeddings for bulk imports
2. **Cache embeddings**: Store in database (already implemented)
3. **Limit topK**: Fewer documents = faster processing
4. **Async processing**: Use non-blocking operations

## Next Steps

### Integrate with Chat Handler
```javascript
// In chatHandler.js
const RAGModule = require('../utils/ragModule');

const rag = new RAGModule(db);

socket.on('send_message', async (data) => {
  // Check if sender is admin (has knowledge base)
  const result = await rag.processQuery(data.message);

  // Send AI response back
  io.to(`conversation_${data.conversation_id}`).emit('ai_response', {
    message: result.response,
    sources: result.relevantDocuments
  });
});
```

### Add to Admin Dashboard
- Knowledge base management interface
- Add/edit/delete documents UI
- Knowledge base statistics visualization
- Query testing tool

### Frontend Improvements
- Display source documents
- Show relevance scores
- Implement follow-up questions
- Add feedback mechanism

## Resources

- **Ollama**: https://ollama.ai
- **Model Library**: https://ollama.ai/library
- **RAG Concept**: https://arxiv.org/abs/2005.11401
- **Semantic Search**: https://en.wikipedia.org/wiki/Semantic_search

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Review Ollama logs
3. Verify knowledge base content
4. Check network connectivity

---

**Last Updated**: November 2024
**RAG Version**: 1.0.0
**Compatible with**: Node.js 14+, Express 4.18+, SQLite3
