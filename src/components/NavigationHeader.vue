<script setup lang="ts">
import { computed, ref } from 'vue'
import IconAccount from '@/components/icons/IconAccount.vue'
// @ts-ignore
import { useMq } from 'vue3-mq'

const mq = useMq()

const userName = ref<string>('Max Mustermann')

const initialsOfUserName = computed<string>(() =>
  userName.value
    .split(' ')
    .map((n) => n[0])
    .join('. ')
    .concat('.')
)
</script>

<template>
  <div class="navigation">
    <nav>
      <RouterLink to="/">My Tasks</RouterLink>
      <RouterLink to="/archive">Archive</RouterLink>
    </nav>
    <div class="user">
      <IconAccount class="icon" />
      <span class="name">{{ mq.xs ? initialsOfUserName : userName }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navigation {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: $space-default;

    a {
      flex-shrink: 0;

      font-size: 22px;
      font-weight: bold;

      color: $color-text-soft;
      transition: 0.4s;
      &.router-link-exact-active {
        color: $color-accent;
      }
    }
  }

  .user {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    cursor: pointer;

    .icon {
      flex-shrink: 0;
      height: 25px;
    }

    .name {
      font-weight: bold;
    }
  }
}
</style>
