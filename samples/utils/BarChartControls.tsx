import React from 'react';

interface BarChartControlsProps {
  width: number;
  height: number;
  barCategoryGap: string;
  barGap: number;
  layout: 'horizontal' | 'vertical';
  margin: { top: number; right: number; bottom: number; left: number };
  showXAxis: boolean;
  showYAxis: boolean;
  showCartesianGrid: boolean;
  showTooltip: boolean;
  showLegend: boolean;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setBarCategoryGap: (gap: string) => void;  // Actualiza a solo string
  setBarGap: (gap: number) => void;          // Actualiza a solo number
  setLayout: (layout: 'horizontal' | 'vertical') => void;
  setMargin: (margin: { top: number; right: number; bottom: number; left: number }) => void;
  setShowXAxis: (show: boolean) => void;
  setShowYAxis: (show: boolean) => void;
  setShowCartesianGrid: (show: boolean) => void;
  setShowTooltip: (show: boolean) => void;
  setShowLegend: (show: boolean) => void;
}

const BarChartControls: React.FC<BarChartControlsProps> = ({
  width,
  height,
  barCategoryGap,
  barGap,
  layout,
  margin,
  showXAxis,
  showYAxis,
  showCartesianGrid,
  showTooltip,
  showLegend,
  setWidth,
  setHeight,
  setBarCategoryGap,
  setBarGap,
  setLayout,
  setMargin,
  setShowXAxis,
  setShowYAxis,
  setShowCartesianGrid,
  setShowTooltip,
  setShowLegend,
}) => {
  const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>, side: string) => {
    const value = parseInt(e.target.value, 10);
    setMargin({ ...margin, [side]: value });
  };

  return (
    <form className="grid grid-cols-2 gap-4 mb-8">
      <div>
        <label className="form-label">
          Width:
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value, 10))}
            className="form-input ml-2 border rounded px-2 py-1"
          />
        </label>
      </div>
      <div>
        <label className="form-label">
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value, 10))}
            className="form-input ml-2 border rounded px-2 py-1"
          />
        </label>
      </div>
      <div>
        <label className="form-label">
          Bar Category Gap:
          <input
            type="text"
            value={barCategoryGap}
            onChange={(e) => setBarCategoryGap(e.target.value)}  // Asume string
            className="form-input ml-2 border rounded px-2 py-1"
          />
        </label>
      </div>
      <div>
        <label className="form-label">
          Bar Gap:
          <input
            type="number"
            value={barGap}
            onChange={(e) => setBarGap(parseInt(e.target.value, 10))}  // Asume number
            className="form-input ml-2 border rounded px-2 py-1"
          />
        </label>
      </div>
      <div>
        <label className="form-label">
          Layout:
          <select
            value={layout}
            onChange={(e) => setLayout(e.target.value as 'horizontal' | 'vertical')}
            className="form-input ml-2 border rounded px-2 py-1"
          >
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </label>
      </div>
      <div>
        <label className="form-label">
          Margin Top:
          <input
            type="number"
            value={margin.top}
            onChange={(e) => handleMarginChange(e, 'top')}
            className="form-input ml-2 border rounded px-2 py-1"
          />
        </label>
      </div>
      <div>
        <label className="form-label">
          Margin Right:
          <input
            type="number"
            value={margin.right}
            onChange={(e) => handleMarginChange(e, 'right')}
            className="form-input ml-2 border rounded px-2 py-1"
          />
        </label>
      </div>
      <div>
        <label className="form-label">
          Margin Bottom:
          <input
            type="number"
            value={margin.bottom}
            onChange={(e) => handleMarginChange(e, 'bottom')}
            className="form-input ml-2 border rounded px-2 py-1"
          />
        </label>
      </div>
      <div>
        <label className="form-label">
          Margin Left:
          <input
            type="number"
            value={margin.left}
            onChange={(e) => handleMarginChange(e, 'left')}
            className="form-input ml-2 border rounded px-2 py-1"
          />
        </label>
      </div>
      <div>
        <label className="form-label">
          Show X Axis:
          <input
            type="checkbox"
            checked={showXAxis}
            onChange={(e) => setShowXAxis(e.target.checked)}
            className="ml-2"
          />
        </label>
      </div>
      <div>
        <label className="form-label">
          Show Y Axis:
          <input
            type="checkbox"
            checked={showYAxis}
            onChange={(e) => setShowYAxis(e.target.checked)}
            className="ml-2"
          />
        </label>
      </div>
      <div>
        <label className="form-label">
          Show Cartesian Grid:
          <input
            type="checkbox"
            checked={showCartesianGrid}
            onChange={(e) => setShowCartesianGrid(e.target.checked)}
            className="ml-2"
          />
        </label>
      </div>
      <div>
        <label className="form-label">
          Show Tooltip:
          <input
            type="checkbox"
            checked={showTooltip}
            onChange={(e) => setShowTooltip(e.target.checked)}
            className="ml-2"
          />
        </label>
      </div>
      <div>
        <label className="form-label">
          Show Legend:
          <input
            type="checkbox"
            checked={showLegend}
            onChange={(e) => setShowLegend(e.target.checked)}
            className="ml-2"
          />
        </label>
      </div>
    </form>
  );
};

export default BarChartControls;
