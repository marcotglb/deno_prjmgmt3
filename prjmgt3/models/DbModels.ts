import { DataTypes, db, Model, Relationships } from "../controllers/ProjectsDb.ts";
import * as log from "https://deno.land/std@0.75.0/log/mod.ts";


class Project extends Model {
  static table = "projects";
  static timestamps = true;
  static fields = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      length: 50,
    },
    father: DataTypes.INTEGER,
    what: DataTypes.STRING,
    status: DataTypes.STRING,
  };
}

class Deliverable extends Model {
  static table = "deliverables";
  static timestamps = true;
  static fields = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      length: 50
    },
    projectId: Relationships.belongsTo(Project),
    what: DataTypes.STRING,
    status: DataTypes.STRING
  };
  static project() {
    return this.hasOne(Project)
  };
}


/*
class Owner extends Model {
  static table = "owners";

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };
}

class Business extends Model {
  static table = "businesses";

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    ownerId: Relationships.belongsTo(Owner),
  };

  static owner() {
    return this.hasOne(Owner);
  }
}

db.link([Owner, Business]);

await db.sync({ drop: true });


await db.close();
*/





async function initialize() {
  try {
    db.link([Project, Deliverable]);
    await db.sync({ drop: true });
    await db.close();
  } catch (err) {
    log.info(err);
  }
}
initialize();

export { Project, Deliverable };

