import { Product, Recipe } from "../../recipe";

export class MigrationMapper {

  static migrate(recipes: Recipe[]) {
    recipes.forEach(r => this.migrateRecipe(r));
    return recipes;
  }

  private static migrateRecipe(recipe: Recipe) {
    if (!recipe.tags) {
      recipe.tags = { enabled: false, values: [] };
    }
    if (!recipe.details) {
      recipe.details = { description: "", imageUrl: "", url: "" };
    }
    recipe.products.forEach(p => this.migrateProduct(p));
  }

  private static migrateProduct(product: Product) {
    if (product.scalable === undefined) {
      product.scalable = true;
    }
    if (product.tag === undefined) {
      product.tag = "";
    }
  }
}
