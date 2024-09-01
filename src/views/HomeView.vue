<template>
    <div class="row mt-5">
        <div class="home-section">
            <div class="home-content">
                <h1>Before things get beyond you</h1>
                <p>Get support from MoodX</p>
                <router-link to="/getHelp/supportResource" class="home-button">Support resources</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
// No script needed for now
</script>

<style scoped>
.home-section {
    position: relative;
    width: 100%;
    height: 600px;
    background-image: url('/src/assets/img/home-bg.png');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.home-content {
    text-align: center;
    color: white;
}

.home-content h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.home-content p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
}

.home-button {
    padding: 10px 20px;
    background-color: #0057b8;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}

.home-button:hover {
    background-color: #004494;
}

@media (max-width: 768px) {
    .home-content h1 {
        font-size: 2rem;
    }

    .home-content p {
        font-size: 1.2rem;
    }

    .home-button {
        font-size: 0.9rem;
    }
}
</style>