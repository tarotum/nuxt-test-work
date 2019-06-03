<template>
  <div>
    <nuxt/>
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
}
.modal-wrapper {
  position: relative;
  max-width: 420px;
  width: 100%;
  margin-top: 10vh;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  padding: 2em 1em;
}
.close-modal {
  font-weight: bold;
  font-size: 2em;
  line-height: 1;
  color: #fff;
  background: transparent;
  border: none;
  position: absolute;
  top: -1.5em;
  right: 0;
  cursor: pointer;
}
</style>

