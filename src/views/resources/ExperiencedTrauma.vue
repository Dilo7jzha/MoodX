<template>
    <div class="support-resource-view container mt-5">
        <!-- Title and Rating Section -->
        <div class="header-section">
            <div class="title-rating">
                <h1>Experiencing Trauma</h1>
                <p class="subtitle">What should and shouldn't I do if I'm experiencing trauma?</p>
                <button @click="exportToPDF">Export to PDF</button>

                <div class="rating-summary">
                    <div class="overall-rating">
                        <h4>Overall Rating</h4>
                        <Rating :value="computedAverageRating" :readonly="true" :stars="5" :cancel="false"></Rating>
                        <p>{{ computedAverageRating.toFixed(2) }}/5 ({{ totalRatings }} ratings)</p>
                    </div>

                    <div class="provide-rating">
                        <h3>Ratings and reviews</h3>
                        <Rating v-model="userRating" :cancel="false"></Rating>
                        <button @click="submitRating" :disabled="!userRating">Submit Rating</button>
                    </div>
                </div>
            </div>

            <div class="image-placeholder">
                <div class="image-box"></div>
            </div>
        </div>

        <!-- Main Content Section -->
        <div ref="contentToExport" class="content-section">
            <div class="content-sidebar">
                <h4>Content</h4>
                <ul>
                    <li><a href="#processing-your-emotions" aria-label="Processing Your Emotions">Processing Your
                            Emotions</a></li>
                    <li><a href="#self-care-techniques" aria-label="Self-Care Techniques">Self-Care Techniques</a></li>
                    <li><a href="#seeking-support-and-connection" aria-label="Seeking Support and Connection">Seeking
                            Support and Connection</a></li>
                </ul>
            </div>

            <div class="content-main">
                <h2 id="processing-your-emotions">Processing Your Emotions</h2>
                <p>
                    Experiencing trauma can lead to a wide range of intense emotions, from fear and anger to sadness and
                    confusion. It's important to allow yourself to feel and process these emotions without judgment.
                    Give yourself permission to grieve, to be upset, or to feel whatever comes naturally. Writing in a
                    journal can be a helpful way to articulate what you're feeling, providing a safe space to explore
                    your thoughts. Remember, there's no "right" way to respond to trauma—everyone's emotional journey is
                    unique.

                    Talking about your experience with someone you trust can also be part of the healing process.
                    Whether it's a close friend, family member, or support group, sharing your story can reduce the
                    isolation often felt after trauma. However, take things at your own pace; only share what you're
                    comfortable with, and be mindful of your boundaries.
                </p>

                <h2 id="self-care-techniques">Self-Care Techniques</h2>
                <p>
                    After trauma, it's essential to prioritize self-care to help stabilize and calm your mind and body.
                    Practicing grounding techniques, such as deep breathing, mindfulness meditation, or focusing on your
                    five senses, can help you stay connected to the present moment and reduce feelings of being
                    overwhelmed. These practices can be especially helpful during moments of anxiety or flashbacks,
                    providing a sense of control and safety.

                    In addition to grounding, regular self-care routines like getting enough sleep, eating nourishing
                    foods, and engaging in gentle physical activity can support your overall recovery. Creating a
                    routine that includes relaxation activities—such as taking a warm bath, reading a book, or spending
                    time in nature—can help rebuild a sense of normalcy and well-being. Be kind to yourself during this
                    time and recognize that healing is a gradual process.
                </p>

                <h2 id="seeking-support-and-connection">Seeking Support and Connection</h2>
                <p>
                    Healing from trauma often requires professional support. Therapists trained in trauma recovery, such
                    as those specializing in Cognitive Behavioral Therapy (CBT), Eye Movement Desensitization and
                    Reprocessing (EMDR), or trauma-focused therapy, can provide you with tools and strategies to manage
                    symptoms and work through your experience. Seeking professional help is a sign of strength, and
                    these experts can guide you through the complex emotions and memories associated with trauma.

                    In addition to therapy, consider joining a support group for individuals who have experienced
                    similar traumas. Connecting with others who understand what you're going through can be incredibly
                    validating and can provide a sense of community. Online forums or in-person groups can offer a space
                    to share your story, learn from others, and gain insights that can aid in your healing journey.
                    Remember, you don't have to go through this alone—there is help available, and you deserve support.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Rating from 'primevue/rating';
import html2pdf from 'html2pdf.js';
const contentToExport = ref(null);

// Define variables
const userRating = ref(null); // The user's selected rating
const totalRatings = ref(20); // Initial total ratings count
const totalRatingSum = ref(4.2 * 20); // Initial sum of all ratings (averageRating * totalRatings)
const ratingSubmitted = ref(false); // Flag to show the thank you message

// Computed property for average rating
const computedAverageRating = computed(() => {
    return totalRatings.value ? totalRatingSum.value / totalRatings.value : 0;
});

// Function to submit the rating
const submitRating = () => {
    if (userRating.value !== null) {
        // Update the total sum of all ratings
        totalRatingSum.value += userRating.value;

        // Increment total ratings count
        totalRatings.value += 1;

        // Mark as submitted to show the thank you message
        ratingSubmitted.value = true;
        alert('Thanks for your rating!')
    }
};

const exportToPDF = () => {
    if (contentToExport.value) {
        const options = {
            margin: 1,
            filename: 'ExperiencingTrauma.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(options).from(contentToExport.value).save();
    } else {
        console.error("No content to export.");
    }
};
</script>

<style scoped>
.support-resource-view {
    padding: 20px;
}

.header-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    background-color: #c4e1ff;
    border-radius: 20px;
    padding: 30px;
}

.title-rating {
    flex: 1;
}

h1 {
    margin: 0;
    font-size: 2rem;
}

.subtitle {
    margin: 10px 0;
    font-size: 1.1rem;
    color: #666;
}

.rating-summary {
    margin-top: 20px;
}

.rating-details {
    display: flex;
    align-items: center;
}

.rating-value {
    font-size: 1.5rem;
    font-weight: bold;
    margin-left: 10px;
}

.review-count {
    margin-left: 10px;
    color: #007bff;
    cursor: pointer;
}

.image-placeholder {
    flex: 0 0 250px;
    margin-left: 20px;
}

.image-box {
    width: 100%;
    height: 100%;
    background-image: url(/src/assets/img/stressed.png);
    background-size: 100%;
    background-repeat: no-repeat;
}

.content-section {
    display: flex;
    margin-bottom: 30px;
}

.content-sidebar {
    flex: 0 0 200px;
    margin-right: 20px;
}

.content-sidebar ul {
    list-style: none;
    padding: 0;
}

.content-sidebar ul li {
    margin-bottom: 10px;
}

.content-sidebar ul li a {
    text-decoration: none;
    color: #007bff;
}

.content-sidebar ul li a:hover {
    text-decoration: underline;
}

.content-main {
    flex: 1;
    max-width: 60%;
}

p {
    margin: 10px 0;
}

.overall-rating {
    margin-top: 20px;
    padding-top: 20px;
}

button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.provide-rating {
    border-top: 1px solid #000000;
}
</style>