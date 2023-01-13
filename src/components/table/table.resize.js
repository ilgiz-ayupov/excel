export function resizeHandler($root, $resizer) {
  const resizeType = $resizer.data.resize;
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  let delta;

  document.onmousemove = (event) => {
    if (resizeType === "column") {
      delta = event.pageX - coords.right;
      $resizer.css({
        right: `${-delta}px`,
        bottom: `-${$root.getCoords().height}px`,
      });
    } else if (resizeType === "row") {
      delta = event.pageY - coords.bottom;
      $resizer.css({
        bottom: `${-delta}px`,
        right: `-${$root.getCoords().width}px`,
      });
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    if (resizeType === "column") {
      $resizer.css({
        right: "0px",
        bottom: "0px",
      });
      const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
      cells.forEach((cell) => {
        cell.style.width = `${coords.width + delta}px`;
      });
    } else if (resizeType === "row") {
      $resizer.css({
        bottom: "0px",
        right: "0px",
      });
      $parent.css({ height: coords.height + delta + "px" });
    }
  };
}
