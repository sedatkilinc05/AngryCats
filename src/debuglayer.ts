import { scene } from "./scene";

function addDebugLayer() {
    window.addEventListener('keydown', (ev: KeyboardEvent) => {
        // Shift+Ctrl+Alt+I
        console.log('[Angry Cats] keydown', ev, ev.shiftKey, ev.ctrlKey, ev.altKey, ev.key);
        if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.code === 'KeyI') {
            console.log('[Angry Cats] Shift+Ctrl+Alt+I pressed');
            if (scene.debugLayer.isVisible()) {
                scene.debugLayer.hide();
            } else {
                scene.debugLayer.show();
            }
        }
    });
}

export { addDebugLayer }