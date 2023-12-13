import type { NextRequest } from 'next/server';

import { ImageResponse } from '@vercel/og';

/* ------------------------------------ - ----------------------------------- */
// Used only to generate the og image for the home page
/* ------------------------------------ - ----------------------------------- */

export const config = {
  runtime: 'edge',
};

const GREY_2 = '#1C1C1C';
const GREY_6 = '#343434';
const GREY_9 = '#000000';
const GREY_11 = '#EDEDED';
const GREY_12 = '#EDEDED';

const interRegularFontP = fetch(
  new URL('../../../public/static/fonts/Inter-Regular-Subset.otf', import.meta.url),
).then((res) => res.arrayBuffer());
const interMediumFontP = fetch(
  new URL('../../../public/static/fonts/Inter-Medium-Subset.otf', import.meta.url),
).then((res) => res.arrayBuffer());
const interSemiBoldFontP = fetch(
  new URL('../../../public/static/fonts/Inter-SemiBold-Subset.otf', import.meta.url),
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const hasTitle = searchParams.has('title');
  const hasDescription = searchParams.get('description');
  const hasPath = searchParams.has('path');

  const title = hasTitle ? searchParams.get('title') : 'Title';
  const description = hasDescription ? searchParams.get('description') : null;
  const path = hasPath ? searchParams.get('path') : '/';

  const [interRegularFont, interMediumFont, interSemiBoldFont] = await Promise.all([
    interRegularFontP,
    interMediumFontP,
    interSemiBoldFontP,
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          padding: 32,
          background: GREY_9,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            padding: 64,
            background: GREY_2,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '2px solid',
            borderColor: GREY_6,
            borderRadius: 32,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                /* alignItems: 'center', */ width: '100%',
              }}
            >
              <div
                style={{
                  fontSize: 64,
                  lineHeight: 1.2,
                  marginRight: 16,
                  color: GREY_11,
                  fontWeight: 500,
                }}
              >
                {title}
              </div>
            </div>

            {description ? (
              <div
                style={{
                  fontSize: 40,
                  opacity: 0.6,
                  lineHeight: 1.5,
                  width: '100%',
                  color: GREY_11,
                  marginTop: 32,
                  fontWeight: 400,
                }}
              >
                {description}
              </div>
            ) : null}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: 48,
                  height: 48,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                    fill="#fff"
                  />
                </svg>
              </div>
              <div
                style={{
                  fontSize: 32,
                  lineHeight: 1.2,
                  color: GREY_12,
                  fontWeight: 600,
                  marginLeft: 16,
                  letterSpacing: '-0.025em',
                }}
              >
                0xpolarzero/optimize_dependencies_github_name
              </div>
            </div>
            <div
              style={{
                fontSize: 40,
                lineHeight: 1.2,
                color: GREY_11,
                opacity: 0.6,
                fontWeight: 500,
              }}
            >
              {path}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interRegularFont,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: interMediumFont,
          style: 'normal',
          weight: 500,
        },
        {
          name: 'Inter',
          data: interSemiBoldFont,
          style: 'normal',
          weight: 600,
        },
      ],
    },
  );
}
