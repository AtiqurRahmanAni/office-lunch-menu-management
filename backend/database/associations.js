import User from "./models/users.js";
import Item from "./models/items.js";
import ItemDate from "./models/itemDates.js";

User.hasMany(Item, { foreignKey: "userId" });
Item.belongsTo(User, { foreignKey: "userId" });

ItemDate.hasMany(Item, { foreignKey: "itemDateId" });
Item.belongsTo(ItemDate, { foreignKey: "itemDateId" });

export { User, Item, ItemDate };
