<template>
    <v-container class="mt-5">
        <v-row justify="center">
            <v-col cols="12" md="8">
                <h1 class="text-center">Talk to Chatbot</h1>
                <p>If you want to get immediate help, try our new chatbot, enter your problem in the Question box and
                    click "Send":</p>
                <!-- Input form for user prompt -->
                <v-form @submit.prevent="sendMessage">
                    <v-text-field label="Question Box" v-model="userPrompt" placeholder="Enter Your Question" outlined
                        dense></v-text-field>
                    <v-btn type="submit" color="primary" class="mt-3">Send</v-btn>
                </v-form>
                <!-- Display the chatbot's response -->
                <div v-if="chatbotResponse" class="mt-4">
                    <h5>Chatbot Answer:</h5>
                    <v-card class="pa-3">
                        <p>{{ chatbotResponse }}</p>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-container>
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
        const response = await axios.post('https://textgentextonlyprompt-opo4w32zbq-uc.a.run.app', {
            prompt: userPrompt.value
        });
        chatbotResponse.value = response.data.generatedText;
    } catch (error) {
        console.error('Error sending message to chatbot:', error);
        chatbotResponse.value = 'There was an error connecting to the chatbot.';
    }
};
</script>

<style scoped></style>
