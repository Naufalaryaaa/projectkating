# Quick Start: RAG System for DigiMax Livechat

Get your RAG system up and running in 5 minutes!

## Prerequisites Check

```bash
# Check Node.js
node --version    # Should be 14+

# Check npm
npm --version     # Should be 6+
```

## Step 1: Install Ollama (One-time setup)

### macOS / Linux / Windows
Download from: **https://ollama.ai**

### Verify Installation
```bash
ollama --version
```

## Step 2: Start Ollama Service

```bash
ollama serve
```

Keep this terminal open. You should see:
```
Listening on 127.0.0.1:11434
```

## Step 3: Pull Models (One-time setup)

In a new terminal:

```bash
# Essential: Embeddings model
ollama pull mistral-embed

# Essential: LLM model (choose one)
ollama pull mistral        # Recommended

# Optional alternatives
# ollama pull neural-chat  # Faster, lighter
```

This takes 5-10 minutes depending on your internet. Wait for completion.

## Step 4: Install Dependencies

```bash
cd livechat
npm install
```

## Step 5: Seed Knowledge Base

```bash
node scripts/seedKnowledgeBase.js
```

Expected output:
```
✅ Successfully added 10 documents to knowledge base!
```

## Step 6: Start Application

```bash
npm start
```

You should see:
```
🚀 DigiMax Live Chat System running on port 3000
✅ Ollama service is running
📚 Knowledge base: 10 documents
```

## Step 7: Test RAG System

### Option A: Using cURL

```bash
curl -X POST http://localhost:3000/api/rag/query \
  -H "Content-Type: application/json" \
  -d '{"query":"What services does DigiMax offer?"}'
```

### Option B: Using Postman

1. Open Postman
2. Create POST request to: `http://localhost:3000/api/rag/query`
3. Body (JSON):
```json
{
  "query": "Tell me about your services"
}
```
4. Send

### Option C: Using Node.js

```javascript
const axios = require('axios');

async function testRAG() {
  const response = await axios.post('http://localhost:3000/api/rag/query', {
    query: 'What is DigiMax?'
  });

  console.log('Response:', response.data.response);
  console.log('Sources:', response.data.relevantDocuments);
}

testRAG();
```

## Expected Response

```json
{
  "response": "DigiMax is a full-service digital marketing agency specializing in social media management, content creation, and brand strategy. We help businesses build their online presence and engage with their audience through multiple digital channels.",
  "relevantDocuments": [
    {
      "id": 1,
      "content": "DigiMax is a full-service digital marketing agency...",
      "category": "company",
      "similarity": 0.95
    }
  ],
  "usedRAG": true
}
```

## Common Issues & Solutions

### Issue: "Ollama server not accessible"
```
❌ Solution: Make sure Ollama is running
ollama serve
```

### Issue: "mistral-embed" not found
```
❌ Solution: Pull the model
ollama pull mistral-embed
```

### Issue: Slow responses (5+ seconds)
```
❌ Solutions:
- Use faster model: ollama pull neural-chat
- Close other applications
- Check system RAM (8GB+ recommended)
```

### Issue: Port 3000 already in use
```
❌ Solution: Change port
PORT=3001 npm start
```

## File Structure

```
livechat/
├── server/
│   ├── models/
│   │   └── database.js              # ✨ Updated with knowledge_base table
│   ├── routes/
│   │   ├── auth.js
│   │   ├── chat.js
│   │   └── rag.js                   # ✨ NEW: RAG endpoints
│   ├── utils/
│   │   ├── ollamaClient.js          # ✨ NEW: Ollama integration
│   │   └── ragModule.js             # ✨ NEW: RAG logic
│   ├── socket/
│   │   └── chatHandler.js
│   └── app.js                        # ✨ Updated with RAG routes
├── scripts/
│   └── seedKnowledgeBase.js          # ✨ NEW: Sample data
├── database/
│   └── chat.db                       # SQLite database with embeddings
├── RAG_SETUP_GUIDE.md                # ✨ NEW: Complete guide
└── QUICK_START_RAG.md                # ✨ NEW: This file
```

## What's Included

### 1. Database (SQLite)
- **Knowledge base table** with:
  - Content
  - Vector embeddings
  - Metadata
  - Category/Source
  - Timestamps

### 2. Ollama Integration
- **Embedding generation** (mistral-embed)
- **Response generation** (mistral/neural-chat)
- **Health checks**
- **Model management**

### 3. RAG Module
- **Semantic search** using cosine similarity
- **Document retrieval** (top-k matching)
- **Prompt augmentation**
- **Response generation**

### 4. API Endpoints
- `/api/rag/query` - Process query with RAG
- `/api/rag/knowledge` - Manage knowledge base
- `/api/rag/retrieve` - Debug/test retrieval
- `/api/rag/health` - System health

### 5. Sample Data
- 10 documents about DigiMax
- Multiple categories
- Different sources

## Next Steps

1. **Add Your Own Knowledge**
   ```bash
   curl -X POST http://localhost:3000/api/rag/knowledge \
     -H "Content-Type: application/json" \
     -d '{
       "content": "Your custom information here",
       "category": "services",
       "source": "manual"
     }'
   ```

2. **Integrate with Chat Handler**
   See `RAG_SETUP_GUIDE.md` for integration examples

3. **Build Admin UI**
   - Knowledge base management
   - Document editor
   - Statistics dashboard

4. **Add to Frontend**
   - Show source documents
   - Display relevance scores
   - Implement feedback

## Performance Metrics

| Operation | Time | Notes |
|-----------|------|-------|
| Generate embedding | 100-300ms | Per query |
| Semantic search | 10-50ms | Cosine similarity |
| Generate response | 1-5 seconds | Depends on model |
| **Total** | **1-6 seconds** | End-to-end |

## Model Options

### For Embeddings
- **mistral-embed** (1GB) - Recommended ✅
- nomic-embed-text (275MB) - Lighter

### For Generation
- **mistral** (4GB) - Best balance ✅
- neural-chat (3GB) - Faster
- dolphin-mixtral (26GB) - Most powerful
- tinyllama (636MB) - Lightest

## Troubleshooting Checklist

- [ ] Ollama service running (`ollama serve`)
- [ ] Models pulled (`ollama pull mistral-embed mistral`)
- [ ] Dependencies installed (`npm install`)
- [ ] Database exists (`database/chat.db`)
- [ ] Knowledge base seeded (`node scripts/seedKnowledgeBase.js`)
- [ ] Server started (`npm start`)
- [ ] Health check passes (`/api/rag/health`)

## Testing Queries

Try these to verify RAG is working:

```bash
# Test 1: Company info
curl -X POST http://localhost:3000/api/rag/query \
  -H "Content-Type: application/json" \
  -d '{"query":"Tell me about DigiMax"}'

# Test 2: Services
curl -X POST http://localhost:3000/api/rag/query \
  -H "Content-Type: application/json" \
  -d '{"query":"What services do you provide?"}'

# Test 3: Contact
curl -X POST http://localhost:3000/api/rag/query \
  -H "Content-Type: application/json" \
  -d '{"query":"How can I contact you?"}'

# Test 4: Pricing
curl -X POST http://localhost:3000/api/rag/query \
  -H "Content-Type: application/json" \
  -d '{"query":"What are your prices?"}'
```

## Key Technologies

| Component | Tech | Purpose |
|-----------|------|---------|
| **Embeddings** | Ollama + mistral-embed | Convert text to vectors |
| **LLM** | Ollama + mistral | Generate responses |
| **Search** | Cosine Similarity | Find relevant documents |
| **Database** | SQLite3 | Store embeddings |
| **API** | Express.js | Expose RAG endpoints |

## System Requirements

- **CPU**: 2+ cores recommended
- **RAM**: 4GB+ (8GB+ for better performance)
- **Storage**: 10GB free (for models)
- **Network**: Internet (for model download)

## Additional Resources

- **Full Guide**: See `RAG_SETUP_GUIDE.md`
- **Ollama Docs**: https://ollama.ai
- **RAG Concept**: https://arxiv.org/abs/2005.11401
- **Semantic Search**: Learn about vector similarity search

---

**Ready to go!** 🚀

If you hit issues, check the Troubleshooting section or see `RAG_SETUP_GUIDE.md` for detailed solutions.
