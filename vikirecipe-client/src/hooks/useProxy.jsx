export const useProxy = (props) => {
  //bringing list of ingredients from database
  async function bringIngredPr() {
    try {
      const fillIngreds = await fetch(
        "http://localhost:3000/api/ingredients/v1/ingredlist"
      );
      const fillIngredsJson = await fillIngreds.json();
      return fillIngredsJson.result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  return {
    bringIngredPr: bringIngredPr,
  };
};
