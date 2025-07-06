import supabase from "@/utils/supabase";
import useConfigurationStore from "@/store/configurationStore";
import useDrinkStore from "@/store/drinkStore";
import "./Roll.scss";
import { capitalize, getDieForIngredientCount } from "@/utils/utils";
import type { Ingredient } from "@/models/models";
import { useEffect } from "react";
import MultiRoll from "@/components/multi-roll/MultiRoll";
import SingleRoll from "@/components/single-roll/SingleRoll";
import DrinkTable from "@/components/drink-table/DrinkTable";

const DrinkRollStep = {
  STEP_1: 1,
  STEP_2: 2,
  STEP_3: 3,
  STEP_4: 4,
  STEP_5: 5,
  STEP_6: 6,
  FINALIZE: 7,
} as const;

export default function Roll() {
  /**
   * How roll a drink works:
   * Step 1: Roll a d4 to determine the drink type (even: cocktail, odd: shot).
   * Step 2: If shots, roll a d4 to determine the spirit count (1-4). If cocktails, roll a d6 to determine the spirit count (1-6).
   * Step 3: Roll a d10/12/20 to determine the spirits (based on how many spirits are available, round down to nearest dice).
   * Step 4: Roll a d4 to determine the mixer count (1-4).
   * Step 5: Roll a d10/12/20 to determine the mixers (based on how many mixers are available, round down to nearest dice).
   * Step 6: Roll a d4 to determine if flair is included (even: included).
   */
  const { ingredients, setIngredients } = useConfigurationStore(
    (state) => state
  );

  const spirits = ingredients.filter(
    (ingredient) => ingredient.type === "spirit"
  );
  const mixers = ingredients.filter(
    (ingredient) => ingredient.type === "mixer"
  );

  const spiritsRollDie = getDieForIngredientCount(spirits.length);
  const mixersRollDie = getDieForIngredientCount(mixers.length);

  const {
    drink,
    drinkRollStep,
    setDrinkRollStep,
    setDrinkType,
    setSpiritCount,
    setMixerCount,
    setFlairCount,
    resetDrink,
    addIngredient,
  } = useDrinkStore((state) => state);

  const fetchIngredients = async () => {
    const { data, error } = await supabase.from("ingredients").select();
    if (error) {
      console.error("Error fetching ingredients:", error);
    }

    setIngredients((data as Ingredient[]) || []);
  };

  const handleDrinkTypeRollClicked = async (d4Roll: number) => {
    if (d4Roll % 2 === 0) {
      setDrinkType("cocktail");
      setDrinkRollStep(DrinkRollStep.STEP_2);
    } else {
      setDrinkType("shot");
      setDrinkRollStep(DrinkRollStep.STEP_2);
    }
  };

  const handleSpiritCountRollClicked = (roll: number) => {
    setSpiritCount(roll);
    setDrinkRollStep(DrinkRollStep.STEP_3);
  };

  const handleSpiritAdded = async (roll: number) => {
    await addIngredient("spirits", spirits[roll - 1].name);
    if (drink.ingredients.spirits.length < drink.spiritCount - 1) {
      return;
    } else {
      setDrinkRollStep(DrinkRollStep.STEP_4);
    }
  };

  const handleMixerCountRollClicked = (roll: number) => {
    setMixerCount(roll);
    setDrinkRollStep(DrinkRollStep.STEP_5);
  };

  const handleMixerAdded = async (roll: number) => {
    await addIngredient("mixers", mixers[roll - 1].name);
    if (drink.ingredients.mixers.length < drink.mixerCount - 1) {
      return;
    } else {
      setDrinkRollStep(DrinkRollStep.STEP_6);
    }
  };

  const handleFlairCountRollClicked = (roll: number) => {
    if (roll % 2 === 0) {
      setFlairCount(1);
    } else {
      setFlairCount(0);
    }
    setDrinkRollStep(DrinkRollStep.FINALIZE);
  };

  const handleResetDrinkRoll = () => {
    resetDrink();
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div className="roll-a-drink">
      {drinkRollStep > DrinkRollStep.STEP_1 && (
        <div className="summary-table">
          {drinkRollStep > DrinkRollStep.STEP_1 && (
            <div className="summary-table-row">
              <div className="summary-table-key">Drink Type</div>
              <div className="summary-table-value">
                {capitalize(drink.drinkType)}
              </div>
            </div>
          )}
          {drinkRollStep > DrinkRollStep.STEP_3 && (
            <div className="summary-table-row">
              <div className="summary-table-key">Spirits</div>
              <div className="summary-table-value">
                {drink.ingredients?.spirits?.map((s) => (
                  <div key={s} className="ingredient-item">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          )}
          {drinkRollStep > DrinkRollStep.STEP_5 && (
            <div className="summary-table-row">
              <div className="summary-table-key">Mixers</div>
              <div className="summary-table-value">
                {drink.ingredients?.mixers?.map((m) => (
                  <div key={m} className="ingredient-item">
                    {m}
                  </div>
                ))}
              </div>
            </div>
          )}
          {drinkRollStep > DrinkRollStep.STEP_6 && (
            <div className="summary-table-row">
              <div className="summary-table-key">Flair added</div>
              <div className="summary-table-value">
                {drink.flairCount ? "Yes" : "No"}
              </div>
            </div>
          )}
        </div>
      )}
      {/** Step 1 */}
      {drinkRollStep === DrinkRollStep.STEP_1 && (
        <div className="step">
          <h3>Step 1: Roll a D4 for drink type!</h3>
          <SingleRoll
            dieValue={4}
            keyPrefix="drink_type_roll"
            handleValueClicked={handleDrinkTypeRollClicked}
          />
        </div>
      )}
      {/** Step 2 */}
      {drinkRollStep === DrinkRollStep.STEP_2 && (
        <div className="step">
          <h3>
            Step 2: Roll a {drink.drinkType === "cocktail" ? `D6` : "D4"} for
            spirits.
          </h3>
          <SingleRoll
            dieValue={drink.drinkType === "cocktail" ? 6 : 4}
            keyPrefix="spirit_count_roll"
            handleValueClicked={handleSpiritCountRollClicked}
          />
        </div>
      )}
      {/** Step 3 */}
      {drinkRollStep === DrinkRollStep.STEP_3 && (
        <div className="step">
          <h3>Step 3: Roll a D{spiritsRollDie} for each spirit!</h3>
          <DrinkTable
            tableTitle="Spirits"
            drinkList={spirits.map((s) => s.name)}
            selected={drink.ingredients.spirits}
          />
          <MultiRoll
            rollArray={Array(drink.spiritCount).fill(spiritsRollDie)}
            handleValueClicked={handleSpiritAdded}
          />
        </div>
      )}
      {/** Step 4 */}
      {drinkRollStep === DrinkRollStep.STEP_4 && (
        <div className="step">
          <h3>
            Step 4: Roll a {drink.drinkType === "cocktail" ? `D6` : "D4"} for
            mixers.
          </h3>
          <SingleRoll
            dieValue={drink.drinkType === "cocktail" ? 6 : 4}
            keyPrefix="mixer_count_roll"
            handleValueClicked={handleMixerCountRollClicked}
          />
        </div>
      )}
      {/** Step 5 */}
      {drinkRollStep === DrinkRollStep.STEP_5 && (
        <div className="step">
          <h3>Step 3: Roll a D{mixersRollDie} for each mixer!</h3>
          <DrinkTable
            tableTitle="Mixers"
            drinkList={mixers.map((m) => m.name)}
            selected={drink.ingredients.mixers}
          />
          <MultiRoll
            rollArray={Array(drink.mixerCount).fill(mixersRollDie)}
            handleValueClicked={handleMixerAdded}
          />
        </div>
      )}
      {/** Step 6 */}
      {drinkRollStep === DrinkRollStep.STEP_6 && (
        <div className="step">
          <h3>Step 6: Roll a D4 for flair!</h3>
          <SingleRoll
            dieValue={4}
            keyPrefix="flair_count_roll"
            handleValueClicked={handleFlairCountRollClicked}
          />
        </div>
      )}
      {/** Actions */}
      <div className="actions">
        <button onClick={handleResetDrinkRoll}>Reset Roll</button>
      </div>
    </div>
  );
}
