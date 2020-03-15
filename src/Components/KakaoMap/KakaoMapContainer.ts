import styled from "../../Styles/index";

export const Container = styled.div`
  height: 100%;
  div {
    border: 0 !important;
  }

  .custom_window {
    cursor: default;
    word-break: keep-all;
    line-height: 1.1;
    width: 270px;
    padding: 5px;
    background-color: white;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    font-size: 12px;
    white-space: nowrap;
    display: flex;
    flex-direction: column;

    .rows {
      width: 100%;
      display: flex;
      justify-content: space-between;
      :not(:last-child) {
        padding-bottom: 8px;
      }
    }

    ._window_title {
      font-size: 14px;
      font-weight: 600;
      padding-bottom: 4px;
    }

    ._window_col:first-child {
      display: flex;
      flex-direction: column;
      padding-right: 12px;
      max-width: 200px;
    }

    ._window_col:nth-child(2) {
      display: flex;
      flex-direction: column;
      padding: 0;
      width: 60px;
    }

    ._row {
      width: 100%;
      white-space: normal;
      :not(:last-child) {
        padding-bottom: 4px;
      }
    }

    .linkBox {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 4px;
      border-radius: 4px;
      border: 1px solid ${props => props.theme.blueColor} !important;

      a {
        display: block;
        width: 100%;
        text-align: center;
        text-decoration: none;
        color: ${props => props.theme.blueColor};
      }
    }

    .address {
      line-height: 1.2;
    }

    .distance {
      color: ${props => props.theme.darkGreyColor};
      padding-left: 4px;
    }

    ._stock span {
      white-space: normal;
      line-height: 1.2;
      word-break: break-all;
      :not(:last-child) {
        padding-bottom: 4px;
      }
      text-align: center;
    }

    span.plenty {
      color: ${props => props.theme.greenColor};
    }

    span.some {
      color: ${props => props.theme.yellowColor};
    }

    span.few {
      color: ${props => props.theme.redColor};
    }

    span.empty {
      color: ${props => props.theme.greyColor};
    }

    :after {
      content: "";
      position: absolute;
      margin-left: -12px;
      left: 50%;
      bottom: -10px;
      width: 22px;
      height: 12px;
      background: url("/images/vertex_white.png");
    }
  }
`;
