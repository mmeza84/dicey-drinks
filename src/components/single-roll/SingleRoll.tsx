import { generateRollArray } from "@/utils/utils";
import "./SingleRoll.scss";

type SingleRollProps = {
  dieValue: number;
  keyPrefix: string;
  handleValueClicked: (roll: number) => void;
};
export default function SingleRoll({
  dieValue,
  keyPrefix,
  handleValueClicked,
}: SingleRollProps) {
  return (
    <div className="single-roll">
      <div className="button-group">
        {generateRollArray(dieValue).map((roll) => (
          <button
            key={`${keyPrefix}_${roll}`}
            onClick={() => handleValueClicked(roll)}
          >
            {roll}
          </button>
        ))}
      </div>
    </div>
  );
}
