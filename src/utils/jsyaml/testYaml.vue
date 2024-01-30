<template>
<button @click="test">Generate YAML</button>
<textarea v-model="yamlOutput"></textarea>

</template> 

<script setup>
    import { anyToYaml } from './jsyaml.vue';
    import { reactive ,ref} from 'vue';

    const deployment = reactive({
      apiVersion: 'apps/v1',
      kind: 'Deployment',
    })
    
    const yamlOutput = ref('');

    function test() {
        yamlOutput.value = anyToYaml(deployment);
    }

</script>