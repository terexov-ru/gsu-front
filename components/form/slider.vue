<template>
  <Form class="form"
        @submit="onSubmit"
        v-slot="{ errors }"
  >

    <Field class="input input_white text text_normal"
           placeholder="Имя"
           name="name"
           type="text"
           :rules="validateName"
           v-slot="{errorMessage}"
           :class="{'input_error': errors.name}"
    />

    <Field class="input input_white text text_normal"
           placeholder="Телефон"
           name="phone"
           type="text"
           :rules="validatePhone"
           v-maska
           :data-maska="phoneMask"
           v-slot="{ errors, errorMessage }"
           :class="{'input_error': errors.phone}"
    />

    <button :disabled="disabled" :class="buttonClasses">{{ buttonText }}</button>
  </Form>
</template>

<script>
export default {
  props: {
    buttonClasses: {
      type: String,
      default: 'button'
    },
    buttonText: String
  },
  data() {
    return {
      disabled: false,
    }
  },
  methods: {
    async onSubmit(value, actions) {
      console.log(actions);
      this.disabled = true;
      const {data, status} = await this.sendForm(value.name, undefined, value.phone, 'Тестовый запрос', undefined);

      if (status.value === 'success' && data.value.status === 'ok') {
        this.$emit('success');
        actions.resetForm();
      }

      this.disabled = false;
    },
  },
  setup() {
    const {sendForm} = useApi();
    const {phoneMask, validatePhone, validateName} = useValidate();
    return {
      sendForm,
      phoneMask,
      validatePhone,
      validateName,
    }
  }
}
</script>

<style scoped>

</style>
