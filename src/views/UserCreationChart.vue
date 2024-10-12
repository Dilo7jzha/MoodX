<template>
    <v-container class="mt-5">
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class="text-center">User Creation Chart (Last 7 Days)</v-card-title>
                    <v-card-text>
                        <v-btn-toggle v-model="chartType" class="mb-3">
                            <v-btn value="line">Line Chart</v-btn>
                            <v-btn value="bar">Bar Chart</v-btn>
                        </v-btn-toggle>
                        <canvas id="userChart" ref="userChart"></canvas>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { Chart, registerables } from 'chart.js';
import db from '@/Firebase/init.js';

Chart.register(...registerables);

export default {
    name: 'UserCreationChart',
    setup() {
        const chartType = ref('line'); // Switch between 'line' and 'bar'
        const userChart = ref(null);
        const chartInstance = ref(null);

        const fetchUserData = async () => {
            // Calculate the date for 7 days ago
            const today = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(today.getDate() - 6); // Set to 6 days ago to include today

            // Query Firestore for users created in the last 7 days
            const q = query(
                collection(db, 'users'),
                where('createdAt', '>=', Timestamp.fromDate(sevenDaysAgo))
            );
            const querySnapshot = await getDocs(q);

            // Aggregate user creation data by day
            const userData = {};
            for (let i = 0; i < 7; i++) {
                const date = new Date();
                date.setDate(today.getDate() - i);
                const dateString = date.toLocaleDateString();
                userData[dateString] = 0; // Initialize each day with zero users
            }

            querySnapshot.forEach((doc) => {
                const createdAt = doc.data().createdAt.toDate();
                const dateKey = createdAt.toLocaleDateString();
                if (userData[dateKey] !== undefined) {
                    userData[dateKey] += 1;
                }
            });

            return userData;
        };

        const createChart = (data) => {
            if (chartInstance.value) {
                chartInstance.value.destroy(); // Destroy existing chart before creating a new one
            }

            const labels = Object.keys(data).reverse(); // Dates in ascending order
            const dataset = Object.values(data).reverse();

            chartInstance.value = new Chart(userChart.value, {
                type: chartType.value,
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Users Created',
                            data: dataset,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderWidth: 1,
                            fill: chartType.value === 'line', // Only fill area in line chart
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Date',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Number of Users',
                            },
                            beginAtZero: true,
                            ticks: {
                                precision: 0,
                            },
                        },
                    },
                },
            });
        };

        onMounted(async () => {
            const userData = await fetchUserData();
            createChart(userData);
        });

        // Watch for changes in the chart type and recreate the chart
        watch(chartType, async () => {
            const userData = await fetchUserData();
            createChart(userData);
        });

        return {
            chartType,
            userChart,
        };
    },
};
</script>

<style scoped>
canvas {
    width: 100%;
    height: 400px;
}
</style>