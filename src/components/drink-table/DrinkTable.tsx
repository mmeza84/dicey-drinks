import cx from "classnames";
import "./DrinkTable.scss";

type DrinkTableProps = {
  tableTitle: string;
  drinkList: string[];
  selected: string[];
};

export default function DrinkTable({
  tableTitle,
  drinkList,
  selected,
}: DrinkTableProps) {
  console.log("Drinktable selected:", selected);
  return (
    <div className="drink-table">
      <h4>{tableTitle}</h4>
      <div className="drink-table-content">
        {drinkList.map((drink, index) => (
          <div
            key={index}
            className={cx("drink-item", { selected: selected.includes(drink) })}
          >
            {index + 1}: {drink}
          </div>
        ))}
      </div>
    </div>
  );
}
