<template>
    <div class="support-container">
        <div class="support-content mb-3">
            <h1>What's on your mind today?</h1>
            <p>Tell us what's on your mind, and we'll show you ways to help.</p>
            <p>You can select more than one.</p>

            <div class="support-options">
                <router-link to="/getHelp/supportResource/feelingStressed" class="support-button">I'm feeling stressed
                    or anxious</router-link>
                <router-link to="/getHelp/supportResource/feelingLow" class="support-button">I'm feeling low
                    or down</router-link>
                <router-link to="/getHelp/supportResource/experiencedTrauma" class="support-button">I have experienced
                    trauma</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
</script>

<style scoped>
.support-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px;
    background-image: url(/src/assets/img/background.png);
    background-color: #f5f7fa;
    /* Used if the image is unavailable */
    /* You must set a specified height */
    background-position: center;
    /* Center the image */
    background-repeat: no-repeat;
    /* Do not repeat the image */
    background-size: cover;
    /* Resize the background image to cover the entire container */
}

.support-content {
    background-color: #003366;
    /* Dark blue background */
    color: white;
    padding: 30px;
    border-radius: 20px;
    text-align: center;
    width: 600px;
}

h1 {
    font-size: 1.8rem;
    margin-bottom: 20px;
}

p {
    margin: 10px 0;
}

.support-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
}

.support-button {
    background-color: transparent;
    border: 2px solid white;
    color: white;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 1rem;
    cursor: pointer;
}

.support-button:hover {
    background-color: white;
    color: #003366;
}
</style>