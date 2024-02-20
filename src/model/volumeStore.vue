<script >
import { defineStore } from 'pinia';

const useVolumeStore = defineStore('volume',{
  
    state: () => ({
    volumes: [],
    count: 1,
    }),

    actions: {
        // 添加volume
        addVolume() {
            this.volumes.push({
                name: 'volume' + this.count++,
            })
        },
        // 删除volume
        deleteVolume(index) {
            this.volumes.splice(index, 1)
        },
        // 清空volume
        clearVolume() {
            this.volumes = []
        },
        // 根据volume名称,返回volume索引
        getVolumeIndex(name) {
            return this.volumes.findIndex((item) => item.name === name);
        },

        // 根据volume名称,删除其除name外的所有属性
        removeVolumeAttributesWithName(volumeName) {
            const index = this.volumes.findIndex((item) => item.name === volumeName);
            this.volumes[index] = {name: volumeName}
        },

        // 根据volume名称,添加其属性
        // 会先调用removeVolumeAttributesWithName方法,删除除name外的所有属性
        addVolumeAttributesWithName(volumeName,attributes) {
            this.removeVolumeAttributesWithName(volumeName)
            const index = this.volumes.findIndex((item) => item.name === volumeName);
            this.volumes[index] = {...this.volumes[index],...attributes}
        },



}


})

export { useVolumeStore }

</script>