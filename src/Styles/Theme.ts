const BOARD_WIDTH = "350px";
const BOARD_MAX_WIDTH = "700px";
const BOX_BORDER = "1px solid rgba(0,0,0,.1)";
const BORDER_RADIUS = "4px";
const WHITE_BOX = `
  border: ${BOX_BORDER};
  border-radius:${BORDER_RADIUS};
  background-color:white;
  z-index: 1; 
`;

const theme = {
  markerGreenColor: "#27ae60",
  markerYelloColor: "#f39c12",
  markerRedColor: "#e74c3c",
  markerGreyColor: "#7f8c8d",
  markerBaseColor: "#ffffff",

  mapActionPadding: "10px",
  basePadding: "10px",
  darkGreyColor: "#666666",
  iconButton: `
    cursor: pointer;
    width:38px;
    height:38px;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    `,
  blueColor: "#3498db",
  greenColor: "#27ae60",

  unselectableText: `
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  `,

  boardWidth: `${BOARD_WIDTH}`,
  boardLargeWidth: `${BOARD_MAX_WIDTH}`,
  maxWidth: "935px",
  bgColor: "#FAFAFA",
  blackColor: "#333333",
  greyColor: "#767676",
  borderGreyColor: "#cacaca",

  lightGreyColor: "#FDFDFC",
  redColor: "#E4685D",
  redFocusedColor: "#d8665c",
  blueFocuesdColor: "#127965",
  darkBlueColor: "#3D85C0",
  boxBorder: "1px solid #e6e6e6",
  borderRadius: "4px",
  whiteBox: `${WHITE_BOX}`,
  guideBox: `
    ${WHITE_BOX}  
    height: 100%;
    margin: 20px;
    padding: 8px;
  `
};

export type ITheme = typeof theme;

export default theme;
