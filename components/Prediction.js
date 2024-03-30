import Image from "next/image";
import BaseButton from "@/components/BaseButton";
export default function Prediction({ prediction, requestBody, setPrediction }) {
  const convertToHumanReadable = (minutes) => Number(minutes).toFixed(9);
  const rePredict = () => {
    setPrediction(null);
  };
  return (
    <div className="max-w-[1200px] mx-auto lg:py-5 lg:px-7 px-5 py-3 flex flex-col gap-5 justify-center">
      <div className="text-right">
        <BaseButton onClick={rePredict} title="Repredict" />
      </div>
      <div class="relative w-full shadow-md sm:rounded-lg bg-white px-4">
        <table class="w-full text-sm text-left  rtl:text-right text-gray-500 ">
          <tr>
            <th
              scope="col"
              class="px-2 pt-4 text-xl font-medium whitespace-nowrap"
            >
              Prediction Table
            </th>
          </tr>
          <tbody className="text-xs md:text-sm lg:text-base">
            <tr class="flex flex-col lg:flex-row lg:gap-5 md:gap-3">
              <div className="w-full border-b flex justify-between">
                <th scope="row" class="px-2 py-4 font-medium whitespace-nowrap">
                  No of Layers
                </th>
                <td class="px-2 py-4">{prediction.num_of_layers}</td>
              </div>
              <div className="w-full border-b flex justify-between">
                <th scope="row" class="px-2 py-4 font-medium whitespace-nowrap">
                  No of Neurons Per Layer
                </th>
                <td class="px-2 py-4 ">{prediction.num_neurons_per_layer}</td>
              </div>
            </tr>
            <tr class="lg:gap-5 md:gap-3 flex flex-col lg:flex-row">
              <div className="w-full border-b flex justify-between">
                <th scope="row" class="px-2 py-4 font-medium whitespace-nowrap">
                  Training Computation
                </th>
                <td class="px-2 py-4">
                  {convertToHumanReadable(
                    prediction.training_data.computation_time
                  )}{" "}
                  seconds
                </td>
              </div>
              <div className="w-full border-b flex justify-between">
                <th scope="row" class="px-2 py-4 font-medium whitespace-nowrap">
                  Spicy Optimizer
                </th>
                <td class="px-2 py-4">
                  {convertToHumanReadable(
                    prediction.spicy_optimizer.computation_time
                  )}{" "}
                  seconds
                </td>
              </div>
            </tr>
            <tr class="flex lg:gap-5 md:gap-3 flex-col lg:flex-row">
              <div className="w-full border-b flex justify-between">
                <th scope="row" class="px-2 py-4 font-medium whitespace-nowrap">
                  Eikonal Identification
                </th>
                <td class="px-2 py-4">
                  {convertToHumanReadable(
                    prediction.eikonal_identification.computation_time
                  )}{" "}
                  seconds
                </td>
              </div>
              <div className="w-full border-b flex justify-between">
                <th scope="row" class="px-2 py-4 font-medium whitespace-nowrap">
                  Eikonal Solver
                </th>
                <td class="px-2 py-4">
                  {convertToHumanReadable(
                    prediction.eikonal_solver.computation_time
                  )}{" "}
                  seconds
                </td>
              </div>
            </tr>
            <tr class="flex lg:gap-5 md:gap-3 flex-col lg:flex-row">
              <div className="w-full border-b flex justify-between">
                <th scope="row" class="px-2 py-4 font-medium whitespace-nowrap">
                  Mean Of Lambda
                </th>
                <td class="px-2 py-4">
                  {convertToHumanReadable(
                    prediction.lambda_computation.mean_of_lambda
                  )}{" "}
                  seconds
                </td>
              </div>
              <div className="w-full border-b flex justify-between">
                <th scope="row" class="px-2 py-4 font-medium whitespace-nowrap">
                  STD of Lambda
                </th>
                <td class="px-2 py-4">
                  {convertToHumanReadable(
                    prediction.lambda_computation.std_of_lambda
                  )}{" "}
                  seconds
                </td>
              </div>
            </tr>
            <tr class="flex lg:gap-5 md:gap-3 ">
              <div className="w-full border-b flex justify-between">
                <th scope="row" class="px-2 py-4 font-medium whitespace-nowrap">
                  Xmax
                </th>
                <td class="px-2 py-4">{requestBody.upperBound}</td>
              </div>
              <div className="w-full border-b flex justify-between">
                <th scope="row" class="px-2 py-4 font-medium whitespace-nowrap">
                  Xmin
                </th>
                <td class="px-2 py-4">{requestBody.lowerBound}</td>
              </div>
            </tr>
            <tr class="flex lg:gap-5 md:gap-3">
              <div className="w-full border-b flex justify-between">
                <th scope="row" class="px-2 py-4 font-medium whitespace-nowrap">
                  Tmax
                </th>
                <td class="px-2 py-4">{requestBody.maximumTemprature}</td>
              </div>
              <div className="w-full border-b flex justify-between">
                <th scope="row" class="px-2 py-4 font-medium whitespace-nowrap">
                  Tmin
                </th>
                <td class="px-2 py-4">{requestBody.minimumTemprature}</td>
              </div>
            </tr>
            <tr class="flex lg:gap-5 md:gap-3 ">
              <div className="w-full border-b flex justify-between">
                <th scope="row" class="px-2 py-4 font-medium whitespace-nowrap">
                  Lambda Error
                </th>
                <td class="px-2 py-4">
                  {convertToHumanReadable(prediction.lambda_rel_error)}
                </td>
              </div>
              <div className="w-full border-b flex justify-between">
                <th scope="row" class="px-2 py-4 font-medium whitespace-nowrap">
                  Function
                </th>
                <td class="px-2 py-4">{requestBody.function}</td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex gap-3 flex-col lg:flex-row">
        <Image
          className="md:w-1/2 w-full rounded-lg"
          src={prediction.solution_of_burgers.image}
          width={450}
          height={600}
          alt="Burger Solution"
        />
        <Image
          className="md:w-1/2 w-full rounded-lg"
          src={prediction.solution_of_burgers.loss}
          width={450}
          height={600}
          alt="Burger Solution Loss"
        />
      </div>
      <div className="flex justify-center -mt-2 md:mt-0 w-full">
        <Image
          className="rounded-lg"
          src={prediction.collocation_points}
          width={450}
          height={600}
          alt="Collocation Points"
        />
      </div>
    </div>
  );
}
