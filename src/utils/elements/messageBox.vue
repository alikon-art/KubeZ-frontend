<script >
    import { ElMessage } from 'element-plus'
    
    const Message = (msg,type) => {
    ElMessage({
        type: type,
        message: msg,
    });
    };
    
    const infoMessage = (msg) => {
    ElMessage({
        message: msg,
    });
    };

    const successMessage = (msg) => {
    ElMessage({
        type: 'success',
        message: msg,
    });
    };

    const warningMessage = (msg) => {
    ElMessage({
        type: 'warning',
        message: msg,
    });
    };

    const errorMessage = (msg) => {
    ElMessage({
        type: 'error',
        message: msg,
    });
    };
    
    export {Message,successMessage,warningMessage,errorMessage}
</script>