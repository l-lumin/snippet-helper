"use client";
import { roboto, sourGummy } from "@/ui/fonts";
import { forwardRef, useRef, useState } from "react";

interface SVGProps {
  width: number;
  height: number;
  bgColor?: string;
  text?: string;
  fontSize?: number;
  textColor?: string;
}

export const SVG = forwardRef<SVGSVGElement, SVGProps>(
  (
    {
      width,
      height,
      bgColor = "#000000",
      text,
    //   fontSize = Math.min(width, height) / 8,
      fontSize = 60,
      textColor = "#ffffff",
    }: SVGProps,
    ref
  ) => {
    const lines = text ? text.split("\n") : [];
    const lineHeight = 1.2 * fontSize;
    const totalHeight = lines.length * lineHeight;
    const startY = height / 2 - totalHeight / 2 + fontSize * 0.4;

    return (
      <svg
        ref={ref}
        id="svg-icon"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        {/* <circle
          cx={width / 2}
          cy={height / 2}
          r={Math.min(width, height) / 2}
          fill={bgColor}
        /> */}
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={bgColor}></rect>
        {lines.length === 1 ? (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            alignmentBaseline="middle"
            fill={textColor}
            fontSize={fontSize}
            fontWeight="bold"
            fontFamily="Sour Gummy, sans-serif"
          >
            {text}
          </text>
        ) : (
          <text
            x="50%"
            y={startY}
            textAnchor="middle"
            fill={textColor}
            fontSize={fontSize}
            fontWeight="bold"
            fontFamily="Lora, sans-serif"
          >
            {lines.map((line, index) => (
              <tspan
                key={index}
                x="50%"
                dy={index === 0 ? "0" : `${lineHeight}px`}
              >
                {line}
              </tspan>
            ))}
          </text>
        )}
      </svg>
    );
  }
);

const saveSVGasPNG = (
  svgElementRef: React.RefObject<SVGSVGElement | null>,
  fileName = "icon.png"
) => {
  const svg = svgElementRef.current;
  if (!svg) return;

  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement("canvas");
  canvas.width = svg.width.baseVal.value;
  canvas.height = svg.height.baseVal.value;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const img = new Image();
  img.crossOrigin = "anonymous";

  img.src =
    "data:image/svg+xml;charset=utf-8;base64," +
    btoa(decodeURIComponent(encodeURIComponent(svgData)));

  img.onload = () => {
    ctx.drawImage(img, 0, 0);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = fileName;

    link.click();
  };

  img.onerror = () => {
    alert("Error loading the SVG image.");
  };
};

export default function Page() {
  const svgRef = useRef<SVGSVGElement>(null);

  const [bgColor, setBgColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#ffffff");
  const [text, setText] = useState("Icon");
  const [size, setSize] = useState(200);

  const handleBgColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBgColor(event.target.value);
  };
  const handleTextColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextColor(event.target.value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(event.target.value));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-4">
        <label className="mr-4">Background Color</label>
        <input
          type="color"
          name="bgColor"
          value={bgColor}
          onChange={handleBgColorChange}
          title="Background Color"
        />
      </div>
      <div className="mb-4">
        <label className="mr-4">Text Color</label>
        <input
          type="color"
          name="textColor"
          value={textColor}
          onChange={handleTextColorChange}
          title="Text Color"
        />
      </div>
      <div className="mb-4">
        <label className="mr-4">Icon Size</label>
        <input
          type="number"
          name="size"
          value={size}
          onChange={handleSizeChange}
          className="w-full"
          title="Size"
        />
      </div>
      <div className="mb-4">
        <label className="mr-4">Icon Size</label>
        <input
          type="number"
          name="size"
          value={size}
          onChange={handleSizeChange}
          className="w-full"
          title="Size"
        />
      </div>
      <div className="mb-4">
        <label className="mr-4">Text</label>
        <textarea
          name="text"
          value={text}
          onChange={handleTextChange}
          rows={2}
          className="w-full max-w-full p-4 mb-4 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
      <div className={`${roboto.className} ${sourGummy.className}`}>
        <SVG
          ref={svgRef}
          width={size}
          height={size}
          bgColor={bgColor}
          text={text}
          textColor={textColor}
        />
      </div>
      <button
        onClick={() => saveSVGasPNG(svgRef)}
        className="w-full px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Export
      </button>
    </div>
  );
}
