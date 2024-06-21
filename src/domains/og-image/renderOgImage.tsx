import { grayDark, tealA, tealDark } from "@radix-ui/colors";
import { ImageResponse } from "@vercel/og";
import truncate from "lodash/truncate";
import fs from "node:fs/promises";
import path from "node:path";

export async function renderOgImage(props: {
  title: string;
  description: string;
  footerItems?: Array<string>;
}) {
  const interRegularFontData = await fs.readFile(
    path.join(process.cwd(), "./public/fonts/inter/Inter-Regular.ttf"),
  );

  const interBoldFontData = await fs.readFile(
    path.join(process.cwd(), "./public/fonts/inter/Inter-Bold.ttf"),
  );

  return new ImageResponse(
    (
      <OGImage
        siteTitle={"Keeper"}
        title={props.title}
        description={props.description}
        footerItems={props.footerItems}
      ></OGImage>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: interRegularFontData,
          style: "normal",
          weight: 500,
        },
        {
          name: "Inter",
          data: interBoldFontData,
          style: "normal",
          weight: 700,
        },
      ],
      debug: false,
    },
  );
}

function OGImage(props: {
  siteTitle: string | null | undefined;
  title: string;
  description: string;
  footerItems?: Array<string>;
  readingTime?: number;
  lastUpdatedDate?: string;
}) {
  // take the description which is raw markdown adn remove all the markdown syntax
  const parsedDescription = props.description
    .replaceAll("_", "")
    .replaceAll("#", "")
    .replaceAll("*", "")
    .replaceAll("[", "")
    .replaceAll("]", "");
  const bodySize = "20px";
  const colors = {
    background: {
      default: tealDark.teal1,
      badge: tealA.tealA4,
      leftBorder: tealDark.teal5,
    },
    text: {
      default: "#FFFFFF",
      muted: "#FFFFFFDE",
    },
    borders: {
      default: grayDark.gray8,
    },
  };
  const fontWeight = {
    regular: 500,
    bold: 700,
  };
  return (
    <div
      style={{
        display: "flex",
        padding: "1rem",
        background: "transparent",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          background: colors.background.default,
          color: colors.text.default,
          fontWeight: fontWeight.regular,
          fontSize: bodySize,
          display: "flex",
          width: "100%",
          height: "100%",
          gap: "1rem",
          borderRadius: "16px",
          alignItems: "flex-start",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* border left */}
        <div
          style={{
            background: colors.background.leftBorder,
            position: "absolute",
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px",
            top: 0,
            left: 0,
            width: "1.5rem",
            height: "100%",
          }}
        ></div>
        {renderHeader()}
        {renderContent()}
      </div>
    </div>
  );

  function renderHeader() {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          borderBottom: `1px solid ${colors.borders.default}`,
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "2rem 4rem",
          }}
        >
          <span
            style={{
              fontWeight: fontWeight.bold,
              fontSize: "1.5rem",
            }}
          >
            {renderLogo()}
          </span>
        </div>
      </div>
    );
  }

  function renderContent() {
    return (
      <div
        style={{
          padding: "3rem 4rem 3rem 4rem",
          display: "flex",
          gap: "1rem",
          flex: "1",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        {/* content */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "4em",
              display: "flex",
              fontWeight: fontWeight.bold,
              width: "100%",
            }}
          >
            {truncate(props.title, { length: 25 })}
          </div>
          <div
            style={{
              fontSize: "2em",
              display: "flex",
              fontWeight: fontWeight.regular,
              color: colors.text.muted,
              width: "100%",
            }}
          >
            {truncate(parsedDescription, { length: 100 })}
          </div>
        </div>
        {/* footer */}
        {props.footerItems && (
          <div
            style={{
              display: "flex",
              marginTop: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "1.125em",
                gap: "1rem",
              }}
            >
              {props.footerItems.map((item) => (
                <div
                  style={{
                    display: "flex",
                    gap: ".25rem",
                  }}
                >
                  <div
                    style={{
                      padding: ".5rem",
                      borderRadius: "4px",
                      fontSize: "1.25em",
                      fontWeight: "bold",
                      background: colors.background.badge,
                      color: colors.text.muted,
                    }}
                  >
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderLogo() {
    return (
      <div
        style={{
          fontSize: "1.5em",
        }}
      >
        📝 Keeper
      </div>
    );
  }
}
