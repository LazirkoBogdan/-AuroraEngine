export default class DevTools {

  createTimeScaleListeners(container) {
    const style   = { fill: "#fff", fontSize: "160%" };
    const textObj = new PIXI.Text(` timeScale: ${core.tween.TweenMax.globalTimeScale()}`, style);
    container.addChild(textObj);

    window.addEventListener("keydown", (event) => {
      const currentTimeScale = Number(core.tween.TweenMax.globalTimeScale());

      if (((event.code.includes("Digit") || event.code.includes("Numpad")) && event.key !== "0") && event.ctrlKey) {
        core.tween.TweenMax.globalTimeScale(Number(event.key));
        core.display.SpineObject.prototype.setTimeScale(Number(event.key));
      }
      if ((event.code === "ArrowDown" || event.code === "ArrowLeft") && currentTimeScale > 0.1 && event.shiftKey) {
        const step = (currentTimeScale > 1) ? 1 : 0.1;
        core.tween.TweenMax.globalTimeScale(Number((currentTimeScale - step).toFixed(1)));
        core.display.SpineObject.prototype.setTimeScale(Number((currentTimeScale - step).toFixed(1)));
      }

      if ((event.code === "ArrowUp" || event.code === "ArrowRight") && currentTimeScale < 9 && event.shiftKey) {
        const step = (currentTimeScale >= 1) ? 1 : 0.1;
        core.tween.TweenMax.globalTimeScale(Number((currentTimeScale + step).toFixed(1)));
        core.display.SpineObject.prototype.setTimeScale(Number((currentTimeScale + step).toFixed(1)));
      }
      textObj.text = ` timeScale: ${core.tween.TweenMax.globalTimeScale()}`;
    });
  }

}