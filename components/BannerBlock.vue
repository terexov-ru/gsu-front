<template>
  <div class="wrapper">
    <div class="banner-block">
      <div class="banner">
        <img class="banner__image" src="~/assets/banner.png" alt="banner">
        <div class="banner__background">
          <div class="banner__article">
            <span class="tip banner__tip tip_small">артикул 5434342</span>
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
  display: flex;
  overflow: hidden;

  width: 100%;
  height: 330px;

  @media @min1200 {
    height: 440px;
    border-radius: 12px;
  }
}

.banner__image {
  width: auto;
  height: 100%;

  align-self: center;
  justify-self: center;

  @media @min580 {
    width: 100%;
    height: auto;
  }
}

.banner__background {
  position: absolute;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  padding: 20px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: rgba(0, 0, 0, 0.4);

  @media @min760 {
    padding: 40px;
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
  align-self: flex-end;
  gap: 10px;
}

.banner__tip {
  border-color: @WhiteColor;
  color: @WhiteColor;
}
</style>
