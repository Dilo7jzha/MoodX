<template>
    <footer class="footer">
        <div class="footer-container">
            <div class="logo-ack">
                <h2 class="footer-logo">MoodX</h2>
                <p class="acknowledgment">
                    MoodX acknowledges First Nations peoples and communities as the Traditional Owners of the land.
                    We acknowledge and pay our respects to Elders past and present, and emerging leaders.
                    MoodX is committed to safe inclusive spaces, policies and services for people of LGBTIQ+ communities
                    and their families.
                </p>
            </div>
        </div>

        <div class="footer-bottom">
            <p>Copyright © 2024 MoodX All rights reserved</p>
            <ul class="legal-links">
                <li><a href="#" aria-label="Terms of use">Terms of use</a></li>
                <li><a href="#" aria-label="Privacy policy">Privacy policy</a></li>
                <li><a href="#" aria-label="Charter of rights">Charter of rights</a></li>
                <li><a href="#" aria-label="Site map">Site map</a></li>
            </ul>
        </div>
    </footer>
</template>

<script setup>
// No script needed for now
</script>

<style scoped>
.footer {
    color: white;
    background-color: #2b2b2b;
    background-image: linear-gradient(rgb(14, 20, 73), rgb(37, 37, 37));
    padding: 40px 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.footer-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
}

.logo-ack {
    max-width: 80%;
}

.footer-logo {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 15px;
    color: white;
}

.acknowledgment {
    font-size: 0.9rem;
    line-height: 1.5;
}

.footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    font-size: 0.85rem;
}

.legal-links {
    display: flex;
    gap: 15px;
    list-style: none;
    padding: 0;
    margin: 0;
}

.legal-links li a {
    color: white;
    text-decoration: none;
}

.legal-links li a:hover {
    text-decoration: underline;
}
</style>