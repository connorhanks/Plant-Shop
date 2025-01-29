<script setup>
import { ref } from "vue";

const teamMembers = [
  {
    name: "Sarah Green",
    role: "Founder & Plant Expert",
    image: "/images/team/sarah.jpg",
    quote:
      "Every plant has a story to tell, and we're here to help you write yours.",
    favorites: ["Monstera Deliciosa", "String of Hearts"],
  },
  {
    name: "James Chen",
    role: "Sustainability Director",
    image: "/images/team/james.jpg",
    quote: "Sustainability isn't just a buzzword—it's our core mission.",
    favorites: ["Bird of Paradise", "ZZ Plant"],
  },
  {
    name: "Maya Patel",
    role: "Plant Care Specialist",
    image: "/images/team/maya.jpg",
    quote:
      "The secret to being a great plant parent? Start with love, add patience.",
    favorites: ["Calathea Orbifolia", "Peace Lily"],
  },
];

const milestones = [
  {
    year: "2021",
    title: "The Seed is Planted",
    description:
      "Aloe There begins in a small London flat with just 50 plants.",
  },
  {
    year: "2022",
    title: "Growing Together",
    description:
      "Expanded to our first warehouse and launched sustainable packaging.",
  },
  {
    year: "2023",
    title: "Branching Out",
    description: "Started our Plant Parent Community and Educational Programs.",
  },
  {
    year: "2024",
    title: "Flourishing Future",
    description: "Reaching 50,000 happy plant parents across the UK.",
  },
];

const activeTab = ref("story");
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="bg-primary text-white py-20 md:py-32 relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-[url('@/assets/leaf-pattern.svg')] opacity-10"
      ></div>

      <!-- Floating Elements -->
      <div class="absolute w-full h-full overflow-hidden">
        <img
          src="/images/floating-leaf-1.png"
          class="absolute top-[10%] left-[5%] w-16 md:w-24 animate-float-slow"
          alt=""
        />
        <img
          src="/images/floating-leaf-2.png"
          class="absolute top-[20%] right-[10%] w-20 md:w-28 animate-float-slower"
          alt=""
        />
      </div>

      <div class="container mx-auto px-4 relative">
        <h1 class="text-4xl md:text-6xl font-bold text-center mb-6">
          Growing <span class="scribble-underline">Together</span>
        </h1>
        <p class="text-lg md:text-xl text-center max-w-2xl mx-auto">
          We're more than just a plant shop – we're a community of plant lovers
          dedicated to bringing the joy of nature into your home.
        </p>
      </div>
    </section>

    <!-- Navigation Tabs -->
    <div class="bg-white shadow-sm sticky top-0 z-10">
      <div class="container mx-auto px-4">
        <div class="flex justify-center space-x-8">
          <button
            v-for="tab in ['story', 'team', 'mission']"
            :key="tab"
            @click="activeTab = tab"
            class="py-4 px-2 border-b-2 transition-colors"
            :class="
              activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-primary'
            "
          >
            {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
          </button>
        </div>
      </div>
    </div>

    <!-- Content Sections -->
    <div class="py-16 md:py-24">
      <!-- Our Story -->
      <div v-show="activeTab === 'story'" class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="relative">
            <div class="absolute top-0 left-0 w-1 bg-primary h-full"></div>
            <div
              v-for="milestone in milestones"
              :key="milestone.year"
              class="ml-8 mb-12 relative"
            >
              <div
                class="absolute -left-10 w-6 h-6 bg-primary rounded-full border-4 border-white"
              ></div>
              <div
                class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <span class="text-primary font-bold">{{ milestone.year }}</span>
                <h3 class="text-xl font-bold mt-2">{{ milestone.title }}</h3>
                <p class="text-gray-600 mt-2">{{ milestone.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Our Team -->
      <div v-show="activeTab === 'team'" class="container mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            v-for="member in teamMembers"
            :key="member.name"
            class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div class="aspect-square overflow-hidden">
              <img
                :src="member.image"
                :alt="member.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900">{{ member.name }}</h3>
              <p class="text-primary font-medium">{{ member.role }}</p>
              <p class="mt-4 text-gray-600 italic">"{{ member.quote }}"</p>
              <div class="mt-4">
                <p class="text-sm font-medium text-gray-900">
                  Favorite Plants:
                </p>
                <div class="flex flex-wrap gap-2 mt-2">
                  <span
                    v-for="plant in member.favorites"
                    :key="plant"
                    class="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                  >
                    {{ plant }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Our Mission -->
      <div v-show="activeTab === 'mission'" class="container mx-auto px-4">
        <div
          class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12"
        >
          <div class="grid md:grid-cols-2 gap-12">
            <div>
              <h2 class="text-3xl font-bold mb-6">Our Mission</h2>
              <p class="text-gray-600 mb-4">
                To create a greener world by making plant parenthood accessible,
                sustainable, and joyful for everyone.
              </p>
              <ul class="space-y-4">
                <li class="flex items-start">
                  <span class="text-primary text-xl mr-2">🌱</span>
                  <span>Educating and supporting new plant parents</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary text-xl mr-2">🌍</span>
                  <span>Promoting sustainable gardening practices</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary text-xl mr-2">💚</span>
                  <span>Building a community of plant enthusiasts</span>
                </li>
              </ul>
            </div>
            <div class="relative">
              <img
                src="/images/mission-collage.jpg"
                alt="Our mission in action"
                class="rounded-lg shadow-lg"
              />
              <div class="absolute inset-0 bg-primary/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scribble-underline {
  position: relative;
  display: inline-block;
}

.scribble-underline::after {
  content: "";
  position: absolute;
  bottom: -1.2rem;
  left: 0;
  width: 100%;
  height: 1.5rem;
  background: url(@/assets/scribble-underline.svg) no-repeat center bottom;
  background-size: 100% auto;
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-slower {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-float-slow {
  animation: float-slow 4s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 6s ease-in-out infinite;
}

@media (max-width: 768px) {
  .scribble-underline::after {
    height: 1.2rem;
    bottom: -1rem;
  }
}
</style>
