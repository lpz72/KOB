<template>
    <div class="container content-field">
        <div class="card">
            <div class="card-body">
             <slot> </slot> <!-- slot接受参数 -->
            </div>
        </div>
    </div>

</template>

<script>
export default{
    name: "ContentField",
}

</script>

<style scoped>

div.content-field{
    margin-top: 20px;
}

</style>