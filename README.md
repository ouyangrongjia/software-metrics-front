# software_measure-metrics-front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## 项目配置

### IP地址配置

ip地址在 src/config/index.ts 中修改：

```tsx
// 将localhost和8080替换为对应的ip和端口即可
export const HOST_IP = 'http://localhost:8080/metrics'

```

### 配色修改

配色在 src/styles/index.css 中修改：

> 其他部件不要乱动，所有部件渲染所用颜色（除绘制图表所用颜色外）均引用:root中颜色，直接调整下列颜色即可

```css
:root{
    --button-color: #5d6894;
    --button-color1: #ffffff;
    --button-hover-color: #d9ccde;
    --button-hover-color1: #5d6894;
    --button-clicked-color: #959fcc;
    --button-clicked-color1: #959fcc;
    --main-background-color: #ffffff;
    --main-background-color1: #5d6894;
    --button-hover-background-color: #ffffff;
    --button-hover-background-color1: #ffffff;
    --button-clicked-background-color: #f8f8f8;
    --button-clicked-background-color1: #5d6894;
    --button-clicked-border-color: #ffffff;
    --button-clicked-border-color1: #ffffff;
    --button-hover-bottom-line-color: #d9ccde;
    --decoration-line-color: #cccccc;
    --shadow-color: rgba(0, 0, 0, 0.23);
}
```

## 项目仓库地址

GitHub地址：[https://github.com/Tairano/software_measure-metrics-front](https://github.com/Tairano/software_measure-metrics-front )

