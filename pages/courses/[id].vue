<template>
  <main>


    <BannerBlock class="banner-block"/>

    <div class="wrapper course-content wrapper_paddings">

      <div class="course-content__left">

        <div class="text-block">
          <h4 class="text text_h4">Описание курса</h4>
          <div class="text text-block__text text_normal">
            Обучение проводится на базе обучающей платформы (системы дистанционного обучения). В
            процессе обучения используются современные обучающие технологии. Материал разбит на несколько модулей,
            каждый из которых содержит теоретический
            материал, практические элементы, аудио и/или видеофрагменты. Каждый модуль завершается промежуточным тестом.
            Результаты
            тестирования отображаются в электронном дневнике слушателя.
            <br/>
            <br/>
            Итоговая аттестация по дополнительной профессиональной образовательной программе повышения квалификации
            проводится в форме зачета-тестирования и должна выявлять теоретическую и практическую подготовку
            обучающегося в
            соответствии с квалификационными требованиями и профессиональными стандартами.
          </div>
        </div>

        <ModulesBlock/>


        <div class="text-block">
          <h4 class="text text_h4">По итогам обучения выдается удостоверение о повышении квалификации в размере 36
            ЗЕТ</h4>
          <div class="text text-block__text text_normal">
            Данная программа дополнительного профессионального образования прошла экспертную оценку и опубликована на
            портале непрерывного медицинского и фармацевтического образования Минздрава России, для получения баллов,
            оформите заявку на сайте росминздрав edu.rosminzdrav.ru.
          </div>
        </div>

      </div>

      <CourseCoast/>
    </div>


  </main>
</template>

<style lang="less" scoped>
@import "assets/core.less";

.banner-block {
  margin-top: 60px;
  margin-bottom: 60px;
}

.text-block {

}

.text-block__text {
  margin-top: 20px;
}

.course-content {
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr;
  margin-bottom: 60px;

  @media @min990 {
    gap: 60px;
    margin-bottom: 120px;
  }

  @media @min1200  {
    grid-template-columns: 1fr 440px;
  }
}

.course-content__left {
  display: flex;
  flex-direction: column;
  gap: inherit;
}

.course-coast__buttons {

}

</style>
