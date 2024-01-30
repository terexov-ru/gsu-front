<template>
  <main>
    <div class="wrapper basket-page wrapper_paddings">

      <h2 class="text text_h2">Корзина</h2>

      <div class="basket block_margin-bottom">

        <div class="basket__container">

          <div class="column column_gap20">
            <div class="basket__info">
              <div class="text basket__info__count text_normal text_light">В корзине 2 товара</div>
              <div class="text basket__info__clean text_normal">Очистить корзину</div>
            </div>

            <BasketCard/>
          </div>


          <BillCard/>

        </div>

      </div>

    </div>

  </main>
</template>

<style lang="less" scoped>
@import "assets/core.less";

.basket-page {
  margin-top: 80px;
}

.basket {
  margin-top: 40px;
}

.basket__info {
  display: flex;
  justify-content: space-between;
}

.basket__info__clean {
  color: @DangerColor;
}

.basket__container {
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media @min1200 {
    display: grid;
    grid-template-columns: 1fr 440px;
  }
}

</style>
