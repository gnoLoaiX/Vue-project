<template>
    <comment :id="this.$route.params.id"></comment>
</template>

<script>
import comment from "../subcomponents/comment.vue"
export default {
    components: {
        comment
    }
}
</script>

<style lang="scss" scoped>

</style>
