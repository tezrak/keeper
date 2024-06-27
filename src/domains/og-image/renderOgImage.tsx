import { grayDark } from "@radix-ui/colors";
import { ImageResponse } from "@vercel/og";
import truncate from "lodash/truncate";
import fs from "node:fs/promises";
import path from "node:path";
import { renderToString } from "react-dom/server";
import { Graphic } from "../../components/client/Graphic/Graphic";
import { Colors, type ColorType } from "../colors/colors";

const debug = false;
export async function renderOgImage(props: {
  title: string;
  description: string;
  src?: string;
  accentColor?: ColorType;
  footerItems?: Array<string>;
}) {
  const interRegularFontData = await fs.readFile(
    path.join(process.cwd(), "./public/fonts/inter/Inter-Regular.ttf"),
  );

  const interBoldFontData = await fs.readFile(
    path.join(process.cwd(), "./public/fonts/inter/Inter-Bold.ttf"),
  );

  if (debug) {
    return new Response(
      renderToString(
        <OGImage
          siteTitle={"Keeper"}
          title={props.title}
          src={props.src}
          description={props.description}
          footerItems={props.footerItems}
          accentColor={props.accentColor}
        ></OGImage>,
      ),
      {
        headers: {
          "content-type": "text/html",
        },
      },
    );
  }

  return new ImageResponse(
    (
      <OGImage
        siteTitle={"Keeper"}
        title={props.title}
        src={props.src}
        description={props.description}
        footerItems={props.footerItems}
        accentColor={props.accentColor}
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
  src?: string;
  accentColor?: ColorType;
  footerItems?: Array<string>;
  readingTime?: number;
  lastUpdatedDate?: string;
}) {
  const accentColor = props.accentColor || "gold";
  const hasFooter = props.footerItems && props.footerItems.length > 0;
  const bodySize = "20px";

  const colors = {
    background: {
      default: Colors.getDarkColor(accentColor, 1),
      badge: Colors.getDarkColor(accentColor, 7),
      leftBorder: Colors.getDarkColor(accentColor, 4),
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
          // background: colors.background.default,
          background: "#fff",
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
        {renderBackground()}
        {renderLeftBorder()}
        {renderHeader()}
        {renderContent()}
      </div>
    </div>
  );

  function renderBackground() {
    return (
      <div
        style={{
          display: "flex",
          position: "absolute",
          borderRadius: "16px",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: Colors.getDarkColor(accentColor, 1),
        }}
      >
        {false && (
          <>
            {/* https://github.com/withastro/astro/issues/11363 */}
            <img
              src={props.src}
              alt={props.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -1,
              }}
            ></img>
          </>
        )}
        {true && (
          <Graphic
            accentColor={accentColor}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              opacity: 0.4,
            }}
          ></Graphic>
        )}
        {true && (
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              display: "flex",
              opacity: 0.6,
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 640">
              <defs>
                <filter id="a" width="120%" height="120%" x="-10%" y="-10%">
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    result="effect1_foregroundBlur"
                    stdDeviation={202}
                  />
                </filter>
              </defs>
              <path
                fill={Colors.getDarkColor(accentColor, 2)}
                d="M0 0h1200v640H0z"
              />
              <g filter="url(#a)">
                <circle
                  cx={723}
                  cy={351}
                  r={449}
                  fill={Colors.getDarkColor(accentColor, 4)}
                />
                <circle
                  cx={424}
                  cy={597}
                  r={449}
                  fill={Colors.getDarkColor(accentColor, 2)}
                />
                <circle
                  cx={24}
                  cy={308}
                  r={449}
                  fill={Colors.getDarkColor(accentColor, 4)}
                />
                <circle
                  cx={455}
                  cy={49}
                  r={449}
                  fill={Colors.getDarkColor(accentColor, 4)}
                />
                <circle
                  cx={322}
                  cy={339}
                  r={449}
                  fill={Colors.getDarkColor(accentColor, 2)}
                />
                <circle
                  cx={912}
                  cy={90}
                  r={449}
                  fill={Colors.getDarkColor(accentColor, 4)}
                />
              </g>
            </svg>
          </div>
        )}
      </div>
    );
  }

  function renderLeftBorder() {
    return (
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
    );
  }

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
          padding: hasFooter ? "3rem 4rem 3rem 4rem" : "3rem 4rem 5rem 4rem",
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
            {truncate(props.description, { length: 100 })}
          </div>
        </div>
        {/* footer */}
        {hasFooter && (
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
              {props.footerItems?.map((item) => (
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
          textTransform: "uppercase",
        }}
      >
        Keeper
      </div>
    );
  }
}
