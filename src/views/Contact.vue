<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-primary text-white py-16 relative overflow-hidden">
      <div
        class="absolute inset-0 bg-[url('@/assets/leaf-pattern.svg')] opacity-10"
      ></div>
      <div class="container mx-auto px-4 relative">
        <h1 class="text-4xl md:text-6xl font-bold text-center mb-6">
          Contact Us
        </h1>
        <p class="text-lg md:text-xl text-center max-w-2xl mx-auto">
          We would love to hear from you! Whether you have questions, feedback,
          or just want to say hello, feel free to reach out.
        </p>
      </div>
    </header>

    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-6">Get in Touch</h2>
        <form class="max-w-lg mx-auto">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Name</label
            >
            <input
              type="text"
              id="name"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              type="email"
              id="email"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div class="mb-4">
            <label for="message" class="block text-sm font-medium text-gray-700"
              >Message</label
            >
            <textarea
              id="message"
              rows="4"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.scribble-underline {
  background: url(@/assets/scribble-underline.svg) no-repeat 100% 100%/221px
    24px;
  padding-bottom: 14px;
}
</style>
