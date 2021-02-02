const heartSVG = "M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0 z"
const SVG_PATH = new Path2D(heartSVG);
const SCALE = 0.1;
const OFFSET = 80;


export const draw = (ctx, location) => {
    ctx.fillStyle = 'red';
    ctx.shadowColor = 'blue';
    ctx.shadowBlur = 15;
    ctx.save();
    ctx.scale(SCALE, SCALE);
    ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET);
    ctx.rotate(225 * Math.PI / 180);
    ctx.fill(SVG_PATH);
    ctx.restore();
}