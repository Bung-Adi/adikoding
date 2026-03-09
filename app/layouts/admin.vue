<template>
  <div class="flex min-h-screen">
    <AdminNavbar class="hidden md:flex shrink-0" />

    <main class="flex-1 p-4 pb-24 transition-all duration-300 md:ml-20 lg:ml-64 md:pb-4">
      <slot />
    </main>

    <!-- <MobileNav class="md:hidden" /> -->
  </div>
</template>