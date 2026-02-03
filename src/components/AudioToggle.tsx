import { createSignal, onCleanup, onMount } from "solid-js";

const styles = `
  .audio-toggle {
    display: inline-flex;
    gap: 0.45rem;
    align-items: center;
    background: rgba(37, 55, 91, 0.4);
    border: 1px solid rgba(190, 140, 60, 0.5);
    color: var(--text);
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease,
      background 0.2s ease;
  }

  .audio-toggle:hover,
  .audio-toggle:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 12px 22px rgba(0, 0, 0, 0.28);
    outline: none;
    background: rgba(190, 140, 60, 0.22);
  }
`;

const AudioToggle = () => {
  const [isOn, setIsOn] = createSignal(false);
  let audio: HTMLAudioElement | null = null;

  const toggle = async () => {
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setIsOn(true);
      } catch (error) {
        setIsOn(false);
      }
    } else {
      audio.pause();
      setIsOn(false);
    }
  };

  onMount(() => {
    audio = new Audio("/audio/ocean.mp3");
    audio.loop = true;
  });

  onCleanup(() => {
    if (audio) {
      audio.pause();
      audio = null;
    }
  });

  return (
    <>
      <button
        type="button"
        aria-pressed={isOn()}
        class="audio-toggle"
        onClick={toggle}
      >
        <span aria-hidden="true">{isOn() ? "🔊" : "🔈"}</span>
        <span>{isOn() ? "Ocean hum on" : "Ocean hum off"}</span>
      </button>
      <style>{styles}</style>
    </>
  );
};

export default AudioToggle;
