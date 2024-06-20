import Bun, { Glob } from "bun";
import { kebabCase } from "lodash";
import startCase from "lodash/startCase";
import path from "path";
import prompts from "prompts";
import { constants } from "../src/domains/utils/constants";
import { getLogger } from "../src/domains/utils/getLogger";

const logger = getLogger("Content");
const contenetTypes = ["creator", "game", "asset"] as const;
type ContentType = (typeof contenetTypes)[number];

const site = constants.site({ localhost: true });
const contentResult = await prompts({
  type: "select",
  name: "value",
  message: "What type of content do you want to create?",
  choices: contenetTypes.map((content) => {
    return {
      title: startCase(content),
      value: content,
    };
  }),
});

const type = contentResult.value as ContentType;

switch (type) {
  case "creator":
    await createCreator();
    break;
  case "game":
    await createGame();
    break;
  case "asset": {
    await createAsset();
    break;
  }
}

async function createCreator() {
  // NAME
  const nameForm = await prompts({
    type: "text",
    name: "value",
    message: "What is the name of the creator?",
  });
  if (!nameForm.value) {
    logger.error("Operation cancelled, no name provided");
    return;
  }

  const creatorSlug = kebabCase(nameForm.value);

  await saveFileAndOpenInEditor(
    path.join(process.cwd(), `src/content/creators/${creatorSlug}.mdx`),
    `---
name: ${nameForm.value}
---`,
  );

  logger.log(`✨ Creator created. ${site}/library/${creatorSlug}`);
}

async function createGame() {
  // CREATOR
  const creatorSlugs = await getAllCreatorSlugs();
  const creatorForm = await prompts({
    type: "autocomplete",
    name: "value",
    message: "Who is the creator of the game?",
    choices: creatorSlugs.map((creatorSlug) => {
      return {
        title: startCase(creatorSlug),
        value: creatorSlug,
      };
    }),
  });
  if (!creatorForm.value) {
    logger.error("Operation cancelled, no creator provided");
    return;
  }

  // NAME
  const nameForm = await prompts({
    type: "text",
    name: "value",
    message: "What is the name of the game?",
  });
  if (!nameForm.value) {
    logger.error("Operation cancelled, no name provided");
    return;
  }

  // DESCRIPTION
  const descriptionForm = await prompts({
    type: "text",
    name: "value",
    message: "What is the description of the game?",
  });
  if (descriptionForm.value === undefined) {
    logger.error("Operation cancelled, no description provided");
    return;
  }

  const gameSlug = kebabCase(nameForm.value);

  await saveFileAndOpenInEditor(
    path.join(
      process.cwd(),
      `src/content/games/${creatorForm.value}/${gameSlug}.mdx`,
    ),
    `---
name: ${nameForm.value}
creator: ${creatorForm.value}
---

${descriptionForm.value}
`,
  );

  logger.log(
    `✨ Game created. ${site}/library/${creatorForm.value}/${gameSlug}`,
  );
}

async function createAsset() {
  // CREATOR
  const creatorSlugs = await getAllCreatorSlugs();
  const creatorForm = await prompts({
    type: "autocomplete",
    name: "value",
    message: "Who is the creator of the asset?",
    choices: creatorSlugs.map((creatorSlug) => {
      return {
        title: startCase(creatorSlug),
        value: creatorSlug,
      };
    }),
  });
  if (!creatorForm.value) {
    logger.error("Operation cancelled, no creator provided");
    return;
  }

  // GAME
  const gameSlugs = await getAllGameSlugs(creatorForm.value);
  const gameForm = await prompts({
    type: "autocomplete",
    name: "value",
    message: "What is the game this asset is for?",
    choices: gameSlugs.map((gameSlug) => {
      return {
        title: startCase(gameSlug),
        value: gameSlug,
      };
    }),
  });
  if (!gameForm.value) {
    logger.error("Operation cancelled, no game provided");
    return;
  }

  // NAME
  const nameForm = await prompts({
    type: "text",
    name: "value",
    message: "What is the name of the asset?",
  });
  if (!nameForm.value) {
    logger.error("Operation cancelled, no name provided");
    return;
  }

  const nameSlug = kebabCase(nameForm.value);

  await saveFileAndOpenInEditor(
    path.join(
      process.cwd(),
      `src/content/assets/${creatorForm.value}/${gameForm.value}/${nameSlug}.mdx`,
    ),
    `---
name: ${nameForm.value}
game: ${creatorForm.value}/${gameForm.value}
---


`,
  );

  logger.log(
    `✨ Asset created. ${site}/library/${creatorForm.value}/${gameForm.value}/${nameSlug}`,
  );
}

async function getAllCreatorSlugs() {
  const creatorGlob = new Glob(
    path.join(process.cwd(), `src/content/creators/**`),
  );
  const directories: Array<string> = [];
  for await (const file of creatorGlob.scan({
    cwd: process.cwd(),
    onlyFiles: false,
  })) {
    const fileExtension = path.extname(file);

    const isDirectory = fileExtension === "";
    if (!isDirectory) {
      directories.push(file.split(".").slice(0, -1).join(""));
    }
  }
  const creatorSlugs = directories.map((directory) => {
    return directory.split("/").pop();
  });
  return creatorSlugs;
}

async function getAllGameSlugs(creatorSlug: string) {
  const creatorGlob = new Glob(
    path.join(process.cwd(), `src/content/games/${creatorSlug}/**/*.mdx`),
  );
  const directories: Array<string> = [];
  for await (const file of creatorGlob.scan({
    cwd: process.cwd(),
    onlyFiles: false,
  })) {
    const fileExtension = path.extname(file);

    const isDirectory = fileExtension === "";
    if (!isDirectory) {
      directories.push(file.split(".").slice(0, -1).join(""));
    }
  }
  return directories.map((directory) => {
    return directory.split("/").pop();
  });
}

async function saveFileAndOpenInEditor(filePath: string, content: string) {
  await Bun.write(filePath, content);
  Bun.openInEditor(filePath);
}
