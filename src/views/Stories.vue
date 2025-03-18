<template>
    <div class="stories-container">
        <h1>Stories</h1>
        <div v-for="(story, storyIndex) in stories" :key="storyIndex" class="story">
            <h2 @click="toggleStory(storyIndex)" class="story-title">
                {{ story.title }}
            </h2>
            <div v-if="story.expanded">
                <div v-for="(point, pointIndex) in story.points" :key="pointIndex" class="story-point">
                    <h3 @click="togglePoint(storyIndex, pointIndex)" class="story-point-title">
                        {{ pointIndex + 1 }}. {{ point.title }}
                    </h3>
                    <div v-if="point.expanded" class="story-details">
                        <p><strong>Story:</strong> {{ point.story }}</p>
                        <h4 v-if="point.locations.length">Important Locations:</h4>
                        <ul v-if="point.locations.length">
                            <li v-for="(location, locIndex) in point.locations" :key="locIndex">
                                {{ location.name }} → ({{ location.latitude }}, {{ location.longitude }})
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            stories: [
                {
                    title: "The Silk Road (丝绸之路)",
                    expanded: false,
                    points: [
                        {
                            title: "The Birth of the Silk Road (2nd Century BCE)",
                            expanded: false,
                            story: "The Silk Road originated during the Han Dynasty when Emperor Wu of Han sent Zhang Qian to establish trade routes with Central Asia. This marked the beginning of long-distance trade between China and the West.",
                            locations: [{ name: "Chang'an (Xi’an), China", latitude: 34.3416, longitude: 108.9398 }]
                        },
                        {
                            title: "Expansion and the Role of the Kushan Empire (1st-3rd Century CE)",
                            expanded: false,
                            story: "The Silk Road flourished under the Kushan Empire, facilitating the exchange of goods, culture, and Buddhism between India, China, and the Roman Empire.",
                            locations: [{ name: "Bactra (Balkh), Afghanistan", latitude: 36.7564, longitude: 66.8972 }]
                        },
                        {
                            title: "The Height of Trade During the Tang Dynasty (7th-9th Century)",
                            expanded: false,
                            story: "Story: The Tang Dynasty saw the peak of Silk Road commerce, with Chinese silk, porcelain, and tea reaching the Middle East and Europe in exchange for spices, glass, and precious metals.",
                            locations: [{ name: "Luoyang, China", latitude: 34.6197, longitude: 112.4540 },
                            { name: "Merv (Mary), Turkmenistan (Flourishing trade hub)", latitude: 37.6612, longitude: 62.1793 },
                            { name: "Luoyang, China", latitude: 33.3152, longitude: 44.3661 }
                            ]
                        },
                        {
                            title: "The Mongol Empire and the Pax Mongolica (13th-14th Century)",
                            expanded: false,
                            story: "Story: The Mongols, under Genghis Khan, unified much of Eurasia, creating safe conditions for trade and cultural exchange, allowing Marco Polo and others to travel across the Silk Road.",
                            locations: [{ name: "Karakorum, Mongolia (Mongol capital and trade hub)", latitude: 47.1975, longitude: 102.8425 },
                            { name: "Venice, Italy (Marco Polo’s home and a key European trade city)", latitude: 45.4408, longitude: 12.3155 }
                            ]
                        }
                    ]
                },
                {
                    title: "Operation Barbarossa (Unternehmen Barbarossa)",
                    expanded: false,
                    points: [
                        {
                            title: "The Launch of Operation Barbarossa (June 22, 1941)",
                            expanded: false,
                            story: "On June 22, 1941, Nazi Germany launched a massive surprise invasion of the Soviet Union, deploying over 3 million troops along a 2,900 km front. The invasion aimed to capture key Soviet cities and quickly defeat the Red Army.",
                            locations: [{ name: "Brest Fortress, Belarus", latitude: 52.0846, longitude: 23.6560 }]
                        },
                        {
                            title: "The Battle for Smolensk (July-August 1941)",
                            expanded: false,
                            story: "After initial rapid advances, German forces met strong Soviet resistance at Smolensk. Although they captured the city, Soviet counterattacks slowed the German advance, delaying their drive toward Moscow.",
                            locations: [{ name: "Smolensk, Russia", latitude: 54.7826, longitude: 32.0453 }]
                        },
                        {
                            title: "The Siege of Leningrad Begins (September 1941)",
                            expanded: false,
                            story: "German and Finnish forces surrounded Leningrad, beginning a brutal 872-day siege that would become one of the longest and deadliest in history. Despite heavy casualties and starvation, the city never surrendered.",
                            locations: [{ name: "Leningrad (Saint Petersburg), Russia", latitude: 59.9311, longitude: 30.3609 }]
                        },
                        {
                            title: "The Drive to Moscow and the Battle of Moscow (October-December 1941)",
                            expanded: false,
                            story: "Despite early successes, German forces encountered worsening weather and Soviet resistance as they advanced toward Moscow. The Red Army launched a massive counteroffensive in December, pushing the Germans back.",
                            locations: [
                                { name: "Vyazma, Russia", latitude: 55.2100, longitude: 34.2900 },
                                { name: "Moscow, Russia", latitude: 55.7558, longitude: 37.6173 }
                            ]
                        }
                    ]
                }
                ,
                {
                    title: "Royal tours of Australia (Queen Elizabeth II’s Historic 1954 Visit)",
                    expanded: false,
                    points: [
                        {
                            title: "Departure from the UK (1954)",
                            expanded: false,
                            story: "Queen Elizabeth II departed from London, embarking on her historic journey as the first reigning monarch to visit Australia.",
                            locations: [{ name: "London, United Kingdom", latitude: 51.5074, longitude: -0.1278 }]
                        },
                        {
                            title: "Arrival in Australia (February 3, 1954)",
                            expanded: false,
                            story: "The Queen arrived in Sydney, greeted by enormous crowds lining the harbour and city streets.",
                            locations: [{ name: "Sydney, New South Wales", latitude: -33.8688, longitude: 151.2093 }]
                        },
                        {
                            title: "Canberra - Official Welcome and Parliament Visit",
                            expanded: false,
                            story: "Queen Elizabeth II met with government officials and addressed Parliament, reinforcing ties between Australia and the UK.",
                            locations: [{ name: "Canberra, Australian Capital Territory", latitude: -35.2809, longitude: 149.1300 }]
                        },
                        {
                            title: "Melbourne - A Royal Procession",
                            expanded: false,
                            story: "In Melbourne, over a million people lined the streets to see the Queen during a grand procession.",
                            locations: [{ name: "Melbourne, Victoria", latitude: -37.8136, longitude: 144.9631 }]
                        },
                        {
                            title: "Brisbane - State Reception and Community Visits",
                            expanded: false,
                            story: "The Queen visited Brisbane, attended a state reception, and met with local communities.",
                            locations: [{ name: "Brisbane, Queensland", latitude: -27.4698, longitude: 153.0251 }]
                        }
                    ]
                }
                ,
                {
                    title: "Mission: Impossible – Dead Reckoning Part One (Ethan Hunt’s Movement)",
                    expanded: false,
                    points: [
                        {
                            title: "Recovering the Key in the Arabian Desert",
                            expanded: false,
                            story: "Ethan Hunt ventures into the Rub' al Khali Desert to retrieve a crucial part of a key held by Ilsa Faust.",
                            locations: [{ name: "Rub' al Khali Desert, Arabian Peninsula", latitude: 22.9784, longitude: 55.3000 }]
                        },
                        {
                            title: "Mission Briefing in Amsterdam",
                            expanded: false,
                            story: "Ethan receives his mission briefing in Amsterdam, setting the stage for the challenges ahead.",
                            locations: [{ name: "Amsterdam, Netherlands", latitude: 52.3676, longitude: 4.9041 }]
                        },
                        {
                            title: "Undercover Operation at Abu Dhabi International Airport",
                            expanded: false,
                            story: "Ethan and his team conduct a covert operation at the Abu Dhabi International Airport, navigating through complex security measures.",
                            locations: [{ name: "Abu Dhabi International Airport, UAE", latitude: 24.4567, longitude: 54.6511 }]
                        },
                        {
                            title: "High-Speed Chase Through Rome",
                            expanded: false,
                            story: "In Rome, Ethan and Grace engage in a high-speed chase through iconic locations, including the Colosseum and Via dei Fori Imperiali, driving a yellow Fiat 500.",
                            locations: [
                                { name: "Colosseum, Rome, Italy", latitude: 41.8902, longitude: 12.4922 },
                                { name: "Via dei Fori Imperiali, Rome, Italy", latitude: 41.8939, longitude: 12.4861 }
                            ]
                        },
                        {
                            title: "Confrontation Aboard a Moving Train in Norway",
                            expanded: false,
                            story: "Ethan confronts adversaries aboard a moving train on the Kylling Bridge in Norway, leading to a dramatic showdown.",
                            locations: [{ name: "Kylling Bridge, Norway", latitude: 62.3498, longitude: 7.7346 }]
                        }
                    ]
                }
                ,
                {
                    title: "Exodus (出埃及记)",
                    expanded: false,
                    points: [
                        {
                            title: "The Israelites' Enslavement in Egypt",
                            expanded: false,
                            story: "The Israelites were enslaved in Egypt for centuries under Pharaoh’s rule. Moses, raised in Pharaoh’s household, later became the leader of their liberation.",
                            locations: [{ name: "Pi-Ramesses (Ancient Egyptian capital, likely where the Israelites lived)", latitude: 30.8000, longitude: 31.8333 }]
                        },
                        {
                            title: "The Ten Plagues and the Exodus from Egypt",
                            expanded: false,
                            story: "After Pharaoh refused to free the Israelites, Egypt was struck by ten plagues. The final plague, the death of the firstborn, led Pharaoh to release them. The Israelites departed from Egypt in haste.",
                            locations: [{ name: "Goshen (Traditional region where the Israelites lived in Egypt)", latitude: 30.7873, longitude: 31.0021 }]
                        },
                        {
                            title: "The Parting of the Red Sea",
                            expanded: false,
                            story: "As Pharaoh’s army pursued them, Moses parted the Red Sea, allowing the Israelites to cross safely before the waters closed over the Egyptians.",
                            locations: [{ name: "Gulf of Suez (Possible location of the Red Sea crossing)", latitude: 29.4900, longitude: 32.5333 }]
                        },
                        {
                            title: "Receiving the Ten Commandments at Mount Sinai",
                            expanded: false,
                            story: "After traveling through the wilderness, Moses ascended Mount Sinai, where he received the Ten Commandments from God.",
                            locations: [{ name: "Mount Sinai (Traditional site in the Sinai Peninsula, Egypt)", latitude: 28.5394, longitude: 33.9750 }]
                        },
                        {
                            title: "The Israelites' Wandering in the Wilderness",
                            expanded: false,
                            story: "Due to their disobedience, the Israelites wandered in the desert for 40 years before reaching the Promised Land.",
                            locations: [
                                { name: "Kadesh-Barnea (Key campsite during their journey, near modern-day Israel-Egypt border)", latitude: 30.8500, longitude: 34.4333 },
                                { name: "Plains of Moab (Final encampment before entering Canaan)", latitude: 31.7500, longitude: 35.7333 }
                            ]
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        toggleStory(index) {
            this.stories[index].expanded = !this.stories[index].expanded;
        },
        togglePoint(storyIndex, pointIndex) {
            this.stories[storyIndex].points[pointIndex].expanded = !this.stories[storyIndex].points[pointIndex].expanded;
        }
    }
};
</script>

<style scoped>
.stories-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
}

.story {
    border-bottom: 2px solid #ddd;
    padding: 10px 0;
}

.story-title {
    cursor: pointer;
    color: #007bff;
    transition: 0.3s;
}

.story-title:hover {
    text-decoration: underline;
}

.story-point {
    margin-left: 20px;
}

.story-point-title {
    cursor: pointer;
    color: #17a2b8;
    transition: 0.3s;
}

.story-point-title:hover {
    text-decoration: underline;
}

.story-details {
    margin-left: 40px;
}
</style>