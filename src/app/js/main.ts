import App from './utils/App';
// @ts-ignore
import io from 'socket.io-client';
import Canvas from './Canvas';
import Perspective from './utils/Perspective';
import { Vector2 } from './utils/Vector2';

interface DronePosition {
  x: number;
  y: number;
}

const app = new App();

app.isReady().then(() => {
  const socket = io('https://dronie.vincentriva.fr');
  socket.on('connect', () => console.log('Connected to socket'));
  socket.on('disconnect', () => console.log('Disconnected to socket'));

  socket.on('DRONE:CALIBRATE', (data: DronePosition) => {
    console.log('Corner', data.x, data.y);
    Perspective.addCorners(new Vector2(data.x, data.y));
  });

  socket.on('DRONE:DETECT', (data: any) => {
    Canvas.setPosition(data.x, data.y);
  });
  Canvas.render();
});
