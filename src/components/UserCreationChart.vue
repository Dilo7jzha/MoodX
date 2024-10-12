<template>
    <v-container class="mt-5">
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class="text-center">User Creation Chart</v-card-title>
                    <v-card-text>
                        <!-- Toggle for Chart Type and Date Range on the same line -->
                        <v-row justify="center" class="mb-3">
                            <!-- Chart Type Toggle Button -->
                            <v-col cols="auto">
                                <v-btn v-if="chartType === 'line'" @click="chartType = 'bar'" color="primary">
                                    Show Bar Chart
                                </v-btn>
                                <v-btn v-else @click="chartType = 'line'" color="primary">
                                    Show Line Chart
                                </v-btn>
                            </v-col>

                            <!-- Date Range Toggle Button -->
                            <v-col cols="auto">
                                <v-btn v-if="dateRange === 7" @click="dateRange = 14" color="primary">
                                    Show Last 2 Weeks
                                </v-btn>
                                <v-btn v-else @click="dateRange = 7" color="primary">
                                    Show Last 7 Days
                                </v-btn>
                            </v-col>
                        </v-row>

                        <!-- Chart Canvas -->
                        <div ref="contentToExport">
                            <canvas id="userChart" ref="userChart"></canvas>
                        </div>
                        <!-- Export Buttons -->
                        <v-row justify="center" class="mb-3">
                            <v-col cols="auto">
                                <v-btn @click="exportToCSV" color="success">
                                    Export to CSV
                                </v-btn>
                            </v-col>
                            <v-col cols="auto">
                                <v-btn @click="exportToPDF" color="success">
                                    Export to PDF
                                </v-btn>
                            </v-col>
                        </v-row>
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
import Papa from 'papaparse';
import html2pdf from 'html2pdf.js';

Chart.register(...registerables);

export default {
    name: 'UserCreationChart',
    setup() {
        const chartType = ref('line'); // Default to 'line' chart
        const dateRange = ref(7); // Default to 7 days
        const userChart = ref(null);
        const chartInstance = ref(null);
        const contentToExport = ref(null);

        const fetchUserData = async () => {
            // Calculate the date based on the selected range
            const today = new Date();
            const pastDate = new Date();
            pastDate.setDate(today.getDate() - (dateRange.value - 1));

            const q = query(
                collection(db, 'users'),
                where('createdAt', '>=', Timestamp.fromDate(pastDate))
            );
            const querySnapshot = await getDocs(q);

            // Initialize and populate userData
            const userData = {};
            for (let i = 0; i < dateRange.value; i++) {
                const date = new Date();
                date.setDate(today.getDate() - i);
                const dateString = date.toLocaleDateString();
                userData[dateString] = 0;
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
            // Check if chartInstance exists and destroy it before creating a new one
            if (chartInstance.value) {
                chartInstance.value.destroy();
                chartInstance.value = null; // Reset chartInstance to prevent reuse
            }

            // Ensure chartType is defined before creating the chart
            if (!['line', 'bar'].includes(chartType.value)) {
                console.error(`Invalid chart type: ${chartType.value}`);
                return;
            }

            const labels = Object.keys(data).reverse();
            const dataset = Object.values(data).reverse();

            try {
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
                                fill: chartType.value === 'line',
                            },
                        ],
                    },
                    options: {
                        scales: {
                            x: { title: { display: true, text: 'Date' } },
                            y: {
                                title: { display: true, text: 'Number of Users' },
                                beginAtZero: true,
                                ticks: { precision: 0 },
                            },
                        },
                    },
                });
            } catch (error) {
                console.error("Error creating chart:", error);
            }
        };


        const updateChart = async () => {
            try {
                const userData = await fetchUserData();
                createChart(userData);
            } catch (error) {
                console.error("Error updating chart:", error);
            }
        };

        // CSV Export Function
        const exportToCSV = async () => {
            const userData = await fetchUserData();
            const csvData = Object.entries(userData).map(([date, count]) => ({
                Date: date,
                "Users Created": count,
            }));
            const csv = Papa.unparse(csvData);
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'user_creation_data.csv';
            link.click();
            URL.revokeObjectURL(url);
        };
        // Export pdf Function
        const exportToPDF = () => {
            if (userChart.value) {
                const options = {
                    margin: 1,
                    filename: 'UserCreationChart.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 4 },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                };

                html2pdf().set(options).from(userChart.value).save();
            } else {
                console.error("No content to export.");
            }
        };

        onMounted(updateChart);
        watch([chartType, dateRange], updateChart);

        return {
            chartType,
            dateRange,
            userChart,
            exportToCSV,
            exportToPDF,
            contentToExport
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