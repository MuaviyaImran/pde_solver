import RangeSliderContainer from "@/components/RangeSlider/RangeSliderContainer";
import { useEffect, useState } from "react";
import BaseButton from "@/components/BaseButton";
import DropDown from "@/components/DropDown";
import Loader from "@/components/Loader";
import Prediction from "./Prediction";
export default function InputForm() {
  const [upperBound, setUpperBound] = useState(0);
  const [lowerBound, setLowerBound] = useState(0);
  const [minimumTemprature, setMinimumTemprature] = useState(0);
  const [maximumTemprature, setMaximumTemprature] = useState(0);
  const [layers, setLayers] = useState(5);
  const [functionEquation, setFunctionEquation] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null); // response.data
  const [error, setError] = useState("");
  const [requestBody, setRequestBody] = useState(null);
  const predictEquation = () => {
    if (functionEquation === "") {
      setError("Please select Inintial Condition from the dropdown");
      return;
    } else {
      setLoading(true);
      const f = functionEquation.includes("neg")
        ? functionEquation.replace("neg", "-").toLowerCase()
        : functionEquation;

      try {
        fetch("http://127.0.0.1:5000/run_code", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            xmax: upperBound,
            xmin: lowerBound,
            tmin: minimumTemprature,
            tmax: maximumTemprature,
            layers: layers,
            function: f,
          }),
        })
          .then((response) => response.json())
          .then((res) => {
            if ((res.status = "ok")) {
              setData(res.data);
              setRequestBody({
                upperBound: upperBound,
                lowerBound: lowerBound,
                minimumTemprature: minimumTemprature,
                maximumTemprature: maximumTemprature,
                function: f,
              });
            } else setError(res.message);
          })
          .catch((error) => {
            setLoading(false);
            setError("Error:", error);
          });
      } catch (error) {
        setLoading(false);
        setError("Caught error:", error);
      } finally {
        resetForm();
        console.log("Fetch operation attempted.");
      }
    }
  };
  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);
  useEffect(() => {
    if (error) setTimeout(() => setError(""), 3000);
  }, [error]);

  const resetForm = () => {
    setUpperBound(0);
    setLowerBound(0);
    setMinimumTemprature(0);
    setLayers(5);
    setMaximumTemprature(0);
    setFunctionEquation("");
  };
  if (loading) return <Loader />;
  else if (data)
    return (
      <Prediction
        prediction={data}
        requestBody={requestBody}
        setPrediction={setData}
      />
    );
  else
    return (
      <div className="max-w-[1200px] mx-auto lg:py-5 lg:px-7 px-6 py-3 flex flex-col gap-5 h-[90vh]">
        <div className="flex md:justify-between mt-20 justify-center md:items-end flex-col md:flex-row">
          <p className="font-extrabold mb-5 md:text-2xl text-xl lg:text-4xl uppercase">
            Let&apos;s Predict
          </p>
          <div className=" bg-white md:min-w-[230px] min-w-[190px] text-black p-3 rounded-lg text-xs md:text-sm">
            <p className="flex justify-between">
              <strong>Minimum Temprature:</strong>
              <span>{minimumTemprature}</span>
            </p>
            <p className="flex justify-between">
              <strong>Maximum Temprature:</strong>
              <span>{maximumTemprature}</span>
            </p>
            <p className="flex justify-between">
              <strong>Lower Bound:</strong> <span>{lowerBound}</span>
            </p>
            <p className="flex justify-between">
              <strong>Upper Bound:</strong> <span>{upperBound}</span>
            </p>
            <p className="flex justify-between">
              <strong>Layers:</strong> <span>{layers}</span>
            </p>
            <p className="flex justify-between">
              <strong>Initial Function:</strong>
              <span className="capitalize">
                {functionEquation ? functionEquation : "null"}
              </span>
            </p>
            <div className="flex justify-center md:my-2">
              <span onClick={resetForm} className="underline cursor-pointer">
                Reset
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:gap-14 md:gap-10 gap-5">
          <div className="w-full">
            <RangeSliderContainer
              min={-2}
              max={2}
              key={lowerBound}
              onChange={setLowerBound}
              initialValue={lowerBound}
              withLabel
              title="Lower Bound"
              range="-2 to 2"
            />
          </div>
          <div className="w-full">
            <RangeSliderContainer
              min={-2}
              max={2}
              key={upperBound}
              onChange={setUpperBound}
              initialValue={upperBound}
              withLabel
              title="Upper Bound"
              range="-2 to 2"
            />
          </div>
        </div>
        <div className="flex lg:gap-14 md:gap-10 gap-5 flex-col md:flex-row ">
          <div className="w-full">
            <RangeSliderContainer
              min={-2}
              max={2}
              key={minimumTemprature}
              onChange={setMinimumTemprature}
              initialValue={minimumTemprature}
              withLabel
              title="Minimum Temperature"
              range="-2 to 2"
            />
          </div>
          <div className="w-full">
            <RangeSliderContainer
              min={-2}
              max={2}
              key={maximumTemprature}
              onChange={setMaximumTemprature}
              initialValue={maximumTemprature}
              withLabel
              title="Maximum Temperature"
              range="-2 to 2"
            />
          </div>
        </div>
        <div className="flex lg:gap-14 md:gap-10 gap-5 flex-col md:flex-row ">
          <div className="w-full">
            <RangeSliderContainer
              min={1}
              max={9}
              key={layers}
              onChange={setLayers}
              initialValue={layers}
              withLabel
              title="No of Layers"
              range="1 to 9"
            />
          </div>
        </div>
        {error ? (
          <p className="text-red-500 text-center font-semibold uppercase">
            {error}
          </p>
        ) : (
          <p className="opacity-0">s</p>
        )}
        <DropDown title={functionEquation} onClick={setFunctionEquation} />
        <BaseButton onClick={predictEquation} title="Predict Equation" />
      </div>
    );
}
