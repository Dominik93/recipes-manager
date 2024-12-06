
export const TAG_LOCALIZE = {
  'MEAT': $localize`:meat@@meat:Meat`,
  'VEGE': $localize`:vege@@vege:Vege`,
  'NONMOVABLE': $localize`:nonmovable@@nonmovable:Non-movable`
}

export const message = $localize`:error-message@@error-message:Something went wrong`;
export const close = $localize`:close@@close:Close`;

export const pageRefreshed = $localize`:page-refreshed@@page-refreshed:Page refreshed.`;

export const versionMismatch = $localize`:version-mismatch@@version-mismatch:Version mismatch. Try again.`;

export const confirmDelete = $localize`:confirm-delete@@confirm-delete:Do you want to delete?`;

export const UNSCALABLE = $localize`:unscalable@@unscalable:Unscalable`;

export function recipeAddedMessage(name: string) {
  return $localize`:recipe-added@@recipe-added:Recipe '${name}' added.`;
}

export const recipeNotAddedMessage = $localize`:recipe-not-added@@recipe-not-added:Recipe not added.`;

export function recipeModifiedMessage(name: string) {
  return $localize`:recipe-modified@@recipe-modified:Recipe '${name}' modified.`;
}

export function recipeNotModifiedMessage(name: string) {
  return $localize`:recipe-not-modified@@recipe-not-modified:Recipe '${name}' not modified.`;
}
