import { ref, onMounted, onBeforeUnmount } from 'vue';

export const useWidthHeight = () => {
    // console.log("Here it is!")
    //
    // const windowWidth = ref(window.screen.width);
    // const windowHeight = ref(window.screen.height);
    //
    // const onResize = () => {
    //     windowWidth.value = window.screen.width;
    //     windowHeight.value = window.screen.height;
    // };
    //
    // onMounted(() => {
    //     window.addEventListener('resize', onResize);
    // });
    //
    // onBeforeUnmount(() => {
    //     window.removeEventListener('resize', onResize);
    // });
    //
    // const isWidth990 = () => windowWidth.value >= 990;
    // const isWidth760 = () => windowWidth.value >= 760;
    // const isWidth580 = () => windowWidth.value >= 540;

    const windowWidth = true;
    const windowHeight = true;
    const isWidth990 = () => true;
    const isWidth760 = () => true;
    const isWidth580 = () => true;

    return {
        windowWidth,
        windowHeight,
        isWidth990,
        isWidth760,
        isWidth580,
    };
};
