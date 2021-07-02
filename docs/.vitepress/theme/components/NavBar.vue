<script setup lang="ts">
import { defineEmit, defineProps} from 'vue'
import { useRepo } from '../composables/repo'
import NavBarTitle from './NavBarTitle.vue'
import NavLinks from './NavLinks.vue'
import ToggleSideBarButton from './ToggleSideBarButton.vue'
import GithubLink from './GithubLink.vue' 

defineEmit(['toggle'])

const repo = useRepo()
const isGithub = () => repo.value?.text.toLowerCase() === 'github'

defineProps({
  showSidebar: { type: Boolean, required: true },
})
</script>

<template>
  <header class="nav-bar" :class="[!showSidebar ? 'pl-1.5rem' : 'pl-16']">
    <ToggleSideBarButton v-show="showSidebar" @toggle="$emit('toggle')" />

    <NavBarTitle />

    <div class="flex-grow" />

    <div class="nav">
      <NavLinks />
    </div>

    <GithubLink v-if="repo && isGithub()" :item="repo" />

    <slot name="search" />
  </header>
</template>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: var(--z-index-navbar);
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid var(--c-divider); */
  padding-top: 0.7rem;
  padding-right: 1.5rem;
  padding-bottom: 0.7rem;
  height: var(--header-height);
  background-color: var(--c-bg);
}

@media (min-width: 720px) {
  .nav-bar {
    padding: 0.7rem 1.5rem;
  }
}

.flex-grow {
  flex-grow: 1;
}

.nav {
  display: none;
}

@media (min-width: 720px) {
  .nav {
    display: block;
  }
}
</style>
