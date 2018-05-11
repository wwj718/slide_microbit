# readme
### 书写ppt
在jupyter notebook中选择 `view -> Cell Toolbar -> Slideshow`

### 编译预览

jupyter-nbconvert --to slides microbit_slide.ipynb --reveal-prefix="http://cdn.bootcss.com/reveal.js/3.3.0" --post serve

在编译出的`microbit_slide.slides.html` </html>之前加上`<script src="microbit_ble.js"></script>`

# usage
microbit烧录`FD18_NRF51_MICROBIT.hex`固件

直接在chrome中打开microbit_slide.slides.html 即可
