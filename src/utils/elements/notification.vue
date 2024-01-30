<script  >
import { ElNotification } from 'element-plus'

const Notification = (title,message,type) => {
  ElNotification({
    title: title,
    message: message,
    type: type,
    dangerouslyUseHTMLString: true
  })
}

export { Notification }
</script>