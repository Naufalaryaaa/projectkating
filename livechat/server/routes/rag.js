const express = require('express');
const router = express.Router();
const RAGModule = require('../utils/ragModule');

module.exports = (db) => {
    const rag = new RAGModule(db);

    // Middleware to check if user is authenticated admin
    const requireAdmin = (req, res, next) => {
        if (req.session.user && req.session.user.is_admin) {
            next();
        } else {
            res.status(401).json({ error: 'Admin access required' });
        }
    };

    /**
     * Process user query with RAG
     * POST /api/rag/query
     */
    router.post('/query', async (req, res) => {
        try {
            const { query, useRAG = true } = req.body;

            if (!query || query.trim() === '') {
                return res.status(400).json({ error: 'Query cannot be empty' });
            }

            const result = await rag.processQuery(query, useRAG);
            res.json(result);
        } catch (error) {
            console.error('RAG Query Error:', error);
            res.status(500).json({
                error: 'Failed to process query',
                message: error.message
            });
        }
    });

    /**
     * Add content to knowledge base
     * POST /api/rag/knowledge
     */
    router.post('/knowledge', requireAdmin, async (req, res) => {
        try {
            const { content, metadata = {}, source = 'manual', category = 'general' } = req.body;

            if (!content || content.trim() === '') {
                return res.status(400).json({ error: 'Content cannot be empty' });
            }

            const result = await rag.addToKnowledgeBase(content, metadata, source, category);
            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            console.error('Add Knowledge Error:', error);
            res.status(500).json({
                error: 'Failed to add knowledge',
                message: error.message
            });
        }
    });

    /**
     * Bulk add documents to knowledge base
     * POST /api/rag/knowledge/bulk
     */
    router.post('/knowledge/bulk', requireAdmin, async (req, res) => {
        try {
            const { documents } = req.body;

            if (!Array.isArray(documents) || documents.length === 0) {
                return res.status(400).json({ error: 'Documents array required and cannot be empty' });
            }

            // Validate each document
            for (let doc of documents) {
                if (!doc.content || doc.content.trim() === '') {
                    return res.status(400).json({ error: 'Each document must have non-empty content' });
                }
            }

            const result = await rag.bulkAddToKnowledgeBase(documents);
            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            console.error('Bulk Add Knowledge Error:', error);
            res.status(500).json({
                error: 'Failed to bulk add knowledge',
                message: error.message
            });
        }
    });

    /**
     * Get all knowledge base documents
     * GET /api/rag/knowledge
     */
    router.get('/knowledge', requireAdmin, (req, res) => {
        db.getAllKnowledge((err, documents) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            // Return without embeddings for API response
            const cleanDocs = documents.map(doc => ({
                id: doc.id,
                content: doc.content,
                category: doc.category,
                source: doc.source,
                created_at: doc.created_at
            }));

            res.json(cleanDocs);
        });
    });

    /**
     * Get knowledge by category
     * GET /api/rag/knowledge/category/:category
     */
    router.get('/knowledge/category/:category', requireAdmin, (req, res) => {
        const { category } = req.params;

        db.getKnowledgeByCategory(category, (err, documents) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            const cleanDocs = documents.map(doc => ({
                id: doc.id,
                content: doc.content,
                category: doc.category,
                source: doc.source
            }));

            res.json(cleanDocs);
        });
    });

    /**
     * Get specific knowledge document
     * GET /api/rag/knowledge/:id
     */
    router.get('/knowledge/:id', requireAdmin, (req, res) => {
        const { id } = req.params;

        db.getKnowledge(id, (err, document) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (!document) {
                return res.status(404).json({ error: 'Document not found' });
            }

            // Return without embedding for security
            const cleanDoc = {
                id: document.id,
                content: document.content,
                category: document.category,
                source: document.source,
                created_at: document.created_at,
                updated_at: document.updated_at
            };

            res.json(cleanDoc);
        });
    });

    /**
     * Update knowledge document
     * PUT /api/rag/knowledge/:id
     */
    router.put('/knowledge/:id', requireAdmin, async (req, res) => {
        try {
            const { id } = req.params;
            const { content, category = 'general' } = req.body;

            if (!content || content.trim() === '') {
                return res.status(400).json({ error: 'Content cannot be empty' });
            }

            // Generate new embedding for updated content
            const embedding = await rag.ollama.generateEmbedding(content, rag.embeddingModel);

            db.updateKnowledge(id, content, embedding, category, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }

                res.json({
                    success: true,
                    message: 'Knowledge updated successfully'
                });
            });
        } catch (error) {
            console.error('Update Knowledge Error:', error);
            res.status(500).json({
                error: 'Failed to update knowledge',
                message: error.message
            });
        }
    });

    /**
     * Delete knowledge document
     * DELETE /api/rag/knowledge/:id
     */
    router.delete('/knowledge/:id', requireAdmin, (req, res) => {
        const { id } = req.params;

        db.deleteKnowledge(id, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            res.json({
                success: true,
                message: 'Knowledge deleted successfully'
            });
        });
    });

    /**
     * Get knowledge base statistics
     * GET /api/rag/stats
     */
    router.get('/stats', requireAdmin, (req, res) => {
        rag.getKnowledgeBaseStats((err, stats) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to get stats' });
            }

            res.json(stats);
        });
    });

    /**
     * Health check for Ollama and RAG system
     * GET /api/rag/health
     */
    router.get('/health', async (req, res) => {
        try {
            const ollamaHealth = await rag.ollama.healthCheck();

            db.getAllKnowledge((err, documents) => {
                const knowledgeBaseStatus = !err ? 'ok' : 'error';
                const documentCount = !err ? documents.length : 0;

                res.json({
                    status: 'ok',
                    ollama: ollamaHealth,
                    knowledgeBase: {
                        status: knowledgeBaseStatus,
                        documentCount: documentCount
                    }
                });
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    });

    /**
     * Retrieve documents relevant to a query (for debugging/UI)
     * POST /api/rag/retrieve
     */
    router.post('/retrieve', async (req, res) => {
        try {
            const { query, topK = 5 } = req.body;

            if (!query || query.trim() === '') {
                return res.status(400).json({ error: 'Query cannot be empty' });
            }

            const relevantDocs = await rag.retrieveRelevantDocuments(query, topK);
            res.json({
                query: query,
                results: relevantDocs
            });
        } catch (error) {
            console.error('Retrieve Error:', error);
            res.status(500).json({
                error: 'Failed to retrieve documents',
                message: error.message
            });
        }
    });

    return router;
};
