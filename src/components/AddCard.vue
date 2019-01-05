<template>
  <div class="add-card">
    <form>
      <input class="form-control" type="text" v-model="inputTitle" ref="inputText">
      <!-- <button class="btn" :class="{'btn-success': valid}" type="submit" >Add Card</button> -->
      <button class="btn btn-success" :disabled="invalidInput" type="submit" >Add Card</button>
      <a class="cancel-add-btn" href="" @click.prevent="$emit('close')">&times;</a>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputTitle: '',
      valid: ''
    }
  },
  // watch: {
  //   inputTitle(v) {
  //     console.log(v)
  //     this.valid = v.trim().length > 0
  //   }
  // },
  computed: {
    invalidInput() {
      return !this.inputTitle.trim()
    }
  },
  mounted() {
    this.$refs.inputText.focus()
  }
}
</script>

<style>
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}
.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}
.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
</style>
