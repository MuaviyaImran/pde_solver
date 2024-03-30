import { useState, useRef, useEffect, useCallback } from "react";

import RangeSlider from "@/components/RangeSlider/RangeSlider";

const RangeSliderContainer = ({
  min,
  max,
  initialValue,
  onChange,
  width,
  title,
  range,
  step = 1,
  withLabel = false,
}) => {
  const sliderRef = useRef(null);
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);

  const moveSliderPosition = useCallback(
    (event) => {
      const sliderBoundingClientRect =
        sliderRef.current?.getBoundingClientRect();

      if (sliderBoundingClientRect) {
        const posX =
          (event.clientX || event.touches[0].clientX) -
          sliderBoundingClientRect.left;
        const totalWidth = sliderBoundingClientRect.width;

        let selectedValue = Math.round((posX / totalWidth) * (max - min) + min);
        selectedValue = Math.max(min, selectedValue);
        selectedValue = Math.min(max, selectedValue);

        setCurrentValue(selectedValue);
      }
    },
    [max, min]
  );

  // Mouse events
  const onMouseUp = useCallback(() => {
    onChange(currentValue);
    setIsDragging(false);
  }, [currentValue, onChange]);

  const onMouseMove = useCallback(
    (event) => {
      if (isDragging) {
        moveSliderPosition(event);
      }
    },
    [isDragging, moveSliderPosition]
  );

  const onMouseDown = (event) => {
    moveSliderPosition(event);
    setIsDragging(true);
  };

  // Keyboard events
  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      let selectedValue = currentValue;

      if (event.key === "ArrowLeft") {
        selectedValue = Math.max(currentValue - step, min);
      } else if (event.key === "ArrowRight") {
        selectedValue = Math.min(currentValue + step, max);
      }

      setCurrentValue(selectedValue);
      onChange(selectedValue);
    }
  };

  // Touch events
  const onTouchStart = (event) => {
    setIsDragging(true);
    moveSliderPosition(event);
  };

  const onTouchMove = useCallback(
    (event) => {
      moveSliderPosition(event);
    },
    [moveSliderPosition]
  );

  const onTouchEnd = useCallback(() => {
    onChange(currentValue);
    setIsDragging(false);
  }, [currentValue, onChange]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove, {
        passive: true,
      });
      window.addEventListener("touchend", onTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, onMouseMove, onMouseUp, onTouchEnd, onTouchMove]);

  return (
    <div className="my-2">
      <p className="lg:mb-2 md:mb-3 mb-4 flex gap-3 items-center md:text-sm text-xs">
        <span className="uppercase font-semibold">{title}</span>
        <span className="italic">( {range} )</span>
      </p>
      <RangeSlider
        min={min}
        max={max}
        width={width}
        withLabel={withLabel}
        currentValue={currentValue}
        isDragging={isDragging}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onKeyDown={onKeyDown}
        sliderRef={sliderRef}
      />
    </div>
  );
};

export default RangeSliderContainer;
