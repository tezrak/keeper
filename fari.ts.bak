import { Glob } from "bun";

const creatorScanner = new Glob("./catalog/creators/*/index.ts");

for await (const creatorFile of creatorScanner.scan({
  cwd: process.cwd(),
  onlyFiles: true,
})) {
  // creator
  const creatorSlug = creatorFile.split("/")[creatorFile.split("/").length - 2];
  const creatorDefault = await import(creatorFile);
  const creatorData = creatorDefault.default();

  await Bun.write(
    `./src/content/creators/${creatorSlug}.mdx`,
    `
---
name: ${creatorData.name}
links: 
${Object.entries(creatorData.links || {})
  .map(([key, value]) => `  ${key}: ${value}`)
  .join("\n")}
---

${creatorData.description || ""}
`.trim(),
  );

  // resources
  const resourceScanner = new Glob(
    `./catalog/creators/${creatorSlug}/*/index.ts`,
  );

  for await (const resourceFile of resourceScanner.scan({
    cwd: process.cwd(),
    onlyFiles: true,
  })) {
    const resourceSlug =
      resourceFile.split("/")[resourceFile.split("/").length - 2];
    const resourceDefault = await import(resourceFile);
    const resourceData = resourceDefault.default();

    // image
    const png = Bun.file(
      `./catalog/creators/${creatorSlug}/${resourceSlug}/image.png`,
    );
    const pngExists = await png.exists();
    if (pngExists) {
      await Bun.write(
        `./src/content/resources/${creatorSlug}/${resourceSlug}/image.png`,
        png,
      );
    }

    const jpg = Bun.file(
      `./catalog/creators/${creatorSlug}/${resourceSlug}/image.jpg`,
    );
    const jpgExists = await jpg.exists();
    if (jpgExists) {
      await Bun.write(
        `./src/content/resources/${creatorSlug}/${resourceSlug}/image.jpg`,
        jpg,
      );
    }

    // md scanner

    const mdScanner = new Glob(
      `./catalog/creators/${creatorSlug}/${resourceSlug}/*.md`,
    );

    for await (const mdFile of mdScanner.scan({
      cwd: process.cwd(),
      onlyFiles: true,
    })) {
      const mdFileContent = await Bun.file(mdFile).text();
      const fileNameBeforeExtension = mdFile.split("/").pop()?.split(".")[0];

      await Bun.write(
        `./src/content/resources/${creatorSlug}/${resourceSlug}/${fileNameBeforeExtension}.mdx`,
        `
---
name: ${resourceData.name.replaceAll(":", "")}
creator: ${creatorSlug}
image: ${pngExists ? "./image.png" : jpgExists ? "./image.jpg" : ""}
license: ${resourceData.license || ""}
links:
${Object.entries(resourceData.links || {})
  .map(([key, value]) => `  ${key}: ${value}`)
  .join("\n")}
---
  
${mdFileContent}
            `.trim(),
      );
    }
  }
}
