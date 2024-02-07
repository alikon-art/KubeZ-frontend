<script >
    import { dump } from 'js-yaml';

    // 将传入数据转换为yaml
    const anyToYaml = (anyobj) =>{
        try {
        // noRefs: true 不显示引用
        return dump(anyobj,{
            noRefs: true
        });
      } catch (e) {
        console.error('Error converting to YAML:', e);
        return '';
      }
    }

    export {anyToYaml}
</script>