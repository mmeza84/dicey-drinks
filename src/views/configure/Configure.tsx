import { useEffect, useState } from "react";
import "./Configure.scss";
import supabase from "@/utils/supabase";
import useConfigurationStore from "@/store/configurationStore";
import type { Ingredient } from "@/models/models";
import Card from "@/components/card/Card";

export default function Configure() {
  const INGREDIENTS_TABLE = "DD_Ingredients";
  const { ingredients, setIngredients, addIngredient, removeIngredient } =
    useConfigurationStore((state) => state);

  const availableSpirits =
    ingredients?.filter((ingredient) => ingredient.type === "spirit") || [];
  const availableMixers =
    ingredients?.filter((ingredient) => ingredient.type === "mixer") || [];
  const availableFlair =
    ingredients?.filter((ingredient) => ingredient.type === "flair") || [];

  const [newSpirit, setNewSpirit] = useState<string>("");
  const [newMixer, setNewMixer] = useState<string>("");
  const [newFlair, setNewFlair] = useState<string>("");

  const handleAddSpirit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddIngredient("spirit", newSpirit.trim());
    setNewSpirit("");
  };

  const handleAddMixer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddIngredient("mixer", newMixer.trim());
    setNewMixer("");
  };

  const handleAddFlair = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddIngredient("flair", newFlair.trim());
    setNewFlair("");
  };

  const handleAddIngredient = async (type: string, value: string) => {
    if (value === "") {
      return;
    }

    console.log(`Adding ${type}: ${value}`);
    const result = await supabase
      .from(INGREDIENTS_TABLE)
      .insert({
        type: type,
        name: value,
      })
      .select()
      .single();
    if (result.error) {
      console.error(`Error adding ${type}:`, result.error);
      return;
    }
    console.log(`Successfully added ${type}:`, result.data);
    addIngredient(result.data as Ingredient);
  };

  const handleDelete = async (ingredientId: number) => {
    console.log(`Deleting ${ingredientId}`);
    const result = await supabase.from(INGREDIENTS_TABLE).delete().match({
      id: ingredientId,
    });

    if (result.error) {
      console.error(`Error deleting ingredient ${ingredientId}:`, result.error);
      return;
    }
    removeIngredient(ingredientId);
  };

  const fetchIngredients = async () => {
    try {
      const result = await supabase.from(INGREDIENTS_TABLE).select();
      if (result.error) throw result.error;
      const ingredients = result.data as Ingredient[];
      setIngredients(ingredients);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  useEffect(() => {
    // Fetch available ingredients from the database
    fetchIngredients();
  }, []);

  return (
    <div className="configure">
      <h2>What's In Your Kitchen?</h2>
      <Card className="configure-ingredient">
        <h3>Spirits</h3>
        {availableSpirits.length > 0 && (
          <div className="ingredient-list">
            {availableSpirits.map((spirit: Ingredient) => (
              <div key={`spirit_${spirit.id}`} className="ingredient-list-item">
                <div
                  className="delete-icon"
                  onClick={() => handleDelete(spirit.id)}
                >
                  [X]
                </div>
                <div className="ingredient-name">{spirit.name}</div>
              </div>
            ))}
          </div>
        )}
        <form
          name="add-spirit"
          id="add-spirit"
          className="add-spirit-form"
          onSubmit={handleAddSpirit}
        >
          <input
            type="text"
            placeholder="Add a spirit"
            value={newSpirit}
            onChange={(e) => setNewSpirit(e.target.value)}
          />
        </form>
      </Card>
      <Card className="configure-ingredient">
        <h3>Mixers</h3>
        {availableMixers.length > 0 && (
          <div className="ingredient-list">
            {availableMixers.map((mixer: Ingredient) => (
              <div key={`mixer_${mixer.id}`} className="ingredient-list-item">
                <div
                  className="delete-icon"
                  onClick={() => handleDelete(mixer.id)}
                >
                  [X]
                </div>
                <div className="ingredient-name">{mixer.name}</div>
              </div>
            ))}
          </div>
        )}
        <form
          name="add-mixer"
          id="add-mixer"
          className="add-mixer-form"
          onSubmit={handleAddMixer}
        >
          <input
            type="text"
            placeholder="Add a mixer"
            value={newMixer}
            onChange={(e) => setNewMixer(e.target.value)}
          />
        </form>
      </Card>
      <Card className="configure-ingredient">
        <h3>Flair/Add-Ins</h3>
        {availableFlair.length > 0 && (
          <div className="ingredient-list">
            {availableFlair.map((flair: Ingredient) => (
              <div key={`flair_${flair.id}`} className="ingredient-list-item">
                <div
                  className="delete-icon"
                  onClick={() => handleDelete(flair.id)}
                >
                  [X]
                </div>
                <div className="ingredient-name">{flair.name}</div>
              </div>
            ))}
          </div>
        )}
        <form
          name="add-flair"
          id="add-flair"
          className="add-flair-form"
          onSubmit={handleAddFlair}
        >
          <input
            type="text"
            placeholder="Add a flair/add-in"
            value={newFlair}
            onChange={(e) => setNewFlair(e.target.value)}
          />
        </form>
      </Card>
    </div>
  );
}
