import React, { useCallback } from "react";
import { useEffect } from "react";
import {
  AdvanclyProps,
  IResponse,
  RESPONSE_STATUSES,
  ENVIRONMENT,
} from "./types";

const AdvanclyWidget: React.ForwardRefRenderFunction<
  React.ReactNode,
  AdvanclyProps
> = ({
  aggregator_id,
  bank_account_number,
  bank_code,
  borrower_phone,
  bvn_number,
  aggregator_loan_ref = `${Date.now().toString()}`,
  cac_number,
  city,
  company_name,
  customer_type,
  email,
  first_name,
  gender,
  last_name,
  photo_url,
  public_key,
  residence_address,
  state,
  product_id,
  product_code,
  tenure,
  customStyles,
  onSuccess,
  onCancel,
  showWidget,
  autoStart = false,
  environment = ENVIRONMENT.TEST,
}) => {
  const msgToPost = {
    aggregator_id,
    bank_account_number,
    bank_code,
    borrower_phone,
    bvn_number,
    aggregator_loan_ref,
    cac_number,
    city,
    company_name,
    customer_type,
    email,
    first_name,
    gender,
    last_name,
    photo_url,
    public_key,
    residence_address,
    state,
    product_id,
    product_code,
    tenure,
    customStyles,
  };

  const BASE_URL = () => {
    switch (environment) {
      case ENVIRONMENT.TEST:
        return "https://advancly-borrower.test.vggdev.com/create-loan-account/";
      case ENVIRONMENT.STAGING:
        return "https://advancly-borrower.staging.vggdev.com/create-loan-account/";
      case ENVIRONMENT.PRODUCTION:
        return "https://borrower.advancly.com/create-loan-account/";
      default:
        return "https://advancly-borrower.test.vggdev.com/create-loan-account/";
    }
  };

  const advanclyWidget = useCallback(() => {
    const openWidget = () => {
      var style = document.createElement("style");
      style.innerHTML = ` 
        body {
        margin: 0;
      }
      .advancly {
        border: none;
        height: 100vh;
        width: 100vw;
        position: fixed;
        left: 0;
        top: 0;
        overflow: hidden;
      }`;
      let iframeContainer = document.createElement("div");
      iframeContainer.setAttribute("class", "advancly-widget");
      let iframe = document.createElement("iframe");
      iframe.setAttribute("class", "advancly");
      iframe.src = BASE_URL();

      const closeWidget = () => iframeContainer.remove();

      window.addEventListener("message", function (e) {
        messageReceived(e?.data);
        closeWidget();
      });

      iframeContainer.appendChild(iframe);
      document.head.appendChild(style);
      document.body.appendChild(iframeContainer);

      iframe.onload = () =>
        iframe.contentWindow?.postMessage(msgToPost, BASE_URL());
    };

    openWidget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const messageReceived = (data: IResponse) => {
    switch (data.status) {
      case RESPONSE_STATUSES.SUCCESS:
        if (onSuccess) {
          onSuccess({
            status: RESPONSE_STATUSES.SUCCESS,
            data: data?.data,
          });
        }
        break;

      case RESPONSE_STATUSES.CANCEL:
        if (onCancel) {
          onCancel({
            status: RESPONSE_STATUSES.CANCEL,
            data: data?.data,
          });
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (autoStart) {
      setTimeout(() => {
        advanclyWidget();
      }, 500);
    }
  }, [advanclyWidget, autoStart]);

  useEffect(() => {
    showWidget && advanclyWidget();
  }, [advanclyWidget, showWidget]);

  return null;
};

export default AdvanclyWidget;
