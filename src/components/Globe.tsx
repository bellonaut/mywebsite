import { onMount, onCleanup } from "solid-js";
import * as d3 from "d3";
import worldData from "../lib/world.json";

export type Props = {
  /**
   * widget: small aesthetic globe (no interaction, faster spin)
   * full: travel page (drag to rotate, calmer spin)
   */
  variant?: "widget" | "full";
};

const GlobeComponent = (props: Props = {}) => {
  let mapContainer: HTMLDivElement | undefined;

  const isFull = props.variant === "full";

  // Visited countries (use dataset-friendly names)
  const visited = new Set([
    "France",
    "Canada",
    "India",
    "Nigeria",
    "Saudi Arabia",
    "Saudi Arabia",
    "Qatar",
    "United Arab Emirates",
    "Netherlands",
    "Spain",
    "United Kingdom",
    "United States",
  ]);

  // Some datasets have alternate names
  const aliases: Record<string, string> = {
    Marocco: "Morocco",
    "United States of America": "United States",
    "Russian Federation": "Russia",
    Czechia: "Czech Republic",
    UAE: "United Arab Emirates",
    Dubai: "United Arab Emirates",
    Washington: "United States",
  };

  const isVisited = (name: string) => visited.has(aliases[name] ?? name);

  // Journey coordinates [lon, lat]
  // (These are good approximations; tweak if you want)
  const journeyStops = [
    { label: "Sokoto", coords: [5.2431, 13.0667] },
    { label: "Sheffield", coords: [-1.4701, 53.3811] },
    { label: "Edmonton", coords: [-113.4909, 53.5461] },
    { label: "Rochester", coords: [-77.6109, 43.1566] },
  ] as const;

  onMount(() => {
    if (!mapContainer) return;

    const root = d3.select(mapContainer);
    root.style("position", "relative").style("width", "100%").style("height", "100%");

    const svg = root
      .append("svg")
      .attr("role", "img")
      .attr("aria-label", "Rotating globe with journey arcs")
      .style("width", "100%")
      .style("height", "100%")
      .style("display", "block");

    const tooltip = root
      .append("div")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("padding", "6px 10px")
      .style("border-radius", "999px")
      .style("font-size", "12px")
      .style("letter-spacing", "0.08em")
      .style("text-transform", "uppercase")
      .style("background", "rgba(10, 20, 30, 0.85)")
      .style("border", "1px solid rgba(175, 200, 214, 0.3)")
      .style("color", "rgba(235, 245, 255, 0.9)")
      .style("box-shadow", "0 10px 20px rgba(0, 0, 0, 0.35)")
      .style("opacity", "0")
      .style("transform", "translate(-50%, -140%)");

    // Theme colors (blue panels vibe)
    const oceanFill = "rgba(10, 36, 54, 0.90)";
    const oceanStroke = "rgba(175, 200, 214, 0.35)";
    const landFill = "rgba(245, 240, 229, 0.10)";
    const landStroke = "rgba(175, 200, 214, 0.25)";
    const visitedFill = "rgba(56, 189, 248, 0.22)"; // soft cyan tint on visited
    const visitedStroke = "rgba(56, 189, 248, 0.55)";
    const journeyStroke = "rgba(216, 30, 91, 0.85)"; // accent path
    const journeyGlow = "rgba(216, 30, 91, 0.30)";
    const nodeFill = "rgba(216, 30, 91, 0.95)";

    // Layers (order matters)
    const g = svg.append("g");
    const ocean = g.append("circle");
    const landG = g.append("g").attr("class", "countries");
    const arcsG = g.append("g").attr("class", "journey-arcs");
    const nodesG = g.append("g").attr("class", "journey-nodes");

    // Projection/path – sized by ResizeObserver
    const projection = d3.geoOrthographic().center([0, 0]).rotate([0, -25]);
    const path = d3.geoPath(projection as any);

    // Build journey segments between stops
    const segments = journeyStops.slice(0, -1).map((s, i) => ({
      from: s,
      to: journeyStops[i + 1],
    }));

    // Helper: arc points along a great-circle
    const arcPoints = (a: [number, number], b: [number, number], steps = 64) => {
      const interp = d3.geoInterpolate(a, b);
      return d3.range(steps + 1).map((t) => interp(t / steps));
    };

    // Line generator in screen space
    const line = d3
      .line<[number, number]>()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(d3.curveCatmullRom.alpha(0.6));

    const arcGeos = segments.map((seg) => arcPoints(seg.from.coords as any, seg.to.coords as any));

    const updateLayers = () => {
      landG.selectAll("path").attr("d", (d: any) => path(d as any)!);

      const arcScreen = arcGeos
        .map((pts) =>
          pts
            .map((p) => projection(p as any))
            .filter(Boolean) as [number, number][]
        )
        .filter((pts) => pts.length > 2);

      arcsG
        .selectAll("path")
        .data(arcScreen)
        .join("path")
        .attr("d", (pts) => line(pts)!)
        .attr("fill", "none")
        .attr("stroke", journeyStroke)
        .attr("stroke-width", 1.6)
        .attr("opacity", 0.9)
        .style("filter", `drop-shadow(0 0 8px ${journeyGlow})`);

      const nodePts = journeyStops
        .map((s) => {
          const p = projection(s.coords as any);
          return p ? { ...s, p } : null;
        })
        .filter(Boolean) as Array<{ label: string; coords: readonly [number, number]; p: [number, number] }>;

      nodesG
        .selectAll("circle")
        .data(nodePts, (d: any) => d.label)
        .join("circle")
        .attr("cx", (d) => d.p[0])
        .attr("cy", (d) => d.p[1])
        .attr("r", 3.2)
        .attr("fill", nodeFill)
        .attr("opacity", 0.95)
        .style("filter", `drop-shadow(0 0 10px ${journeyGlow})`);
    };

    // Render/update everything on resize
    const resize = () => {
      if (!mapContainer) return;
      const rect = mapContainer.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);

      svg.attr("viewBox", `0 0 ${width} ${height}`);

      const r = Math.min(width, height) * 0.43;
      projection.translate([width / 2, height / 2]).scale(r);

      ocean
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("r", r)
        .attr("fill", oceanFill)
        .attr("stroke", oceanStroke)
        .attr("stroke-width", 1);

      // Countries
      landG
        .selectAll("path")
        .data((worldData as any).features)
        .join("path")
        .attr("d", (d: any) => path(d as any)!)
        .attr("fill", (d: any) => (isVisited(d?.properties?.name) ? visitedFill : landFill))
        .attr("stroke", (d: any) => (isVisited(d?.properties?.name) ? visitedStroke : landStroke))
        .attr("stroke-width", (d: any) => (isVisited(d?.properties?.name) ? 0.9 : 0.45))
        .attr("opacity", 0.95)
        .style("filter", (d: any) =>
          isVisited(d?.properties?.name)
            ? "drop-shadow(0 0 6px rgba(56, 189, 248, 0.22))"
            : "none"
        )
        .on("mousemove", (event: MouseEvent, d: any) => {
          const name = d?.properties?.name;
          if (!isVisited(name)) {
            tooltip.style("opacity", "0");
            return;
          }
          tooltip.text(name);
          tooltip
            .style("left", `${event.offsetX}px`)
            .style("top", `${event.offsetY}px`)
            .style("opacity", "1");
        })
        .on("mouseleave", () => {
          tooltip.style("opacity", "0");
        });

      updateLayers();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(mapContainer);

    // Smooth rotation (time-based)
    const degreesPerSecond = isFull ? 3.5 : 6.0;
    let isDragging = false;
    const timer = d3.timer((elapsed) => {
      if (isDragging) return;
      const t = elapsed / 1000;
      const rot = projection.rotate();
      projection.rotate([-(t * degreesPerSecond), rot[1], rot[2] || 0]);

      updateLayers();
    });

    // Initial draw
    resize();

    if (isFull) {
      svg.style("cursor", "grab");
      const sensitivity = 0.25;
      const dragBehavior = d3
        .drag<SVGSVGElement, unknown>()
        .on("start", () => {
          isDragging = true;
          svg.style("cursor", "grabbing");
        })
        .on("drag", (event) => {
          const rot = projection.rotate();
          projection.rotate([rot[0] + event.dx * sensitivity, rot[1] - event.dy * sensitivity, rot[2] || 0]);
          updateLayers();
        })
        .on("end", () => {
          isDragging = false;
          svg.style("cursor", "grab");
        });

      svg.call(dragBehavior as any);
    }

    onCleanup(() => {
      timer.stop();
      ro.disconnect();
      tooltip.remove();
      svg.remove();
    });
  });

  return (
    <div class="w-full h-full">
      <div
        ref={mapContainer}
        class="w-full h-full"
        style={isFull ? "" : "pointer-events:none"}
      ></div>
    </div>
  );
};

export default GlobeComponent;
