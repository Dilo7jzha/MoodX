<template>
    <div class="support-resource-view container mt-5">
        <!-- Title and Rating Section -->
        <div class="header-section">
            <div class="title-rating">
                <h1>Feeling Stressed</h1>
                <p class="subtitle">What should and shouldn't I do if I'm feeling stressed?</p>

                <div class="rating-summary">
                    <div class="overall-rating">
                        <h4>Overall Rating</h4>
                        <p-rating :value="computedAverageRating" :readonly="true" :stars="5" :cancel="false"></p-rating>
                        <p>{{ computedAverageRating.toFixed(2) }}/5 ({{ totalRatings }} ratings)</p>
                    </div>

                    <div class="provide-rating">
                        <h3>Ratings and reviews</h3>
                        <p-rating v-model="userRating" :cancel="false"></p-rating>
                        <button @click="submitRating" :disabled="!userRating">Submit Rating</button>
                    </div>
                </div>
            </div>

            <div class="image-placeholder">
                <div class="image-box"></div>
            </div>
        </div>

        <!-- Main Content Section -->
        <div class="content-section">
            <div class="content-sidebar">
                <h4>Content</h4>
                <ul>
                    <li><a href="#understanding-stress">Understanding stress</a></li>
                    <li><a href="#feelings-effects">Feelings & effects</a></li>
                    <li><a href="#tips-manage-stress">Tips to manage stress</a></li>
                </ul>
            </div>

            <div class="content-main">
                <h2 id="understanding-stress">Understanding stress</h2>
                <p>
                    Stress is a natural response to the challenges and demands of life. It's a feeling that everyone
                    encounters at various points, and it's important to understand that you're not alone in this
                    experience. Whether it's the pressure of work, relationships, or unexpected life events, stress can
                    sometimes feel overwhelming. However, it's crucial to remember that stress is not something you have
                    to face alone.

                    Understanding the root causes of your stress is the first step toward managing it effectively. By
                    identifying the triggers, whether they are external, like work deadlines or personal issues, or
                    internal, like perfectionism or self-doubt, you can begin to take control. Stress management
                    involves exploring techniques and strategies that work for you, such as relaxation methods, time
                    management skills, or seeking support from friends, family, or professionals. Together, we can
                    navigate through these challenging times, helping you regain a sense of balance and control in your
                    life.
                </p>

                <h2 id="feelings-effects">Feelings & effects</h2>
                <p>
                    When you're under stress, your body and mind respond in ways that can impact your overall
                    well-being. Emotionally, you might feel overwhelmed, anxious, or even irritable. These feelings can
                    surface when you are constantly dealing with high demands or when you feel like there's too much on
                    your plate. It's common to experience a heightened sense of worry or fear, even about situations
                    that may not normally trouble you.

                    Physically, stress can manifest in various ways. You might notice symptoms like headaches, muscle
                    tension, fatigue, or trouble sleeping. Your heart might race, or you may find it hard to concentrate
                    or remember things. Stress can also affect your appetite, causing you to eat more or less than
                    usual. If left unmanaged, chronic stress can lead to more serious health issues, such as high blood
                    pressure, heart disease, anxiety disorders, or depression. Recognizing these signs and understanding
                    their connection to stress is a crucial step toward finding ways to reduce stress and protect your
                    health.
                </p>

                <h2 id="tips-manage-stress">Tips to manage stress</h2>
                <p>
                    Managing stress is not just about handling the immediate pressures; it's also about adopting
                    long-term strategies to protect your mental and physical health. Stress can deplete your energy,
                    making it harder to perform everyday tasks. Over time, chronic stress can contribute to serious
                    health problems, including mental health issues like anxiety and depression.

                    To manage stress effectively, it's important to integrate healthy habits into your daily routine.
                    Regular physical activity, such as walking, running, or yoga, can help release tension and improve
                    your mood. Mindfulness practices, like meditation and deep-breathing exercises, can also be powerful
                    tools in calming your mind and reducing stress. Additionally, maintaining a balanced diet, getting
                    enough sleep, and staying connected with supportive friends and family are all essential components
                    of stress management. Remember, seeking professional help when needed is a sign of strength, not
                    weakness. There are many resources available to help you manage stress and maintain your overall
                    well-being.
                </p>
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
            userRating: null,
            totalRatings: 20,
            totalRatingSum: 4.2 * 20,
            ratingSubmitted: false
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
                this.totalRatingSum += this.userRating;
                this.totalRatings += 1;
                this.ratingSubmitted = true;
                alert("Thanks for your rating!")
            }
        }
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