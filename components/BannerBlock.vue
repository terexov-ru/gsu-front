<template>
  <div class="wrapper">
    <div class="banner-block">
      <div class="banner">
        <div class="banner__background">
          <div class="column column_gap16">

            <div
                @click="copyText(articul)"
                class="banner__article pointer">
              <input ref="copyInput" type="text" style="opacity: 0; position: absolute; z-index: -1">

              <span class="tip banner__tip tip_small">артикул {{ articul }}</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13 21L4 21C3.44772 21 3 20.5523 3 20L3 7C3 6.44772 3.44772 6 4 6L9.58579 6C9.851 6 10.1054 6.10536 10.2929 6.29289L13.7071 9.70711C13.8946 9.89464 14 10.149 14 10.4142V20C14 20.5523 13.5523 21 13 21Z"
                    stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path
                    d="M10 6L10 4C10 3.44771 10.4477 3 11 3L16.5858 3C16.851 3 17.1054 3.10536 17.2929 3.29289L20.7071 6.70711C20.8946 6.89464 21 7.149 21 7.41421V17C21 17.5523 20.5523 18 20 18L14 18"
                    stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 11L10 11C9.44772 11 9 10.5523 9 10L9 6" stroke="white" stroke-width="1.5"
                      stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 8L17 8C16.4477 8 16 7.55228 16 7L16 3" stroke="white" stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </div>

            <div class="text banner__text text_h2">
              {{ title }}
            </div>
          </div>

          <FormSlider
              :buttonClasses="'button button_gradient'"
              :buttonText="'Получить консультацию'"
              @success="this.$emit('success')"
          />

          <div class="banner__img-container">
            <img
                v-if="img"
                class="banner__image"
                :src="img"
                alt="banner"
            >
          </div>

        </div>


      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
      default: "Оказание медицинской помощи пациентам и лицам с подозрением на коронавирусную инфекцию",
    },
    img: {
      type: String
    },
    articul: {
      type: String,
      default: 'A001'
    }
  },
  data() {
    return {
      disabled: false,
      name: '',
      phone: '',
    }
  },
  methods: {
    copyText(value) {
      let textarea = this.$refs.copyInput;
      textarea.value = value;
      textarea.focus()
      textarea.select()
      document.execCommand("copy")
    },
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

<style lang="less" scoped>
@import "assets/core.less";

.banner-block {
  margin-bottom: 60px;
}

.banner {
  position: relative;

  width: 100%;
  height: auto;
  min-height: 320px;

  @media @min1200 {
    border-radius: 12px;
  }
}

.banner__img-container {
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
  display: flex;

  overflow: hidden;

  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}

.banner__image {
  height: 100%;
  width: auto;

  @media @min580 {
    width: 100%;
    height: auto;
  }
}

.banner__background {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  min-height: 320px;

  box-sizing: border-box;
  padding: 20px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: rgba(0, 0, 0, 0.4);


  @media @min760 {
    padding: 40px;
  }

  @media @min1200 {
    border-radius: 12px;
  }
}

.banner__text {
  color: @WhiteColor;

  @media @max760 {
    font-size: 28px;
  }
}

.banner__article {
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 10px;
}

.banner__tip {
  border-color: @WhiteColor;
  color: @WhiteColor;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;

  margin-top: 40px;

  @media @min580 {
    flex-direction: row;
    max-width: 900px;
  }

  @media @min990 {
    gap: 16px;
  }


}
</style>
