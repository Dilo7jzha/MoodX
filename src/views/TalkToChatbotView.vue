<template>
    <div class="row mt-5">
        <div class="col-md-8 offset-md-2">
            <h1 class="text-center">Talk to Chatbot</h1>
            <p>Get help from Chatbot</p>

            <!-- Input form for user prompt -->
            <form @submit.prevent="sendMessage">
                <div class="mb-3">
                    <label for="userPrompt" class="form-label">Your Message</label>
                    <input type="text" class="form-control" id="userPrompt" v-model="userPrompt"
                        placeholder="Type your message here" />
                </div>
                <button type="submit" class="btn btn-primary">Send</button>
            </form>

            <!-- Display the chatbot's response -->
            <div v-if="chatbotResponse" class="mt-3">
                <h5>Chatbot Response:</h5>
                <p>{{ chatbotResponse }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// State variables
const userPrompt = ref('');
const chatbotResponse = ref('');

// Function to send the prompt to Firebase Function
const sendMessage = async () => {
    try {
        // Replace with your actual Firebase Function URL
        const response = await axios.post('https://textgentextonlyprompt-opo4w32zbq-uc.a.run.app', {
            prompt: userPrompt.value
        });

        // Assuming the response data contains the generated text as `generatedText`
        chatbotResponse.value = response.data.generatedText;
    } catch (error) {
        console.error('Error sending message to chatbot:', error);
        chatbotResponse.value = 'There was an error connecting to the chatbot.';
    }
};
</script>

<style scoped>
/* Optional styling for your component */
</style>
