/**
 * Knowledge Base Seeder
 * Run this script to populate the knowledge base with sample data
 * Usage: node scripts/seedKnowledgeBase.js
 */

const Database = require('../server/models/database');
const RAGModule = require('../server/utils/ragModule');

// Sample knowledge base documents
const sampleDocuments = [
    {
        content: 'DigiMax is a full-service digital marketing agency specializing in social media management, content creation, and brand strategy. We help businesses build their online presence and engage with their audience through multiple digital channels.',
        category: 'company',
        source: 'manual',
        metadata: { type: 'company_info' }
    },
    {
        content: 'Our social media management services include content planning, posting, community engagement, and analytics reporting. We manage platforms like Facebook, Instagram, TikTok, LinkedIn, and Twitter to maximize your brand visibility and engagement.',
        category: 'services',
        source: 'manual',
        metadata: { service: 'social_media_management' }
    },
    {
        content: 'Content creation is at the heart of digital marketing. We produce high-quality graphics, videos, blog posts, and copywriting tailored to your brand voice and target audience. Our creative team stays updated with the latest trends.',
        category: 'services',
        source: 'manual',
        metadata: { service: 'content_creation' }
    },
    {
        content: 'Brand strategy involves positioning your company in the market, identifying your unique value proposition, and creating a consistent brand identity across all touchpoints. We work with you to develop a comprehensive strategy that resonates with your audience.',
        category: 'services',
        source: 'manual',
        metadata: { service: 'brand_strategy' }
    },
    {
        content: 'Our pricing is competitive and flexible. We offer service packages for startups, small businesses, and enterprises. Custom packages are available based on your specific needs and budget. Contact our sales team for a detailed quote.',
        category: 'pricing',
        source: 'manual',
        metadata: { type: 'pricing_info' }
    },
    {
        content: 'DigiMax has worked with over 200 brands across various industries including e-commerce, technology, healthcare, and hospitality. Our portfolio includes successful campaigns that increased engagement by up to 300% and generated millions in revenue.',
        category: 'portfolio',
        source: 'manual',
        metadata: { type: 'success_stories' }
    },
    {
        content: 'To contact our team, email us at info@digimax.com or call +1-800-DIGIMAX. You can also fill out the contact form on our website or schedule a free consultation with our strategy team.',
        category: 'contact',
        source: 'manual',
        metadata: { type: 'contact_info' }
    },
    {
        content: 'Digital marketing ROI depends on various factors including your industry, target audience, budget, and campaign strategy. On average, well-executed digital marketing campaigns return $3-$5 for every $1 spent. We focus on measurable results and continuous optimization.',
        category: 'faq',
        source: 'manual',
        metadata: { type: 'return_on_investment' }
    },
    {
        content: 'Social media trends in 2024 include short-form video content dominance (TikTok, Reels, Shorts), AI-powered personalization, authentic storytelling, community building, and interactive content like polls and quizzes. Staying ahead of trends is crucial for brand relevance.',
        category: 'insights',
        source: 'manual',
        metadata: { type: 'market_trends' }
    },
    {
        content: 'Analytics and measurement are essential for understanding campaign performance. We track key metrics like engagement rate, reach, impressions, click-through rate, conversion rate, and ROI. Our dashboards provide real-time visibility into your campaign performance.',
        category: 'services',
        source: 'manual',
        metadata: { service: 'analytics' }
    }
];

async function seedKnowledgeBase() {
    console.log('\n🌱 Starting Knowledge Base Seeder...\n');

    const db = new Database();

    // Wait for database initialization
    setTimeout(async () => {
        try {
            const rag = new RAGModule(db);

            // Check Ollama health first
            console.log('🔍 Checking Ollama service...');
            const ollamaHealth = await rag.ollama.healthCheck();

            if (ollamaHealth.status !== 'ok') {
                console.error('❌ Ollama service is not running!');
                console.error('Please start Ollama with: ollama serve');
                console.error('Then pull the required models:');
                console.error('  ollama pull mistral-embed');
                console.error('  ollama pull mistral');
                process.exit(1);
            }

            console.log('✅ Ollama service is running');
            console.log(`📦 Available models: ${ollamaHealth.models.join(', ')}\n`);

            // Seed documents
            console.log(`📚 Seeding ${sampleDocuments.length} documents...\n`);

            const results = await rag.bulkAddToKnowledgeBase(sampleDocuments);

            if (results.success) {
                console.log(`✅ Successfully added ${results.count} documents to knowledge base!\n`);

                // Get and display stats
                rag.getKnowledgeBaseStats((err, stats) => {
                    if (!err) {
                        console.log('📊 Knowledge Base Statistics:');
                        console.log(`   Total documents: ${stats.totalDocuments}`);
                        console.log(`   By category:`, stats.byCategory);
                        console.log(`   By source:`, stats.bySources);
                    }

                    console.log('\n✨ Seeding completed successfully!');
                    console.log('\n💡 Test the RAG system with:');
                    console.log('   curl -X POST http://localhost:3000/api/rag/query \\');
                    console.log('     -H "Content-Type: application/json" \\');
                    console.log('     -d \'{"query":"What services does DigiMax offer?"}\'\n');

                    db.close();
                });
            }
        } catch (error) {
            console.error('❌ Error seeding knowledge base:', error);
            db.close();
            process.exit(1);
        }
    }, 1000);
}

// Run seeder
seedKnowledgeBase();
