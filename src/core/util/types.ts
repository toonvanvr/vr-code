const AutocompleteHelper = Symbol('AutocompleteHelper')
export type Autocomplete<Type, Union extends Type> =
  | Union
  | (Type & { [AutocompleteHelper]: never })
