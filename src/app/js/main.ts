import App from './utils/App';
import Canvas from './Canvas';

const app = new App();

app.isReady().then(() => {
  Canvas.render();
});
