<template>
    <div class="support-resource-view container mt-5">
        <!-- Title and Rating Section -->
        <div class="header-section">
            <div class="title-rating">
                <h1>Feeling Low or Down</h1>
                <p class="subtitle">What should and shouldn't I do if I'm feeling low or down?</p>
                <button @click="exportToPDF">Export to PDF</button>

                <div class="rating-summary">
                    <div class="overall-rating">
                        <h4>Overall Rating</h4>
                        <Rating :value="computedAverageRating" :readonly="true" :stars="5" :cancel="false"></Rating>
                        <p>{{ computedAverageRating.toFixed(2) }}/5 ({{ totalRatings }} ratings)</p>
                    </div>

                    <div class="provide-rating">
                        <h3>Ratings and Reviews</h3>
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
                    <li><a href="#mindfulness-and-self-care" aria-label="Mindfulness and Self-Care">Mindfulness and
                            Self-Care</a></li>
                    <li><a href="#physical-activity-and-routine" aria-label="Physical Activity and Routine">Physical
                            Activity and Routine</a></li>
                    <li><a href="#seeking-support-and-connection" aria-label="Seeking Support and Connection">Seeking
                            Support and Connection</a></li>
                </ul>
            </div>

            <div class="content-main">
                <h2 id="mindfulness-and-self-care">Mindfulness and Self-Care</h2>
                <p>
                    When feeling low, it can be easy to neglect your own well-being. Practicing mindfulness and
                    self-care
                    can help you become more aware of your emotions without judgment, and encourage you to take small
                    steps
                    to nurture yourself. Consider activities like meditation, journaling, or simply taking a few moments
                    each
                    day to breathe deeply. These practices can be grounding and help you connect with the present
                    moment, reducing
                    feelings of overwhelm.
                </p>

                <h2 id="physical-activity-and-routine">Physical Activity and Routine</h2>
                <p>
                    Engaging in physical activity, even if it's just a short walk, can lift your mood and boost your
                    energy levels.
                    Incorporating movement into your daily routine can release endorphins, which are natural mood
                    lifters. Maintaining
                    a consistent routine, even when you don't feel like it, can provide a sense of structure and
                    normalcy, which can
                    be comforting during low periods.
                </p>

                <h2 id="seeking-support-and-connection">Seeking Support and Connection</h2>
                <p>
                    During times when you're feeling down, reaching out for support can make a big difference. Talking
                    to trusted friends,
                    family members, or mental health professionals can help you feel less isolated and provide a new
                    perspective. Remember,
                    asking for help is a sign of strength, not weakness. You don't have to face these feelings alone,
                    and there are many
                    people and resources available to support you through tough times.
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
            filename: 'FeelingLow.pdf',
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