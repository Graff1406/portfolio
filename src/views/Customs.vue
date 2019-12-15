<template>
  <lay-out-index> 
    <CustomComponent />
  </lay-out-index> 
</template>
<script>
import LayOutIndex from "../layout/index";
import CustomComponent from '../components/CustomComponent/Index'
export default {
  name: 'Customs',
  components: {
    LayOutIndex,
    CustomComponent
  },
  metaInfo: {
    title: 'My Component'
  },
}
</script>