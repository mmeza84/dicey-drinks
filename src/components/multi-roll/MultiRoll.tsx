import { useState } from "react";
import SingleRoll from "../single-roll/SingleRoll";

/**
 * MultiRoll Component
 *
 * rollArray: An array representing the die to use for each roll.
 *
 * This supports rolls of multiple die types.
 *
 * How are we going to get the values back to the parent component?
 */
type MultiRollProps = {
  rollArray: number[];
  handleValueClicked: (roll: number) => void;
};

export default function MultiRoll({
  rollArray,
  handleValueClicked,
}: MultiRollProps) {
  const [rollCount, setRollCount] = useState<number>(0);

  const handleValueClickedInternal = (roll: number) => {
    setRollCount(rollCount + 1);
    handleValueClicked(roll);
  };

  return (
    <div>
      <SingleRoll
        keyPrefix={`multi_roll`}
        dieValue={rollArray[0]}
        handleValueClicked={handleValueClickedInternal}
      />
    </div>
  );
}
