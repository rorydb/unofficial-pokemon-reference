function Pokemon(id,name,type,height,weight,description) {
  this.id = id.toString();
  this.name = name;
  this.sprite = this.spriteDirectory(id);
  this.type = this.listTypes(type);
  this.height = this.convertHeight(height);
  this.weight = this.convertWeight(weight);
  this.description = description;
}

Pokemon.prototype.spriteDirectory = function(id) {
  return "data/sprites/" + id + ".png";
}

Pokemon.prototype.convertHeight = function(height) {
  if (!parseInt(height)) { return "---" }
  return (height * 0.1).toFixed(2) + " m";
}

Pokemon.prototype.convertWeight = function(weight) {
  if (!parseInt(weight)) { return "---" }
  return (weight * 0.1).toFixed(2) + " kg";
}

Pokemon.prototype.listTypes = function(types) {
  var listOfTypes = [];

  types.forEach(function(pokemonType) {
    listOfTypes.push(pokemonType.type.name.toUpperCase());
  });

  return listOfTypes;
};