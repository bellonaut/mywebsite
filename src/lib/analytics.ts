declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string | number> }) => void;
  }
}

export function trackEvent(eventName: string, props?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  window.plausible?.(eventName, props ? { props } : undefined);
}

export const analytics = {
  downloadResume: () => trackEvent("Download Resume"),
  bookCall: () => trackEvent("Book Call"),
  emailClick: () => trackEvent("Email Click"),
  linkedinClick: () => trackEvent("LinkedIn Click"),
  githubClick: () => trackEvent("GitHub Click"),
  projectClick: (projectName: string) => trackEvent("Project Click", { project: projectName }),
  articleClick: (articleTitle: string) => trackEvent("Article Click", { article: articleTitle }),
  healthDesertPageOpen: () => trackEvent("Health Desert Page Open"),
  healthDesertAppLaunch: () => trackEvent("Health Desert App Launch"),
  healthDesertWhitepaperOpen: () => trackEvent("Health Desert Whitepaper Open"),
  healthDesertDemoOpen: () => trackEvent("Health Desert Demo Open"),
};
