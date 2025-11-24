const OllamaClient = require('./ollamaClient');

class RAGModule {
    constructor(db, ollamaURL = 'http://localhost:11434') {
        this.db = db;
        this.ollama = new OllamaClient(ollamaURL);
        this.embeddingModel = 'mistral-embed';
        this.generationModel = 'mistral';
        this.topK = 5; // Number of relevant documents to retrieve
    }

    /**
     * Cosine similarity between two vectors
     */
    cosineSimilarity(vectorA, vectorB) {
        if (!Array.isArray(vectorA) || !Array.isArray(vectorB)) {
            return 0;
        }

        let dotProduct = 0;
        let normA = 0;
        let normB = 0;

        for (let i = 0; i < vectorA.length; i++) {
            dotProduct += vectorA[i] * vectorB[i];
            normA += vectorA[i] * vectorA[i];
            normB += vectorB[i] * vectorB[i];
        }

        const denominator = Math.sqrt(normA) * Math.sqrt(normB);
        return denominator === 0 ? 0 : dotProduct / denominator;
    }

    /**
     * Retrieve relevant documents from knowledge base
     */
    async retrieveRelevantDocuments(query, topK = this.topK) {
        try {
            // Generate embedding for the query
            const queryEmbedding = await this.ollama.generateEmbedding(query, this.embeddingModel);

            // Get all documents with embeddings
            return new Promise((resolve, reject) => {
                this.db.getAllKnowledgeWithEmbeddings((err, documents) => {
                    if (err) {
                        return reject(new Error(`Database error: ${err.message}`));
                    }

                    if (!documents || documents.length === 0) {
                        return resolve([]);
                    }

                    // Score documents based on similarity
                    const scoredDocs = documents.map(doc => {
                        try {
                            const embedding = typeof doc.embedding === 'string'
                                ? JSON.parse(doc.embedding)
                                : doc.embedding;

                            const similarity = this.cosineSimilarity(queryEmbedding, embedding);

                            return {
                                id: doc.id,
                                content: doc.content,
                                category: doc.category,
                                similarity: similarity
                            };
                        } catch (err) {
                            console.error(`Error parsing embedding for doc ${doc.id}:`, err);
                            return {
                                id: doc.id,
                                content: doc.content,
                                category: doc.category,
                                similarity: 0
                            };
                        }
                    });

                    // Sort by similarity and get top K
                    const topDocuments = scoredDocs
                        .sort((a, b) => b.similarity - a.similarity)
                        .slice(0, topK);

                    resolve(topDocuments);
                });
            });
        } catch (error) {
            console.error('Error retrieving relevant documents:', error);
            throw error;
        }
    }

    /**
     * Build RAG prompt with context
     */
    buildRAGPrompt(userQuery, relevantDocuments) {
        let context = 'Based on the following knowledge base documents:\n\n';

        if (relevantDocuments.length > 0) {
            relevantDocuments.forEach((doc, index) => {
                context += `Document ${index + 1} (Relevance: ${(doc.similarity * 100).toFixed(1)}%):\n`;
                context += `${doc.content}\n\n`;
            });
        } else {
            context += 'No relevant documents found in the knowledge base.\n\n';
        }

        const prompt = `${context}User Question: ${userQuery}\n\nProvide a helpful and accurate answer based on the documents above. If the information is not in the documents, you may use general knowledge but indicate that.`;

        return prompt;
    }

    /**
     * Main RAG pipeline: Query -> Retrieve -> Generate
     */
    async processQuery(userQuery, useRAG = true) {
        try {
            let response = '';
            let relevantDocuments = [];

            if (useRAG) {
                // Step 1: Retrieve relevant documents
                relevantDocuments = await this.retrieveRelevantDocuments(userQuery, this.topK);

                // Step 2: Build augmented prompt
                const augmentedPrompt = this.buildRAGPrompt(userQuery, relevantDocuments);

                // Step 3: Generate response
                response = await this.ollama.generateResponse(
                    augmentedPrompt,
                    this.generationModel,
                    0.7,
                    500
                );
            } else {
                // Direct response without RAG
                response = await this.ollama.generateResponse(
                    userQuery,
                    this.generationModel,
                    0.7,
                    500
                );
            }

            return {
                response: response,
                relevantDocuments: relevantDocuments,
                usedRAG: useRAG
            };
        } catch (error) {
            console.error('Error processing query:', error);
            throw error;
        }
    }

    /**
     * Add content to knowledge base
     */
    async addToKnowledgeBase(content, metadata = {}, source = 'manual', category = 'general') {
        try {
            // Generate embedding for the content
            const embedding = await this.ollama.generateEmbedding(content, this.embeddingModel);

            // Store in database
            return new Promise((resolve, reject) => {
                this.db.addKnowledge(
                    content,
                    embedding,
                    metadata,
                    source,
                    category,
                    (err, id) => {
                        if (err) {
                            return reject(new Error(`Database error: ${err.message}`));
                        }
                        resolve({
                            id: id,
                            content: content,
                            category: category,
                            source: source
                        });
                    }
                );
            });
        } catch (error) {
            console.error('Error adding to knowledge base:', error);
            throw error;
        }
    }

    /**
     * Bulk add documents to knowledge base
     */
    async bulkAddToKnowledgeBase(documents) {
        try {
            const itemsWithEmbeddings = await Promise.all(
                documents.map(async (doc) => {
                    const embedding = await this.ollama.generateEmbedding(
                        doc.content,
                        this.embeddingModel
                    );
                    return {
                        content: doc.content,
                        embedding: embedding,
                        metadata: doc.metadata || {},
                        source: doc.source || 'bulk',
                        category: doc.category || 'general'
                    };
                })
            );

            return new Promise((resolve, reject) => {
                this.db.bulkInsertKnowledge(itemsWithEmbeddings, (err) => {
                    if (err) {
                        return reject(new Error(`Database error: ${err.message}`));
                    }
                    resolve({
                        success: true,
                        count: documents.length
                    });
                });
            });
        } catch (error) {
            console.error('Error bulk adding to knowledge base:', error);
            throw error;
        }
    }

    /**
     * Get knowledge base statistics
     */
    getKnowledgeBaseStats(callback) {
        this.db.getAllKnowledge((err, documents) => {
            if (err) {
                return callback(err, null);
            }

            const stats = {
                totalDocuments: documents.length,
                byCategory: {},
                bySources: {}
            };

            documents.forEach(doc => {
                // Count by category
                stats.byCategory[doc.category] = (stats.byCategory[doc.category] || 0) + 1;

                // Count by source
                stats.bySources[doc.source] = (stats.bySources[doc.source] || 0) + 1;
            });

            callback(null, stats);
        });
    }

    /**
     * Set custom top K value
     */
    setTopK(k) {
        this.topK = k;
    }

    /**
     * Change the generation model
     */
    setGenerationModel(modelName) {
        this.generationModel = modelName;
    }

    /**
     * Change the embedding model
     */
    setEmbeddingModel(modelName) {
        this.embeddingModel = modelName;
    }
}

module.exports = RAGModule;
