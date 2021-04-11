import React, { useContext } from "react";
import { StateProvider, setIntialState, defaultState } from "./store";
import { I18nProvider, I18nContext } from "./i18n";
import { DateTime } from "./DateTime/DateTime";
import dayjs from "dayjs";

export const Scheduler = () => {
  let options = {};
  const { translate } = useContext(I18nContext);

  options = { init: setIntialState };

  const providerState = options.init({
    dayjs,
    defaultState: defaultState(),
  });

  return (
    <I18nProvider>
      <StateProvider value={providerState}>
        <p className="messageTextStyle">{translate("select_date")}</p>
        <div className="schedule">
          <DateTime />
        </div>
      </StateProvider>
    </I18nProvider>
  );
};
