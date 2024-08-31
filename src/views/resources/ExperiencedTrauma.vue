<template>
    <div class="support-resource-view">
        <h2>Experienced Trauma</h2>

        <!-- Your existing content here -->

        <div class="rating-section">
            <h3>Rate this Resource</h3>
            <p-rating v-model="userRating" :cancel="false"></p-rating>
            <button @click="submitRating" :disabled="!userRating">Submit Rating</button>
            <p v-if="ratingSubmitted">Thank you for your feedback!</p>

            <div class="overall-rating">
                <h4>Overall Rating</h4>
                <p-rating :value="computedAverageRating" :readonly="true" :stars="5" :cancel="false"></p-rating>
                <p>{{ computedAverageRating.toFixed(2) }} out of 5 ({{ totalRatings }} ratings)</p>
            </div>
        </div>
    </div>
</template>

<script>
import Rating from 'primevue/rating';

export default {
    components: {
        'p-rating': Rating
    },
    data() {
        return {
            userRating: null, // The user's selected rating
            totalRatings: 20, // Initial total ratings count
            totalRatingSum: 4.2 * 20, // Initial sum of all ratings (averageRating * totalRatings)
            ratingSubmitted: false // Flag to show the thank you message
        };
    },
    computed: {
        computedAverageRating() {
            return this.totalRatings ? this.totalRatingSum / this.totalRatings : 0;
        }
    },
    methods: {
        submitRating() {
            if (this.userRating !== null) {
                // Update the total sum of all ratings
                this.totalRatingSum += this.userRating;

                // Increment total ratings count
                this.totalRatings += 1;

                // Mark as submitted to show the thank you message
                this.ratingSubmitted = true;

                // Optionally, send this.userRating to the server to update the database
            }
        }
    }
};
</script>

<style scoped>
.support-resource-view {
    padding: 20px;
}

.rating-section {
    margin-top: 30px;
}

p {
    margin: 10px 0;
}

.overall-rating {
    margin-top: 20px;
    border-top: 1px solid #ccc;
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
</style>
