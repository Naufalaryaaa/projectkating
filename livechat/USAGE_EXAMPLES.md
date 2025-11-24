# RAG System - Usage Examples

Complete examples of how to use the RAG system in your application.

## Table of Contents
1. [Basic Queries](#basic-queries)
2. [Knowledge Base Management](#knowledge-base-management)
3. [Integration Examples](#integration-examples)
4. [Advanced Usage](#advanced-usage)

---

## Basic Queries

### Example 1: Simple Query

**cURL:**
```bash
curl -X POST http://localhost:3000/api/rag/query \
  -H "Content-Type: application/json" \
  -d '{"query":"What is DigiMax?"}'
```

**Node.js:**
```javascript
const axios = require('axios');

async function askQuestion(question) {
  try {
    const response = await axios.post('http://localhost:3000/api/rag/query', {
      query: question
    });

    console.log('Answer:', response.data.response);
    console.log('Sources:', response.data.relevantDocuments);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

askQuestion('What services do you offer?');
```

**JavaScript (Browser):**
```javascript
async function queryRAG(userQuestion) {
  const response = await fetch('http://localhost:3000/api/rag/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: userQuestion })
  });

  const data = await response.json();

  document.getElementById('answer').textContent = data.response;

  // Show sources
  const sourcesList = data.relevantDocuments
    .map(doc => `<li>${doc.content.substring(0, 100)}... (${(doc.similarity*100).toFixed(1)}%)</li>`)
    .join('');
  document.getElementById('sources').innerHTML = `<ul>${sourcesList}</ul>`;
}

// Usage
document.getElementById('askBtn').onclick = () => {
  const question = document.getElementById('question').value;
  queryRAG(question);
};
```

**Python:**
```python
import requests

def ask_rag(question):
    response = requests.post(
        'http://localhost:3000/api/rag/query',
        json={'query': question}
    )

    result = response.json()
    print(f"Answer: {result['response']}")
    print(f"Sources: {len(result['relevantDocuments'])} documents")

ask_rag('Tell me about your pricing')
```

### Example 2: Query Without RAG

For comparison or when you want direct LLM response:

```javascript
// This queries the LLM without knowledge base context
const response = await fetch('http://localhost:3000/api/rag/query', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'What is digital marketing?',
    useRAG: false  // Disable RAG
  })
});
```

---

## Knowledge Base Management

### Example 1: Add Single Document

**cURL (Admin required):**
```bash
curl -X POST http://localhost:3000/api/rag/knowledge \
  -H "Content-Type: application/json" \
  -d '{
    "content": "DigiMax was founded in 2020 and has grown to serve 200+ clients worldwide. Our mission is to help businesses succeed in the digital age through innovative marketing strategies.",
    "category": "company",
    "source": "company_history",
    "metadata": {
      "author": "John Smith",
      "last_updated": "2024-01-15",
      "version": "1.0"
    }
  }'
```

**Node.js:**
```javascript
const axios = require('axios');

async function addToKnowledgeBase(content, category) {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/rag/knowledge',
      {
        content: content,
        category: category,
        source: 'manual',
        metadata: { createdBy: 'admin' }
      },
      {
        headers: { /* include auth headers */ }
      }
    );

    console.log('Document added:', response.data.data.id);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

addToKnowledgeBase(
  'Our team specializes in Instagram marketing',
  'services'
);
```

### Example 2: Bulk Add Documents

**cURL:**
```bash
curl -X POST http://localhost:3000/api/rag/knowledge/bulk \
  -H "Content-Type: application/json" \
  -d '{
    "documents": [
      {
        "content": "Social media management includes content planning, posting, and community engagement",
        "category": "services",
        "source": "service_docs"
      },
      {
        "content": "We offer 24/7 customer support via chat, email, and phone",
        "category": "support",
        "source": "service_docs"
      },
      {
        "content": "Our pricing starts at $500/month for basic social media management",
        "category": "pricing",
        "source": "pricing_docs"
      }
    ]
  }'
```

**JavaScript:**
```javascript
async function bulkAddDocuments(documents) {
  const response = await fetch('http://localhost:3000/api/rag/knowledge/bulk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ documents })
  });

  const result = await response.json();
  console.log(`Added ${result.data.count} documents`);
  return result;
}

const docs = [
  {
    content: 'TikTok is our fastest growing platform for brand awareness',
    category: 'insights'
  },
  {
    content: 'Video content sees 80% higher engagement than static posts',
    category: 'insights'
  },
  {
    content: 'Average response time to customer inquiries is 2 hours',
    category: 'company'
  }
];

bulkAddDocuments(docs);
```

### Example 3: List All Documents

**cURL:**
```bash
curl http://localhost:3000/api/rag/knowledge
```

**Node.js:**
```javascript
async function getKnowledgeBase() {
  const response = await axios.get('http://localhost:3000/api/rag/knowledge');

  console.log(`Total documents: ${response.data.length}`);

  response.data.forEach(doc => {
    console.log(`- ${doc.category}: ${doc.content.substring(0, 50)}...`);
  });

  return response.data;
}
```

### Example 4: Get Documents by Category

**cURL:**
```bash
curl http://localhost:3000/api/rag/knowledge/category/services
```

**JavaScript:**
```javascript
async function getServiceDocs() {
  const response = await fetch(
    'http://localhost:3000/api/rag/knowledge/category/services'
  );
  const services = await response.json();

  services.forEach(service => {
    console.log(service.content);
  });
}
```

### Example 5: Update Document

**cURL:**
```bash
curl -X PUT http://localhost:3000/api/rag/knowledge/3 \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Updated pricing: Our plans now start at $450/month",
    "category": "pricing"
  }'
```

**Node.js:**
```javascript
async function updateDocument(id, newContent, category) {
  const response = await axios.put(
    `http://localhost:3000/api/rag/knowledge/${id}`,
    { content: newContent, category }
  );

  console.log('Document updated');
}

updateDocument(3, 'New content here', 'services');
```

### Example 6: Delete Document

**cURL:**
```bash
curl -X DELETE http://localhost:3000/api/rag/knowledge/3
```

**Node.js:**
```javascript
async function deleteDocument(id) {
  const response = await axios.delete(
    `http://localhost:3000/api/rag/knowledge/${id}`
  );

  console.log('Document deleted');
}
```

### Example 7: Get Statistics

**cURL:**
```bash
curl http://localhost:3000/api/rag/stats
```

**Response:**
```json
{
  "totalDocuments": 15,
  "byCategory": {
    "services": 5,
    "company": 3,
    "pricing": 2,
    "faq": 5
  },
  "bySources": {
    "manual": 10,
    "bulk": 5
  }
}
```

---

## Integration Examples

### Example 1: Chat Handler Integration

**File:** `server/socket/chatHandler.js`

```javascript
const RAGModule = require('../utils/ragModule');

class ChatHandler {
    constructor(db) {
        this.db = db;
        this.rag = new RAGModule(db);  // Initialize RAG
        // ... rest of constructor
    }

    handleConnection(socket, io) {
        socket.on('send_message', async (data) => {
            const { conversation_id, sender_id, message, is_admin } = data;

            // If user message, get AI response with RAG
            if (!is_admin) {
                try {
                    // Process with RAG
                    const aiResult = await this.rag.processQuery(message);

                    // Send AI response back to user
                    io.to(`conversation_${conversation_id}`).emit('ai_response', {
                        id: Date.now(),
                        conversation_id,
                        sender_id: 'ai_bot',
                        message: aiResult.response,
                        message_type: 'ai_response',
                        sources: aiResult.relevantDocuments,
                        created_at: new Date().toISOString()
                    });

                    console.log(`AI response sent with ${aiResult.relevantDocuments.length} sources`);
                } catch (error) {
                    console.error('RAG Error:', error);

                    // Fallback response
                    io.to(`conversation_${conversation_id}`).emit('ai_response', {
                        message: 'Sorry, I had trouble processing your request. Please try again.',
                        message_type: 'error'
                    });
                }
            }
        });
    }
}
```

### Example 2: Admin Dashboard Integration

**File:** `client/admin/rag-manager.html`

```html
<!DOCTYPE html>
<html>
<head>
    <title>Knowledge Base Manager</title>
    <style>
        .kb-manager { max-width: 1000px; margin: 0 auto; padding: 20px; }
        .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 30px; }
        .stat-card { background: #f5f5f5; padding: 15px; border-radius: 8px; }
        .stat-card h3 { margin: 0; color: #666; font-size: 14px; }
        .stat-card .number { font-size: 32px; font-weight: bold; color: #333; }
        .add-doc { background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .doc-list { list-style: none; padding: 0; }
        .doc-item { background: #fff; padding: 15px; margin-bottom: 10px; border-radius: 8px; border-left: 4px solid #0066cc; }
    </style>
</head>
<body>
    <div class="kb-manager">
        <h1>Knowledge Base Manager</h1>

        <!-- Stats -->
        <div class="stats">
            <div class="stat-card">
                <h3>Total Documents</h3>
                <div class="number" id="totalDocs">0</div>
            </div>
            <div class="stat-card">
                <h3>Categories</h3>
                <div id="categoryCount">0</div>
            </div>
            <div class="stat-card">
                <h3>Last Updated</h3>
                <div id="lastUpdated">-</div>
            </div>
        </div>

        <!-- Add New Document -->
        <div class="add-doc">
            <h2>Add New Document</h2>
            <textarea id="content" placeholder="Document content..." rows="6" style="width: 100%; padding: 10px; margin-bottom: 10px;"></textarea>
            <select id="category" style="width: 100%; padding: 10px; margin-bottom: 10px;">
                <option value="general">General</option>
                <option value="services">Services</option>
                <option value="company">Company</option>
                <option value="pricing">Pricing</option>
                <option value="faq">FAQ</option>
            </select>
            <button onclick="addDocument()" style="padding: 10px 20px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Add Document
            </button>
        </div>

        <!-- Documents List -->
        <h2>Documents</h2>
        <ul class="doc-list" id="docList"></ul>
    </div>

    <script>
        async function loadStats() {
            const response = await fetch('http://localhost:3000/api/rag/stats');
            const stats = await response.json();

            document.getElementById('totalDocs').textContent = stats.totalDocuments;
            document.getElementById('categoryCount').textContent = Object.keys(stats.byCategory).length;

            loadDocuments();
        }

        async function loadDocuments() {
            const response = await fetch('http://localhost:3000/api/rag/knowledge');
            const docs = await response.json();

            const docList = document.getElementById('docList');
            docList.innerHTML = docs.map(doc => `
                <li class="doc-item">
                    <strong>${doc.category}</strong> (${doc.source})
                    <p>${doc.content.substring(0, 100)}...</p>
                    <button onclick="deleteDoc(${doc.id})">Delete</button>
                </li>
            `).join('');
        }

        async function addDocument() {
            const content = document.getElementById('content').value;
            const category = document.getElementById('category').value;

            const response = await fetch('http://localhost:3000/api/rag/knowledge', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, category })
            });

            if (response.ok) {
                document.getElementById('content').value = '';
                loadDocuments();
                loadStats();
                alert('Document added successfully!');
            }
        }

        async function deleteDoc(id) {
            if (confirm('Delete this document?')) {
                await fetch(`http://localhost:3000/api/rag/knowledge/${id}`, {
                    method: 'DELETE'
                });
                loadDocuments();
                loadStats();
            }
        }

        // Load on page load
        loadStats();
    </script>
</body>
</html>
```

---

## Advanced Usage

### Example 1: Custom Top-K Retrieval

```javascript
const RAGModule = require('./server/utils/ragModule');
const rag = new RAGModule(db);

// Retrieve top 10 documents instead of default 5
rag.setTopK(10);

const result = await rag.processQuery('What services?');
// Will return 10 relevant documents instead of 5
```

### Example 2: Temperature Control

```javascript
// Control response creativity/randomness
// temperature: 0 = deterministic, 1 = creative

// Conservative response (fact-based)
const response1 = await rag.ollama.generateResponse(
  prompt,
  'mistral',
  0.1  // Very low temperature
);

// Creative response (more varied)
const response2 = await rag.ollama.generateResponse(
  prompt,
  'mistral',
  0.9  // High temperature
);
```

### Example 3: Custom Metadata

```javascript
async function addWithMetadata() {
  await rag.addToKnowledgeBase(
    'Our Instagram strategy focuses on short-form video content',
    {
      platform: 'instagram',
      type: 'strategy',
      author: 'marketing_team',
      version: '2.0',
      tags: ['video', 'social_media', 'engagement']
    },
    'social_strategy',
    'strategy'
  );
}
```

### Example 4: Batch Processing

```javascript
async function processManyQueries(questions) {
  const results = [];

  for (const question of questions) {
    const result = await rag.processQuery(question);
    results.push({
      question,
      answer: result.response,
      documentCount: result.relevantDocuments.length
    });
  }

  return results;
}

// Usage
const questions = [
  'What services do you offer?',
  'How much do you charge?',
  'What is your contact info?'
];

processManyQueries(questions).then(results => {
  console.log(JSON.stringify(results, null, 2));
});
```

### Example 5: Error Handling

```javascript
async function robustQuery(question) {
  try {
    // Check if Ollama is running
    const health = await rag.ollama.healthCheck();
    if (health.status !== 'ok') {
      throw new Error('Ollama service not running');
    }

    // Check if knowledge base has documents
    const kbStats = await new Promise((resolve, reject) => {
      rag.getKnowledgeBaseStats((err, stats) => {
        if (err) reject(err);
        else resolve(stats);
      });
    });

    if (kbStats.totalDocuments === 0) {
      console.warn('Knowledge base is empty');
    }

    // Process query
    const result = await rag.processQuery(question);

    if (result.relevantDocuments.length === 0) {
      console.warn('No relevant documents found');
    }

    return result;
  } catch (error) {
    console.error('Query failed:', error.message);

    // Fallback: direct LLM query without RAG
    return await rag.processQuery(question, false);
  }
}
```

---

## Testing Checklist

```bash
# 1. Start Ollama
ollama serve

# 2. Verify models are available
curl http://localhost:11434/api/tags

# 3. Seed knowledge base
node scripts/seedKnowledgeBase.js

# 4. Check health
curl http://localhost:3000/api/rag/health

# 5. Test basic query
curl -X POST http://localhost:3000/api/rag/query \
  -H "Content-Type: application/json" \
  -d '{"query":"What is DigiMax?"}'

# 6. Verify embeddings
curl http://localhost:3000/api/rag/stats

# 7. Test retrieval
curl -X POST http://localhost:3000/api/rag/retrieve \
  -H "Content-Type: application/json" \
  -d '{"query":"services", "topK":5}'
```

---

## Performance Metrics Example

```javascript
async function benchmarkRAG() {
  const query = 'What services do you offer?';
  const iterations = 5;
  const times = [];

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    await rag.processQuery(query);
    const end = performance.now();
    times.push(end - start);
  }

  const avgTime = times.reduce((a, b) => a + b) / times.length;
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);

  console.log(`Benchmark Results:`);
  console.log(`  Average: ${avgTime.toFixed(2)}ms`);
  console.log(`  Min: ${minTime.toFixed(2)}ms`);
  console.log(`  Max: ${maxTime.toFixed(2)}ms`);
}

benchmarkRAG();
```

---

This covers most common use cases! For more information, see the full documentation in `RAG_SETUP_GUIDE.md`.
