# 🚀 START HERE - RAG System Quick Guide

Welcome! Your DigiMax livechat now has a complete RAG system. Here's how to get started.

## What is RAG?

**RAG** = Retrieval Augmented Generation

Your chatbot can now:
1. **Search** your knowledge base for relevant information
2. **Use that context** to generate accurate responses
3. **Answer questions** based on YOUR specific business knowledge

## Prerequisites (5 minutes)

You need **Ollama** - a free tool that runs AI models locally.

### Download Ollama
Go to: **https://ollama.ai** and download for your OS

### Verify Installation
```bash
ollama --version
```

## Setup (15 minutes total)

### Step 1: Start Ollama (in a separate terminal)
```bash
ollama serve
```

Keep this running. You should see: `Listening on 127.0.0.1:11434`

### Step 2: Pull the AI Models (5-10 minutes)

In a **new terminal**, pull the required models:

```bash
# Essential - Converts text to vectors
ollama pull mistral-embed

# Essential - Generates responses
ollama pull mistral
```

This downloads ~5GB of files. Wait for completion.

### Step 3: Install Dependencies (1 minute)

```bash
cd /home/ayam/Documents/porto/livechat
npm install
```

### Step 4: Seed Sample Data (1 minute)

```bash
node scripts/seedKnowledgeBase.js
```

You should see:
```
✅ Successfully added 10 documents to knowledge base!
```

### Step 5: Start Your Server

```bash
npm start
```

You should see:
```
🚀 DigiMax Live Chat System running on port 3000
```

## Test It (1 minute)

### Option A: Using cURL
```bash
curl -X POST http://localhost:3000/api/rag/query \
  -H "Content-Type: application/json" \
  -d '{"query":"What services does DigiMax offer?"}'
```

### Option B: Using Browser
Open this in your browser (replace the query):
```
http://localhost:3000/api/rag/query?query=What%20services%20do%20you%20offer?
```

### Expected Response
```json
{
  "response": "DigiMax is a full-service digital marketing agency...",
  "relevantDocuments": [
    {
      "similarity": 0.95,
      "content": "Our social media management services..."
    }
  ],
  "usedRAG": true
}
```

## What's Next?

### Option 1: Learn More
Read the documentation (in this order):

1. **[RAG_INDEX.md](./RAG_INDEX.md)** - Navigation guide
2. **[QUICK_START_RAG.md](./QUICK_START_RAG.md)** - Detailed setup
3. **[USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md)** - Code examples

### Option 2: Add Your Own Knowledge

Add documents to your knowledge base:

```bash
curl -X POST http://localhost:3000/api/rag/knowledge \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Your custom information about your business",
    "category": "services",
    "source": "manual"
  }'
```

### Option 3: Integrate with Chat

Add to your chat handler to automatically respond with RAG. See `USAGE_EXAMPLES.md` for code.

## Common Issues

### "Ollama server not accessible"
- Make sure you ran `ollama serve` in another terminal
- Check: `curl http://localhost:11434/api/tags`

### "mistral-embed not found"
- Pull it: `ollama pull mistral-embed`

### "Port 3000 already in use"
- Change port: `PORT=3001 npm start`

### Slow responses (5+ seconds)
- Use faster model: `ollama pull neural-chat`
- Close other applications
- Check your RAM (8GB+ recommended)

## Documentation Files

- **RAG_INDEX.md** - Navigation & overview
- **QUICK_START_RAG.md** - Detailed setup instructions
- **RAG_SETUP_GUIDE.md** - Complete reference
- **USAGE_EXAMPLES.md** - Code examples (JavaScript, Node, Python, cURL)
- **RAG_IMPLEMENTATION_SUMMARY.md** - Technical details
- **RAG_DELIVERABLES.md** - What was delivered

## Key Endpoints

```
POST   /api/rag/query              Query with RAG
POST   /api/rag/knowledge          Add document
GET    /api/rag/knowledge          List documents
GET    /api/rag/stats              Statistics
GET    /api/rag/health             Health check
```

See `RAG_SETUP_GUIDE.md` for all 11 endpoints.

## Next Steps Checklist

- [ ] Download Ollama from https://ollama.ai
- [ ] Run `ollama serve` in background
- [ ] Pull models: `ollama pull mistral-embed mistral`
- [ ] Run `npm install` in livechat folder
- [ ] Run `node scripts/seedKnowledgeBase.js`
- [ ] Start server: `npm start`
- [ ] Test with a cURL query
- [ ] Read `RAG_SETUP_GUIDE.md` for complete guide
- [ ] Add your own documents to knowledge base
- [ ] Integrate with your chat handler

## Technology Used

| Component | Technology | Cost |
|-----------|-----------|------|
| Database | SQLite3 | Free (included) |
| Embeddings | Ollama + mistral-embed | Free |
| LLM | Ollama + mistral | Free |
| API | Express.js + Node.js | Free (included) |

**Total Cost: $0** ✅

## Performance

- Query response: 1-6 seconds total
- Embedding generation: 100-300ms
- Semantic search: 10-50ms
- LLM generation: 1-5 seconds

## Features

✅ Semantic Search
✅ Vector Embeddings
✅ Knowledge Management
✅ LLM Integration
✅ Metadata Support
✅ Bulk Operations
✅ Category Filtering
✅ Statistics & Analytics
✅ Health Monitoring
✅ Admin Authentication
✅ Error Handling
✅ Fully Documented

## Architecture

```
Your Chat App
    ↓
Express Server
    ├─ Chat Routes
    ├─ Auth Routes
    ├─ RAG Routes ← NEW!
    └─ Socket.io
        ↓
    SQLite Database
        ├─ Users
        ├─ Conversations
        ├─ Messages
        └─ Knowledge Base + Embeddings ← NEW!
            ↓
        Ollama (Local AI)
        ├─ mistral-embed (embeddings)
        └─ mistral (LLM)
```

## Troubleshooting

**Problem**: Connection refused to Ollama
**Solution**: Start Ollama with `ollama serve`

**Problem**: Out of memory
**Solution**: Close other apps, use lighter model

**Problem**: Slow responses
**Solution**: Use neural-chat, reduce topK value

See `RAG_SETUP_GUIDE.md` for more troubleshooting.

## Getting Help

1. **Quick setup?** → Read `QUICK_START_RAG.md`
2. **Code examples?** → Read `USAGE_EXAMPLES.md`
3. **Complete reference?** → Read `RAG_SETUP_GUIDE.md`
4. **Technical details?** → Read `RAG_IMPLEMENTATION_SUMMARY.md`
5. **Troubleshooting?** → Check `RAG_SETUP_GUIDE.md` Troubleshooting section

## Ready to Go!

You now have everything you need:
- ✅ Complete RAG system
- ✅ Free AI models
- ✅ Local database
- ✅ REST API
- ✅ Sample data
- ✅ Documentation
- ✅ Code examples

**Time to get running: ~20 minutes**
**Cost: $0**

Happy building! 🚀

---

**Next:** Open `RAG_SETUP_GUIDE.md` or `QUICK_START_RAG.md` to continue.
