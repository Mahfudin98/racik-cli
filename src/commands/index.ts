import { makeController } from "./make-controller";
import { makeModel } from "./make-model";
import { makeMigration } from "./make-migration";
import { makeMiddleware } from "./make-middleware";
import { makeTest } from "./make-test";
import { newProject } from "./new-project";

type Command = {
  run: (arg?: string) => void;
  description: string;
};

export const commands: Record<string, Command> = {
  "make:controller": {
    run: makeController,
    description: "Create a new controller",
  },
  "make:model": {
    run: makeModel,
    description: "Create a new model",
  },
  "make:migration": {
    run: makeMigration,
    description: "Create a new migration file",
  },
  "make:middleware": {
    run: makeMiddleware,
    description: "Create a new middleware",
  },
  "make:test": {
    run: makeTest,
    description: "Create a new test",
  },
  new: {
    run: newProject,
    description: "Create a new API project",
  },
};
