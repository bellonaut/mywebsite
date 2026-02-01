import { onMount } from "solid-js";
import * as d3 from "d3";
import worldData from "../lib/world.json";

const GlobeComponent = () => {
  let mapContainer: HTMLDivElement | undefined;

  const visitedCountries = ["Nigeria", "United Kingdom", "Canada", "United States"];
  const waypoints = [
    { name: "Sokoto", coords: [5.227, 13.005], color: "#BE8C3C" },
    { name: "Sheffield", coords: [-1.4701, 53.3811], color: "#A36A46" },
    { name: "Edmonton", coords: [-113.4938, 53.5461], color: "#9C4E3B" },
    { name: "Rochester", coords: [-77.6088, 43.1566], color: "#AFC8D6" },
  ];

  onMount(() => {
    if (!mapContainer) return;

    const width = mapContainer.clientWidth;
    const height = 500;
    const sensitivity = 75;

    let projection = d3
      .geoOrthographic()
      .scale(250)
      .center([0, 0])
      .rotate([0, -30])
      .translate([width / 2, height / 2]);

    const initialScale = projection.scale();
    let pathGenerator = d3.geoPath().projection(projection);

    let svg = d3
      .select(mapContainer)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    svg
      .append("circle")
      .attr("fill", "#0c2f38")
      .attr("stroke", "#1f4f59")
      .attr("stroke-width", "0.5")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", initialScale);

    let map = svg.append("g");

    map
      .append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(worldData.features)
      .enter()
      .append("path")
      .attr("d", (d: any) => pathGenerator(d as any))
      .attr("fill", (d: { properties: { name: string } }) =>
        visitedCountries.includes(d.properties.name) ? "#9C4E3B" : "rgba(245,240,229,0.12)"
      )
      .style("stroke", "rgba(245,240,229,0.25)")
      .style("stroke-width", 0.35)
      .style("opacity", 0.9);

    const projectedWaypoints = waypoints
      .map((pt) => {
        const proj = projection(pt.coords as [number, number]);
        return proj ? { ...pt, projected: proj } : null;
      })
      .filter(Boolean) as { name: string; coords: [number, number]; color: string; projected: [number, number] }[];

    let journeyPath: d3.Selection<SVGPathElement, unknown, null, undefined> | null =
      null;
    let markerDots:
      | d3.Selection<SVGCircleElement, { name: string; coords: [number, number]; color: string }, SVGGElement, unknown>
      | null = null;

    if (projectedWaypoints.length) {
      const lineString = {
        type: "LineString",
        coordinates: projectedWaypoints.map((p) => p.coords),
      } as any;

      journeyPath = svg
        .append("path")
        .datum(lineString)
        .attr("fill", "none")
        .attr("stroke", "rgba(190,140,60,0.6)")
        .attr("stroke-width", 1.4)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .style("filter", "drop-shadow(0px 0px 6px rgba(190,140,60,0.3))");

      markerDots = svg
        .append("g")
        .selectAll("circle.marker")
        .data(waypoints)
        .enter()
        .append("circle")
        .attr("class", "marker")
        .attr("r", 4)
        .attr("fill", (d) => d.color)
        .attr("stroke", "#f5f0e5")
        .attr("stroke-width", 0.8);

      markerDots.append("title").text((d) => d.name);
    }

    d3.timer(() => {
      const rotate = projection.rotate();
      const k = sensitivity / projection.scale();
      projection.rotate([rotate[0] - 0.35 * k, rotate[1]]);

      svg.selectAll("path").attr("d", (d: any) => pathGenerator(d as any));

      if (journeyPath) {
        const lineString = {
          type: "LineString",
          coordinates: waypoints.map((p) => p.coords),
        } as any;
        journeyPath.attr("d", pathGenerator(lineString) as string);
      }

      if (markerDots) {
        markerDots
          .attr("cx", (d) => {
            const proj = projection(d.coords as [number, number]);
            return proj ? proj[0] : 0;
          })
          .attr("cy", (d) => {
            const proj = projection(d.coords as [number, number]);
            return proj ? proj[1] : 0;
          });
      }
    }, 260);
  });

  return (
    <div class="flex flex-col text-white justify-center items-center w-full h-full">
      <div class="w-full" ref={mapContainer}></div>
    </div>
  );
};

export default GlobeComponent;
