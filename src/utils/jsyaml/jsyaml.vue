<script >
    import { dump } from 'js-yaml';

    // 将传入数据转换为yaml
    const anyToYaml = (anyobj) =>{
        try {
        return dump(anyobj);
      } catch (e) {
        console.error('Error converting to YAML:', e);
        return '';
      }
    }

    export {anyToYaml}
</script>