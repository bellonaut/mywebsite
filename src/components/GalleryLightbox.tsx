import { For, Show, createSignal, onCleanup, onMount } from "solid-js";

interface Props {
  images: string[];
}

const styles = `
  .gallery-shell {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .thumb-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.35rem;
  }
  .thumb {
    padding: 0;
    border: 1px solid rgba(245, 240, 229, 0.2);
    border-radius: 10px;
    background-size: cover;
    background-position: center;
    aspect-ratio: 1;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .thumb:hover,
  .thumb:focus-visible {
    transform: translateY(-3px);
    outline: none;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.28);
  }

  .open-button {
    align-self: flex-start;
    background: rgba(190, 140, 60, 0.18);
    border: 1px solid rgba(190, 140, 60, 0.5);
    color: var(--text);
    padding: 0.45rem 0.9rem;
    border-radius: 999px;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
  }
  .open-button:hover,
  .open-button:focus-visible {
    background: rgba(190, 140, 60, 0.32);
    outline: none;
    transform: translateY(-2px);
  }

  .lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.72);
    display: grid;
    place-items: center;
    z-index: 40;
    padding: 1.5rem;
  }
  .lightbox-inner {
    max-width: min(900px, 90vw);
    width: 100%;
    background: rgba(6, 42, 51, 0.9);
    border: 1px solid rgba(44, 90, 99, 0.7);
    border-radius: 16px;
    padding: 1rem;
    box-shadow: 0 18px 44px rgba(0, 0, 0, 0.45);
  }
  .lightbox img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    display: block;
  }
  .controls {
    display: flex;
    justify-content: space-between;
    margin-top: 0.75rem;
    gap: 0.5rem;
  }
  .controls button {
    flex: 1;
    background: rgba(175, 200, 214, 0.1);
    border: 1px solid rgba(245, 240, 229, 0.35);
    color: var(--text);
    padding: 0.45rem;
    border-radius: 10px;
    cursor: pointer;
  }
  .controls button:hover,
  .controls button:focus-visible {
    background: rgba(190, 140, 60, 0.28);
    outline: none;
  }
`;

const GalleryLightbox = (props: Props) => {
  const [open, setOpen] = createSignal(false);
  const [index, setIndex] = createSignal(0);

  const close = () => setOpen(false);
  const next = () => setIndex((prev) => (prev + 1) % props.images.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + props.images.length) % props.images.length);

  const handleKey = (event: KeyboardEvent) => {
    if (!open()) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowRight") next();
    if (event.key === "ArrowLeft") prev();
  };

  onMount(() => window.addEventListener("keydown", handleKey));
  onCleanup(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", handleKey);
    }
  });

  return (
    <>
      <div class="gallery-shell">
        <div class="thumb-grid" role="list">
          <For each={props.images.slice(0, 4)}>
            {(src, i) => (
              <button
                type="button"
                aria-label="Open gallery"
                class="thumb"
                role="listitem"
                onClick={() => {
                  setIndex(i());
                  setOpen(true);
                }}
                style={{ "background-image": `url(${src})` }}
              />
            )}
          </For>
        </div>
        <button
          type="button"
          class="open-button"
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
        >
          Open gallery
        </button>

        <Show when={open()}>
          <div class="lightbox" role="dialog" aria-modal="true">
            <div class="lightbox-inner">
              <img
                src={props.images[index()]}
                alt="Gallery item"
                loading="lazy"
                decoding="async"
              />
              <div class="controls">
                <button type="button" onClick={prev} aria-label="Previous image">
                  ←
                </button>
                <button type="button" onClick={close} aria-label="Close gallery">
                  ✕
                </button>
                <button type="button" onClick={next} aria-label="Next image">
                  →
                </button>
              </div>
            </div>
          </div>
        </Show>
      </div>
      <style>{styles}</style>
    </>
  );
};

export default GalleryLightbox;
