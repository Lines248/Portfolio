/**
 * makeDraggable
 * Lets a fixed-position element be moved around the screen and remembers
 * where the visitor left it.
 *
 * - Pointer Events cover mouse, touch and pen with one code path.
 * - Dragging only starts from the handle, so the element's own button
 *   still works with a normal click.
 * - Keyboard alternative on the handle: arrow keys move it (Shift = bigger
 *   steps), Home puts it back. Moving by drag is never the only way.
 * - Position is clamped to the viewport and re-clamped on resize.
 * - localStorage is optional: if it's blocked, dragging still works.
 */

const KEY_STEP = 16;
const KEY_STEP_LARGE = 64;
const EDGE = 8; // keep at least this many px from the viewport edge

export function makeDraggable(el, { handle, storageKey }) {
  if (!el || !handle) return;

  let dragOffset = null; // where inside the element the pointer grabbed it

  const clamp = (x, y) => {
    const maxX = window.innerWidth - el.offsetWidth - EDGE;
    const maxY = window.innerHeight - el.offsetHeight - EDGE;
    return {
      x: Math.min(Math.max(EDGE, x), maxX),
      y: Math.min(Math.max(EDGE, y), maxY),
    };
  };

  const place = (x, y) => {
    const pos = clamp(x, y);
    // Switch from the CSS default (bottom/right) to explicit coordinates
    el.style.left = `${pos.x}px`;
    el.style.top = `${pos.y}px`;
    el.style.right = 'auto';
    el.style.bottom = 'auto';
    return pos;
  };

  const save = (pos) => {
    try { localStorage.setItem(storageKey, JSON.stringify(pos)); } catch {}
  };

  const reset = () => {
    el.style.left = el.style.top = el.style.right = el.style.bottom = '';
    try { localStorage.removeItem(storageKey); } catch {}
  };

  const current = () => {
    const r = el.getBoundingClientRect();
    return { x: r.left, y: r.top };
  };

  // Restore last position
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
      place(saved.x, saved.y);
    }
  } catch {}

  // Pointer dragging
  handle.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    const r = el.getBoundingClientRect();
    dragOffset = { x: e.clientX - r.left, y: e.clientY - r.top };
    handle.setPointerCapture(e.pointerId);
    el.classList.add('is-dragging');
    e.preventDefault();
  });

  handle.addEventListener('pointermove', (e) => {
    if (!dragOffset) return;
    place(e.clientX - dragOffset.x, e.clientY - dragOffset.y);
  });

  const endDrag = () => {
    if (!dragOffset) return;
    dragOffset = null;
    el.classList.remove('is-dragging');
    save(current());
  };
  handle.addEventListener('pointerup', endDrag);
  handle.addEventListener('pointercancel', endDrag);

  // Keyboard moving
  handle.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? KEY_STEP_LARGE : KEY_STEP;
    const moves = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };

    if (e.key === 'Home') {
      e.preventDefault();
      reset();
      return;
    }
    if (!moves[e.key]) return;

    e.preventDefault();
    const { x, y } = current();
    const [dx, dy] = moves[e.key];
    save(place(x + dx, y + dy));
  });

  // Double-click the handle to send it home
  handle.addEventListener('dblclick', reset);

  // Keep it on screen when the window changes size
  window.addEventListener('resize', () => {
    if (!el.style.left) return; // still at the CSS default
    const { x, y } = current();
    place(x, y);
  });
}
