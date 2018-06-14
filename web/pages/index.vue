<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        Dash
      </h1>
      <!--
        Todo: Actually add links.
              Bot status
              Login/logout via Discord
              Add tags from panel
        -->
      <h2 class="subtitle">
        Under Development
      </h2> 
      <div class="links">
        <a
          href="#"
          target="_blank"
          class="button--green">Invite</a>
        <a
          href="https://git.io/dashbot"
          target="_blank"
          class="button--grey">Source</a>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue';

export default {
  components: {
    AppLogo
  }
}
</script>

<style>
.container {
  min-height: 76vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 42px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 16px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
