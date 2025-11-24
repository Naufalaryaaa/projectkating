const axios = require('axios');

class OllamaClient {
    constructor(baseURL = 'http://localhost:11434') {
        this.baseURL = baseURL;
        this.client = axios.create({
            baseURL: this.baseURL,
            timeout: 60000
        });
    }

    /**
     * Generate embeddings for text using Ollama
     * Models: mistral-embed (recommended), nomic-embed-text, etc.
     */
    async generateEmbedding(text, model = 'mistral-embed') {
        try {
            const response = await this.client.post('/api/embeddings', {
                model: model,
                prompt: text
            });

            if (response.data && response.data.embedding) {
                return response.data.embedding;
            } else {
                throw new Error('No embedding returned from Ollama');
            }
        } catch (error) {
            console.error('Error generating embedding:', error.message);
            throw new Error(`Failed to generate embedding: ${error.message}`);
        }
    }

    /**
     * Generate text response using Ollama LLM
     * Models: mistral, neural-chat, dolphin-mixtral, etc.
     */
    async generateResponse(prompt, model = 'mistral', temperature = 0.7, maxTokens = 500) {
        try {
            const response = await this.client.post('/api/generate', {
                model: model,
                prompt: prompt,
                stream: false,
                temperature: temperature,
                top_p: 0.9,
                top_k: 40,
                num_predict: maxTokens
            });

            if (response.data && response.data.response) {
                return response.data.response.trim();
            } else {
                throw new Error('No response returned from Ollama');
            }
        } catch (error) {
            console.error('Error generating response:', error.message);
            throw new Error(`Failed to generate response: ${error.message}`);
        }
    }

    /**
     * Check if Ollama server is running
     */
    async healthCheck() {
        try {
            const response = await this.client.get('/api/tags');
            return {
                status: 'ok',
                models: response.data.models ? response.data.models.map(m => m.name) : []
            };
        } catch (error) {
            return {
                status: 'error',
                message: `Ollama server not accessible: ${error.message}`
            };
        }
    }

    /**
     * Pull a model from Ollama registry
     */
    async pullModel(modelName) {
        try {
            await this.client.post('/api/pull', {
                name: modelName,
                stream: false
            });
            return { success: true, message: `Model ${modelName} pulled successfully` };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Stream generation for real-time responses
     */
    async generateResponseStream(prompt, model = 'mistral', temperature = 0.7) {
        try {
            const response = await this.client.post('/api/generate', {
                model: model,
                prompt: prompt,
                stream: true,
                temperature: temperature,
                top_p: 0.9,
                top_k: 40
            });

            return response.data;
        } catch (error) {
            console.error('Error generating response stream:', error.message);
            throw new Error(`Failed to generate response stream: ${error.message}`);
        }
    }
}

module.exports = OllamaClient;
