import User from "./models/users.js";
import Item from "./models/items.js";
import ItemDate from "./models/itemDates.js";
import ChoseItem from "./models/choseItems.js";

User.hasMany(Item, { foreignKey: "userId" });
Item.belongsTo(User, { foreignKey: "userId" });

ItemDate.hasMany(Item, { foreignKey: "itemDateId" });
Item.belongsTo(ItemDate, { foreignKey: "itemDateId" });

Item.hasMany(ChoseItem, { foreignKey: "itemId" });
ChoseItem.belongsTo(Item, { foreignKey: "itemId" });

User.hasMany(ChoseItem, { foreignKey: "userId" });
ChoseItem.belongsTo(User, { foreignKey: "userId" });

export { User, Item, ItemDate, ChoseItem };
