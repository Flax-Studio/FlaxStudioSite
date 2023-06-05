<script setup lang='ts'>
import { releasedAppsData } from '../data/CommonData';
import drawOnImage from '../public/app_images/draw_on_image.png'

const bigPara = "Draw On is a versatile drawing app that lets you create stunning illustrations and designs with ease. With its intuitive interface and powerful tools, you can draw rectangles, lines, circles, curves, and more with just a few taps and swipes."

</script>
<template>
    <HeaderComponent/>
    <AppLanding :app-name="'Draw On'" :small-para="'A simple & easy drawing app to show your creativity.'"
        :big-para="bigPara" :app-link="'https://play.google.com/store/apps/details?id=com.flaxstudio.drawon'"
        :app-images-link="drawOnImage" :privacy-link="'/draw-on/privacy'" />

    <AboutApp :app-paragraphs="[
        '**Draw On** is a versatile drawing app that lets you create stunning illustrations and designs with ease. With its intuitive interface and powerful tools, you can draw **rectangles, lines, circles, curves**, and more with just a few taps and swipes.',
        'Whether you\'re a **professional artist**, a **hobbyist**, or a **student**, Draw On has everything you need to unleash your creativity. You can choose from a wide range of **colors, brush sizes**, and textures to bring your ideas to life. You can also **save** your drawings and create a favorite list for easy access.',
        'With its simple yet powerful features, Draw On is perfect for anyone who loves to draw, doodle, or sketch on the go. So why wait? Download Draw On today and **start creating beautiful art!**'
    ]" />
    <AppFeatures :details="[
        { heading: 'Drawing Tools', description: 'The app should offer a variety of drawing tools such as a pen, pencil, brush, eraser, and more. Users should be able to easily switch between tools and customize the thickness and color of each.' },
        { heading: 'Shapes', description: 'The app should allow users to draw different shapes like rectangles, circles, and triangles, as well as free-form shapes like curves and lines. Users should be able to easily adjust the size and position of these shapes.' },
        { heading: 'Export & Import', description: 'The app should allow users to export their drawings in different formats like PNG, JPG, or SVG, and share them via email, social media, or other apps. It should also allow users to import images or photos to use as a reference or as a part of their drawing. ' },
        { heading: 'Undo & Redo', description: 'The app should offer the ability to undo and redo actions, giving users the freedom to experiment and make changes without fear of losing their work.' },
        { heading: 'Save & Favorites', description: 'The app should allow users to save their drawings and create a favorite list for easy access.' },
        { heading: 'User-friendly Interface', description: 'The app should have a user-friendly interface, with easy-to-use tools and clear instructions to help users get started quickly and efficiently. It should also be optimized for different screen sizes and orientations.' },
    ]"
        :ending="'By incorporating these features, your Draw On app can provide users with a powerful and enjoyable drawing experience.'" />

    <AppsAndGames :data="releasedAppsData" />
    <AppPrivacyCard :privacy-link="'./draw-on/privacy'" />
</template>
<style scoped></style>