import styled from "../../Styles/index";

export const Container = styled.div`
  height: 100%;
  div {
    border: 0 !important;
  }

  .window_container {
    width: 260px;
    height: 100px;
    position: relative;
  }

  .custom_window {
    position: absolute;
    bottom: 0;
    cursor: default;
    z-index: 50;
    line-height: 1.1;
    width: 260px;
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
      flex-direction: column;
      justify-content: space-between;
      :not(:last-child) {
        padding-bottom: 6px;
      }
    }

    ._window_title {
      display: flex;
      justify-content: space-between;
    }

    ._row {
      width: 100%;
      white-space: normal;
      :not(:last-child) {
        padding-bottom: 6px;
      }

      .title {
        font-size: 14px;
        font-weight: 600;
      }

      .address {
        line-height: 1.3;
      }

      ._stockItem {
        display: flex;
        align-items: center;

        :not(:last-child) {
          padding-bottom: 6px;
        }

        .createdAt {
          color: ${props => props.theme.darkGreyColor};
        }

        ._stockItemCol {
          :not(:last-child) {
            padding-right: 3px;
          }
          ._stockItemRow {
            display: flex;
            flex-direction: column;
            :not(:last-child) {
              padding-bottom: 4px;
            }
          }
        }
      }

      ._stockTime {
        display: flex;
        align-items: flex-start;
      }

      .statusBox {
        display: flex;
        padding: 3px;
        border-radius: 4px;
        margin-right: 4px;

        .status {
          color: white;
        }
      }
      .plenty {
        background-color: ${props => props.theme.greenColor};
      }

      .some {
        background-color: ${props => props.theme.yellowColor};
      }

      .few {
        background-color: ${props => props.theme.redColor};
      }

      .empty {
        background-color: ${props => props.theme.greyColor};
      }
    }

    .buttons {
      padding-top: 4px;
      display: grid;
      grid-template-columns: 1fr;
    }

    .linkBox {
      display: flex;
      justify-content: center;
      padding: 4px;
      border: 1px solid ${props => props.theme.blueColor} !important;
      border-radius: 4px;
      :not(:last-child) {
        border-right: 0px !important;
      }

      a {
        display: block;
        width: 100%;
        text-align: center;
        text-decoration: none;
        color: ${props => props.theme.blueColor};
      }
    }

    .distance {
      color: ${props => props.theme.darkGreyColor};
      padding-left: 4px;
    }

    ._stock span {
      white-space: normal;
      line-height: 1.2;
      /* word-break: break-all; */
      padding: 2px 0px;
      text-align: center;
    }

    :after {
      content: "";
      position: absolute;
      transform: translateX(-50%);
      left: 50%;
      bottom: -10px;
      width: 22px;
      height: 12px;
      background: url("/images/vertex_white.png");
    }
  }
`;
