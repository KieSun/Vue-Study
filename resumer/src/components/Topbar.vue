<template>
    <div id="topBar">
        <div class="wrapper">
            <span class="logo">Resumer</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'topBar'
    }
</script>

<style>
    #topBar {
        background: #fff;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
    }
    #topBar > .wrapper {
        min-width: 1024px;
        max-width: 1440px;
        margin: 0 auto;
        height: 64px;
    }
    #topBar > .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #topBar .logo {
        font-size: 24px;
        color: #000;
        padding: 0 16px;
    }
</style>