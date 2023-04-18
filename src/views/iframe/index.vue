<template>
    <iframe :src="url" frameborder="0" width="100%" height="100%"></iframe>
</template>

<script>

export default {
    computed: {
        url() {
            if (!this.$route) {
                return ;
            }
            return this.$route.query.url;
        }
    }
}
</script>
